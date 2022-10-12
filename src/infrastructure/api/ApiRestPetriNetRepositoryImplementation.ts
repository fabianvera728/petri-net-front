import PetriNetRepository from "../../domain/repositories/PetriNetRepository";
import {PetriNet} from "../../domain/models/PetriNet";
import {Transition} from "../../domain/models/Transition";
import {injectable} from "inversify";
import {Place} from "../../domain/models/Place";

@injectable()
export default class ApiRestPetriNetRepositoryImplementation implements PetriNetRepository {

     fireTransitions(petriNet: PetriNet, transitionsId: string[]): Promise<Place[]> {
        return fetch('http://127.0.0.1:8000/api/petri_nets/fire_transitions', {
            method: 'POST',
            body: JSON.stringify({petri_net: petriNet, transitions: transitionsId, places: petriNet.places}),
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            }
        }).then(
            (response) => response.json(),
            (error) => Promise.reject(error)
        ) as Promise<Place[]>
    }

    async save(petriNet: PetriNet): Promise<PetriNet> {
        return fetch('http://127.0.0.1:8000/api/petri_nets/', {
            method: 'POST',
            body: JSON.stringify(petriNet),
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            }
        }).then(
            (response) => response.json(),
            (error) => Promise.reject(error)
        ) as Promise<PetriNet>
/*
        throw new Error("Not implemented")
*/
    }

    async update(petriNet: PetriNet): Promise<PetriNet> {
        throw new Error("Not implemented")
    }

    async list(): Promise<PetriNet[]> {
        return fetch('http://127.0.0.1:8000/api/petri_nets/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            }
        }).then(
            (response) => response.json(),
            (error) => Promise.reject(error)
        ) as Promise<PetriNet[]>
        /*const {data, errors} = await response.json()
        if (response.ok) {
            console.log("Entro a la validacion", data)
            return Promise.resolve(response.json())
        }
        return Promise.resolve([]);*/
    }

    getTransitionsEnabled(petriNet: PetriNet): Promise<Transition[]> {
        return fetch('http://127.0.0.1:8000/api/petri_nets/get_transitions_enabled/1', {
            method: 'POST',
            body: JSON.stringify({transitions: petriNet.transitions, places: petriNet.places, petri_net: petriNet}),
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            }
        }).then(
            (response) => Promise.resolve(response.json()),
            (error) => Promise.reject(error)
        ) as Promise<Transition[]>
    }

}