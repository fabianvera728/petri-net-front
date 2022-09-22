import {Container} from "inversify";
import PetriNetGraphGenerator from './domain/repositories/PetriNetGraphGenerator'
import GraphVizPetriNetGraphGenerator
    from "./infrastructure/web/GraphVizPetriNetGraphGenerator";
import {GeneratePetriNetGraph} from "./application/usecases/GeneratePetriNetGraph";
import PetriNetRepository from "./domain/repositories/PetriNetRepository";
import PetriNetRepositoryMock from "./infrastructure/api/PetriNetRepositoryMock";
import ListPetriNetsUseCase from "./application/usecases/ListPetriNetsUseCase";
import CreatePetriNet from "./application/usecases/CreatePetriNet";
import GetPetriNetTransitionsEnabled from "./application/usecases/GetPetriNetTransitionsEnabled";
import RunPetriNetTransitions from "./application/usecases/RunPetriNetTransitions";


export const container = new Container();
container.bind<PetriNetGraphGenerator>("petriNetGraphGenerator")
    .to(GraphVizPetriNetGraphGenerator);
container.bind<PetriNetRepository>("petriNetRepository")
    .to(PetriNetRepositoryMock);
container.bind(GeneratePetriNetGraph).toSelf()
container.bind(ListPetriNetsUseCase).toSelf()
container.bind(GetPetriNetTransitionsEnabled).toSelf()
container.bind(CreatePetriNet).toSelf()
container.bind(RunPetriNetTransitions).toSelf()


