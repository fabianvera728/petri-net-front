import {PetriNet} from "../../../domain/models/PetriNet";
import {Place} from "../../../domain/models/Place";

export function addPlace(state: PetriNet, action: { type: string; payload: Place }) {
    return {
        ...state,
        places: [
            ...state.places.map((place) => place),
            action.payload
        ],
        placesHash: {...state.placesHash, [action.payload.id]: action.payload}
    }
}