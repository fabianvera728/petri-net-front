import {PetriNet} from "../../domain/models/PetriNet";
import PetriNetGraphGenerator from "../../domain/repositories/PetriNetGraphGenerator";
import {injectable, inject} from "inversify";
import {Output} from "../../domain/models/Output";
import {Place} from "../../domain/models/Place";
import {Transition} from "../../domain/models/Transition";
import {Input} from "../../domain/models/Input";

@injectable()
export class GeneratePetriNetGraph {
    private readonly petriNetVisualization: PetriNetGraphGenerator
    PETRI_NET_MARKING = '🌕'

    constructor(
        @inject("petriNetGraphGenerator") petriNetVisualization: PetriNetGraphGenerator
    ) {
        this.petriNetVisualization = petriNetVisualization
    }

    public generate(petriNet: PetriNet) {
        return this.petriNetVisualization.generatePetriNetGraph(petriNet)
    }

    public mapperInputsToDigraph(places: { [key: string]: Place }, transitions: { [key: string]: Transition }, inputs: Input[]) {
        let inputsAsString = ''
        inputs.forEach((input) => {
            const placeName = places[input.place].name
            const transitionName = transitions[input.transition].name
            if (placeName !== '' && transitionName !== '') {
                inputsAsString += `${placeName}->${transitionName}; `.repeat(input.number_of_inputs)
            }
        })
        return inputsAsString
    }

    public mapperOutputsToDigraph(places: { [key: string]: Place }, transitions: { [key: string]: Transition }, outputs: Output[]) {
        let outputsAsString = ''
        outputs.forEach((output) => {
            const placeName = places[output.place].name
            const transitionName = transitions[output.transition].name
            if (placeName !== '' && transitionName !== '') {
                outputsAsString += `${transitionName}->${placeName}; `.repeat(output.number_of_outputs)
            }
        })
        return outputsAsString
    }

    public placeToNodeDigraph(name: string, tokens: number) {
        return `${name || 'NA'} [label="${name || 'NA'} ${this.PETRI_NET_MARKING.repeat(tokens)}",fillcolor="#6366F1",fontcolor="#ffffff"]`
    }

    public mapperPlacesToDigraph(places: Place[]) {
        return places.map((place) => this.placeToNodeDigraph(place.name, place.tokens)).join('; ')
    }

    public mapperTransitionsDigraph(transitions: Transition[]): string {
        return transitions.map((transition) => transition.name).join('; ')
    }

    public execute(petriNet: PetriNet) {
        return `digraph G {
            rankdir=LR;
            center=true; 
            margin=1;
            subgraph place {
                center=true; 
                node [shape=circle,style=filled];
                ${this.mapperPlacesToDigraph(petriNet.places)}
            }
            subgraph transitions {
                center=true; 
                node [shape=rect,height=0.4,width=.4,style=filled];
                ${this.mapperTransitionsDigraph(petriNet.transitions)}
            }
            ${this.mapperInputsToDigraph(petriNet.placesHash, petriNet.transitionsHash, petriNet.inputs)}
            ${this.mapperOutputsToDigraph(petriNet.placesHash, petriNet.transitionsHash, petriNet.outputs)}
        }`
    }

}