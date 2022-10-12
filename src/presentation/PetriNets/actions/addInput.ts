import {PetriNet} from "../../../domain/models/PetriNet";
import {Input} from "../../../domain/models/Input";

export const addInput = (state: PetriNet, action: { type: string, payload: Input }) => {
    return {
        ...state,
        inputs: [
            ...state.inputs.map((input) => input),
            action.payload
        ]
    };
}