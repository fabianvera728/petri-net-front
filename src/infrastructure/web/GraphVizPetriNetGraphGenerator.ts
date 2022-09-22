import {injectable} from "inversify";
import PetriNetGraphGenerator from "../../domain/repositories/PetriNetGraphGenerator";
import {PetriNet} from "../../domain/models/PetriNet";

@injectable()
export default class GraphVizPetriNetGraphGenerator implements PetriNetGraphGenerator {
    generatePetriNetGraph(petriNet: PetriNet): string {
        return "digraph G { }";
    }
}


