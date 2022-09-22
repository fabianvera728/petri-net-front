import PetriNetRepository from "../../domain/repositories/PetriNetRepository";
import {Transition} from "../../domain/models/Transition";
import {PetriNet} from "../../domain/models/PetriNet";
import {injectable} from "inversify";

let petriNets: PetriNet[] = []

@injectable()
export default class PetriNetRepositoryMock implements PetriNetRepository {
    fireTransitions(petriNet: PetriNet, transitionId: string): Promise<PetriNet> {
        const petriNetCurrent: PetriNet = Object.assign({}, {...petriNet})
        petriNetCurrent.inputs.forEach((input) => {
            if(input.transition === transitionId){
                petriNetCurrent.placesHash[input.place].tokens -= input.number_of_inputs
            }
        })
        petriNetCurrent.outputs.forEach((outputs) => {
            if(outputs.transition === transitionId){
                petriNetCurrent.placesHash[outputs.place].tokens += outputs.number_of_outputs
            }
        })
        return Promise.resolve({...petriNetCurrent})
    }

    getTransitionsEnabled(petriNet: PetriNet): Promise<Transition[]> {
        let transitionsEnabled: Transition[] = []
        petriNet.transitions.forEach((transition) => {
            let result = true
            petriNet.inputs.forEach((input) => {
                if(input.transition === transition.id){
                    result = result && petriNet.placesHash[input.place].tokens >= input.number_of_inputs
                }
            })
            if (result) {
                transitionsEnabled.push(transition)
            }
        })
        return Promise.resolve(Object.values(transitionsEnabled))
    }

    list(): Promise<PetriNet[]> {
        console.log("Reading.....")
        return Promise.resolve(Object.values(petriNets));
    }

    save(petriNet: PetriNet): Promise<PetriNet> {
        petriNets.push(petriNet)
        return Promise.resolve(petriNet)
    }

    update(petriNet: PetriNet): Promise<PetriNet> {
        throw new Error("Not implemented")
    }

}