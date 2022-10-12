import {PetriNet} from "../../../domain/models/PetriNet";
import {Output} from "../../../domain/models/Output";

export const addOutput = (state: PetriNet, action: { type: string, payload: Output }) => {
    return {
        ...state,
        outputs: [
            ...state.outputs.map((output) => output),
            action.payload
        ]
    };
}