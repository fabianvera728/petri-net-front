import PetriNetRepository from "../../domain/repositories/PetriNetRepository";
import {inject, injectable} from "inversify";
import {PetriNet} from "../../domain/models/PetriNet";

@injectable()
export default class GetPetriNetTransitionsEnabled {
    private petriNetRepository: PetriNetRepository

    constructor(@inject("petriNetRepository") petriNetRepository: PetriNetRepository) {
        this.petriNetRepository = petriNetRepository
    }

    public execute(petriNet: PetriNet){
        return this.petriNetRepository.getTransitionsEnabled(petriNet)
    }

}