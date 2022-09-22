import PetriNetRepository from "../../domain/repositories/PetriNetRepository";
import {inject, injectable} from "inversify";

@injectable()
export default class ListPetriNetsUseCase {

    private readonly petriNetRepository: PetriNetRepository

    constructor(@inject("petriNetRepository") petriNetRepository: PetriNetRepository) {
        this.petriNetRepository = petriNetRepository
    }

    public async execute() {
        return this.petriNetRepository.list()
    }

}