
import { URLSearchParams } from "url";
import { JsonRequest } from 'http-req-builder'
//import { JsonRequest } from "../request";
import {definitions, operations} from '../../.temp/types'
import {  loadAPISpec, validate } from "../validators/validator";
export class PetController{
    async getPetById(id: number | string){
        const body = (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body
        const apiSpec = await loadAPISpec()
        const schema = apiSpec.paths['/pet/{petId}']['get']['responses']['200']['schema']
        validate(schema, body)
        return body
    }

    async getPetByStatus(status: string | string[]){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/findByStatus`)
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
    }

    async getPetByTag(tags: string | string[]){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/findByTags`)
                .searchParams( new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body
    }

    async addNewPet(pet: Omit<definitions['Pet'], 'id'>){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet`)
                .method('POST')
                .body(pet)
                .send<operations['addPet']['responses']['200']['schema']>()
        ).body
    }

    async updatePet(pet:definitions['Pet']){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet`)
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
    }

    async deletePetById(id: number | string){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .method('DELETE')
                .send<definitions['AbstractApiResponse']>()
        ).body
    }

}