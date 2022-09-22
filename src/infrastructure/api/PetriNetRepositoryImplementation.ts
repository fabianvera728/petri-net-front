import PetriNetRepository from "../../domain/repositories/PetriNetRepository";
import {PetriNet} from "../../domain/models/PetriNet";
import {Transition} from "../../domain/models/Transition";

export default class PetriNetRepositoryImplementation implements PetriNetRepository {

    async fireTransitions(petriNet: PetriNet): Promise<PetriNet> {
        throw new Error("Not implemented")
    }

    async save(petriNet: PetriNet): Promise<PetriNet> {
        throw new Error("Not implemented")
    }

    async update(petriNet: PetriNet): Promise<PetriNet> {
        throw new Error("Not implemented")
    }

    list(): Promise<PetriNet[]> {
        return Promise.resolve(Object.values([]));
    }

    getTransitionsEnabled(petriNet: PetriNet): Promise<Transition[]> {
        return Promise.resolve([]);
    }

}