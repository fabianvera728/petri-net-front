import PetriNetRepository from "../../domain/repositories/PetriNetRepository";
import {PetriNet} from "../../domain/models/PetriNet";
import {inject, injectable} from "inversify";

@injectable()
export default class CreatePetriNet {

    private petriNetRepository: PetriNetRepository

    constructor(@inject("petriNetRepository") petriNetRepository: PetriNetRepository) {
        this.petriNetRepository = petriNetRepository
    }

    public execute(petriNet: PetriNet): Promise<PetriNet>{
        return this.petriNetRepository.save(petriNet)
    }

}