import {inject, injectable} from "inversify";
import PetriNetRepository from "../../domain/repositories/PetriNetRepository";
import {PetriNet} from "../../domain/models/PetriNet";

@injectable()
export default class RunPetriNetTransitions {

    private petriNetRepositoty: PetriNetRepository

    constructor(@inject("petriNetRepository") petriNetRepository: PetriNetRepository) {
        this.petriNetRepositoty = petriNetRepository
    }

    public async execute(petriNet: PetriNet, transitionId: string[]) {
        return this.petriNetRepositoty.fireTransitions(petriNet, transitionId)
    }

}