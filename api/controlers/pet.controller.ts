import got from "got/dist/source";
import { URLSearchParams } from "url";

export class PetController{
    async getPetById(id: number | string){
        const response = await got(`http://93.126.97.71:10080/api/pet/${id}`)
        return JSON.parse(response.body)
    }

    async getPetByStatus(status: string | string[]){
        const response = await got(`http://93.126.97.71:10080/api/pet/findByStatus`, {
            searchParams: new URLSearchParams({ status })
        })
        return JSON.parse(response.body)
    }

    async getPetByTag(tags: string | string[]){
        const response = await got(`http://93.126.97.71:10080/api/pet/findByTags`, {
           searchParams: new URLSearchParams({ tags })
        })
        return JSON.parse(response.body)
    }
}