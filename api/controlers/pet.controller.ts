
import { URLSearchParams } from "url";
import {JsonRequest} from '../request'

export class PetController{
    async getPetById(id: number | string){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .send()
        ).body
    }

    async getPetByStatus(status: string | string[]){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/findByStatus`)
                .searchParams(new URLSearchParams({ status }))
                .send()
        ).body
    }

    async getPetByTag(tags: string | string[]){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/findByTags`)
                .searchParams( new URLSearchParams({ tags }))
                .send()
        ).body
    }

    async addNewPet(pet: 
        {
            category: {
                id: number,
                name: string
              },
              name: string,
              photoUrls: string[],
              tags:
                {
                  id: number
                  name: string
                }[],
              status: string
    }){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet`)
                .method('POST')
                .body(pet)
                .send()
        ).body
    }

    async updatePet(pet: 
        {
            id: number,
            category: {
                id: number,
                name: string
              },
              name: string,
              photoUrls: string[],
              tags:
                {
                  id: number
                  name: string
                }[],
              status: string
    }){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet`)
                .method('PUT')
                .body(pet)
                .send()
        ).body
    }

    async deletePetById(id: number | string){
        return (await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .method('DELETE')
                .send()
        ).body
    }

}