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

    public mapperInputsToDigraph(petriNet: PetriNet, inputs: Input[]) {
        let inputsAsString = ''
        inputs.forEach((input) => {
            const placeName = this.getPlaceName(petriNet, input.place)
            const transitionName = this.getTransitionName(petriNet, input.transition)
            if (placeName !== '' && transitionName !== '') {
                inputsAsString += `${placeName}->${transitionName}; `.repeat(input.number_of_inputs)
            }
        })
        return inputsAsString
    }

    public getPlaceName(petriNet: PetriNet, placeId: string){
        return petriNet.places.filter((place) => place.id === placeId)[0].name
    }

    public getTransitionName(petriNet: PetriNet, transitionId: string){
        return petriNet.transitions.filter((transition) => transition.id === transitionId)[0].name
    }

    public mapperOutputsToDigraph(petriNet: PetriNet, outputs: Output[]) {
        let outputsAsString = ''
        outputs.forEach((output) => {
            const placeName = this.getPlaceName(petriNet, output.place)
            const transitionName = this.getTransitionName(petriNet, output.transition)
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
            ${this.mapperInputsToDigraph(petriNet, petriNet.inputs)}
            ${this.mapperOutputsToDigraph(petriNet, petriNet.outputs)}
        }`
    }

}