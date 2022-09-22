import {PetriNet} from "../models/PetriNet";

export default interface PetriNetGraphGenerator {
    generatePetriNetGraph: (petriNet: PetriNet) => string
}