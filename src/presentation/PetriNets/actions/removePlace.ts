import {PetriNet} from "../../../domain/models/PetriNet";

export function removePlace(state: PetriNet, action: { type: string; payload: any }) {
    if (state.places.length - 1 === 0) {
        return state
    }
    return {
        ...state,
        places: [
            ...state.places.filter((place, index) => {
                if (index !== action.payload) {
                    return place
                }
            })
        ]
    };
}