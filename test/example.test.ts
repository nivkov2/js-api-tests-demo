import { strict as assert } from 'assert'
import { PetController } from '../api/controlers/pet.controller';

let pet = new PetController();

describe('User can', () => {
    it('get pet by id', async function () {
        const body = await pet.getPetById(1);
        assert(body.id === 1, `Expected id to be 1 but got ${body.id}`)
    })

    it('get pet by status', async function () {
        let body = await pet.getPetByStatus('available')
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`)

        body = await pet.getPetByStatus('pending')
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`)

        body = await pet.getPetByStatus('sold')
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`)

        body = await pet.getPetByStatus(['available', 'pending'])
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`);
        assert(body.some((pet: any) => pet.status === 'available'))
        assert(body.some((pet: any) => pet.status === 'pending'))
        assert(!body.some((pet: any) => pet.status === 'sold'))

    })

    it('get pet by tag', async function () {
        let body = await pet.getPetByTag('tag1')
        assert(body.length > 0, `Expected pet count to be greater than 0 but got ${body.length}`)
        assert(body.every((pet: any) => pet.tags.some((tag: any) =>  tag.name == 'tag1')))
    })
}) 