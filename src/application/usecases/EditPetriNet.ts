import PetriNetRepository from "../../domain/repositories/PetriNetRepository";
import {PetriNet} from "../../domain/models/PetriNet";

export default class EditPetriNet {

    private petriNetRepository: PetriNetRepository

    constructor(petriNetRepository: PetriNetRepository) {
        this.petriNetRepository = petriNetRepository
    }

    public execute(petriNet: PetriNet): Promise<PetriNet>{
        return this.petriNetRepository.update(petriNet)
    }

}