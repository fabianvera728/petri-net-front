import {PetriNet} from "../models/PetriNet";
import {Transition} from "../models/Transition";

export default interface PetriNetRepository {
    save: (petriNet: PetriNet) => Promise<PetriNet>
    update: (petriNet: PetriNet) => Promise<PetriNet>
    fireTransitions: (petriNet: PetriNet, transitionId: string) => Promise<PetriNet>
    getTransitionsEnabled: (petriNet: PetriNet) => Promise<Transition[]>
    list: () => Promise<PetriNet[]>
}