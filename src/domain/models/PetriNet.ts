import {Place} from "./Place";
import {Transition} from "./Transition";
import {Input} from "./Input";
import {Output} from "./Output";

export class PetriNet {
    public name: string
    public description: string
    public places: Place[]
    public transitions: Transition[]
    public inputs: Input[]
    public outputs: Output[]
    public placesHash : {[key: string]: Place}
    public transitionsHash : {[key: string]: Transition}

    constructor(/*{
                    name
                    description
                    places
                    transitions
                    inputs=[]
                    outputs=[]
                }:{
        name
        description
        places?
        transitions?
        inputs?
        outputs?
    }*/) {
        this.name = ''
        this.description = ''
        this.places = []
        this.transitions = []
        this.inputs = []
        this.outputs = []
        this.placesHash = {}
        this.transitionsHash = {}
    }

}
