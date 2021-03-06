import { strict as assert } from 'assert'
import { PetController } from '../api/controlers/pet.controller';
import {definitions} from '../.temp/types'
import { ApiClient } from '../api/client';


describe('User can', () => {
    it('get pet by id', async function () {
        const body = await ApiClient.unauthorized().pet.getPetById(1);
        assert(body.id === 1, `Expected id to be 1 but got ${body.id}`)
    })

    it('get pet by status', async function () {
        const client = ApiClient.unauthorized()
        let body = await client.pet.getPetByStatus('available')
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`)

        body = await client.pet.getPetByStatus('pending')
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`)

        body = await client.pet.getPetByStatus('sold')
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`)

        body = await client.pet.getPetByStatus(['available', 'pending'])
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`);
        assert(body.some(pet => pet.status === 'available'))
        assert(body.some(pet => pet.status === 'pending'))
        assert(!body.some(pet => pet.status === 'sold'))

    })

    it('get pet by tag', async function () {
        const client = ApiClient.unauthorized()
        let body = await client.pet.getPetByTag('tag1')
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`)
        assert(body.every(pet => pet.tags.some(tag =>  tag.name == 'tag1')))
    })

    it('can be added, updated and deleted', async function() {
        const adminClient = await ApiClient.loginAs({
            username: "",
            password: ""
        })
        const petToCreate: Omit<definitions['Pet'], 'id'> = {
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "Cat",
            "photoUrls": [
                "http://test.com/image.jpg"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }
//Create pet
        const addedPet = await adminClient.pet.addNewPet(petToCreate);
        
        assert.deepEqual(addedPet, {
            ...addedPet,
            id: addedPet.id
        }, 'Expected created pet to match data during creation')
        const foundAddedPet = await adminClient.pet.getPetById(addedPet.id)
        assert.deepEqual(foundAddedPet, {
            ...petToCreate,
            id: addedPet.id
        })
//Update pet
        const newerPet: definitions['Pet'] = {
            id: addedPet.id,
            category: {
                id: 1,
                name: "string2"
            },
            name: "Dog",
            photoUrls: [
                "http://test.com/image2.jpg"
            ],
            tags: [
                {
                    id: 1,
                    name: "string2"
                }
            ],
            status: "pending"
        }
        const updatedPet = await adminClient.pet.updatePet(newerPet)
        assert.deepEqual(updatedPet, newerPet, `Expected updated pet to equal data used upon updating`)
//Delete pet
        await adminClient.pet.deletePetById(addedPet.id)
    })
}) 