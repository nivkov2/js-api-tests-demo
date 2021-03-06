
import { URLSearchParams } from "url";

import {definitions, operations} from '../../.temp/types'
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";

export class PetController extends BaseController{
    async getPetById(id: number | string){
        return (await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .headers({ token: this.params.token} )
                .cookieJar(this.params.cookie)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body
    }

    async getPetByStatus(status: string | string[]){
        return (await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet/findByStatus`)
                .headers({ token: this.params.token} )
                .cookieJar(this.params.cookie)
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
    }

    async getPetByTag(tags: string | string[]){
        return (await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet/findByTags`)
                .headers({ token: this.params.token} )
                .cookieJar(this.params.cookie)
                .searchParams( new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body
    }

    async addNewPet(pet: Omit<definitions['Pet'], 'id'>){
        return (await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet`)
                .headers({ token: this.params.token} )
                .cookieJar(this.params.cookie)
                .method('POST')
                .body(pet)
                .send<operations['addPet']['responses']['200']['schema']>()
        ).body
    }

    async updatePet(pet:definitions['Pet']){
        return (await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet`)
                .headers({ token: this.params.token} )
                .cookieJar(this.params.cookie)
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
    }

    async deletePetById(id: number | string){
        return (await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .headers({ token: this.params.token} )
                .cookieJar(this.params.cookie)
                .method('DELETE')
                .send<definitions['AbstractApiResponse']>()
        ).body
    }

}