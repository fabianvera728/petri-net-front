import {PetriNet} from "../models/PetriNet";
import {Transition} from "../models/Transition";
import {Place} from "../models/Place";

export default interface PetriNetRepository {
    save: (petriNet: PetriNet) => Promise<PetriNet>
    update: (petriNet: PetriNet) => Promise<PetriNet>
    fireTransitions: (petriNet: PetriNet, transitionId: string[]) => Promise<Place[]>
    getTransitionsEnabled: (petriNet: PetriNet) => Promise<Transition[]>
    list: () => Promise<PetriNet[]>
}