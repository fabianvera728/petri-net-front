import {Place} from "./Place";
import {Transition} from "./Transition";
import {Input} from "./Input";
import {Output} from "./Output";

export interface PetriNet {

    readonly name: string
    readonly description: string
    readonly places: Place[]
    readonly transitions: Transition[]
    readonly inputs: Input[]
    readonly outputs: Output[]
    readonly placesHash : {[key: string]: Place}
    readonly transitionsHash : {[key: string]: Transition}

}
