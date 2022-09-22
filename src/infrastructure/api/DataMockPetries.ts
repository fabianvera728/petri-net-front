import {PetriNet} from "../../domain/models/PetriNet";

export function dataMockPetries(): PetriNet[] {
    return [{
        "name": "",
        "description": "",
        "places": [
            {
                "id": "41d4cb95-14bc-4648-84ae-8d535cdbd382",
                "name": "P1",
                "tokens": 3
            },
            {
                "id": "e2bc0906-abf8-4e02-bba6-a242df1ff5ac",
                "name": "P2",
                "tokens": 0
            }
        ],
        "transitions": [
            {
                "id": "4c4e3831-9917-4d51-884b-5a7a3e64b458",
                "name": "T1"
            }
        ],
        "inputs": [
            {
                "transition": "4c4e3831-9917-4d51-884b-5a7a3e64b458",
                "place": "41d4cb95-14bc-4648-84ae-8d535cdbd382",
                "number_of_inputs": 1
            }
        ],
        "outputs": [
            {
                "transition": "4c4e3831-9917-4d51-884b-5a7a3e64b458",
                "place": "e2bc0906-abf8-4e02-bba6-a242df1ff5ac",
                "number_of_outputs": 1
            }
        ],
        "placesHash": {
            "41d4cb95-14bc-4648-84ae-8d535cdbd382": {
                "id": "41d4cb95-14bc-4648-84ae-8d535cdbd382",
                "name": "P1",
                "tokens": 3
            },
            "e2bc0906-abf8-4e02-bba6-a242df1ff5ac": {
                "id": "e2bc0906-abf8-4e02-bba6-a242df1ff5ac",
                "name": "P2",
                "tokens": 0
            }
        },
        "transitionsHash": {
            "4c4e3831-9917-4d51-884b-5a7a3e64b458": {
                "id": "4c4e3831-9917-4d51-884b-5a7a3e64b458",
                "name": "T1"
            }
        }
    }, {
        "name": "",
        "description": "",
        "places": [
            {
                "id": "6e35b6c9-ab85-4b08-873c-f8365ab50b41",
                "name": "P2",
                "tokens": 3
            },
            {
                "id": "c57a52dc-fa30-4cad-bf78-699f30d5cac6",
                "name": "P1",
                "tokens": 0
            },
            {
                "id": "5b05cbf0-2603-469d-9ffc-d354d8ac0f70",
                "name": "P5",
                "tokens": 0
            },
            {
                "id": "27b46fb9-f76c-48cb-896f-1a6c91987db3",
                "name": "P4",
                "tokens": 3
            }
        ],
        "transitions": [
            {
                "id": "cb361ab1-0bdc-4653-8c6c-eef751c46b82",
                "name": "T1"
            },
            {
                "id": "e35c3c4a-8657-422a-892f-d36df425f02e",
                "name": "T2"
            },
            {
                "id": "13d01582-de77-460e-b10d-185d5b82e69a",
                "name": "T3"
            }
        ],
        "inputs": [
            {
                "transition": "e35c3c4a-8657-422a-892f-d36df425f02e",
                "place": "27b46fb9-f76c-48cb-896f-1a6c91987db3",
                "number_of_inputs": 1
            },
            {
                "transition": "13d01582-de77-460e-b10d-185d5b82e69a",
                "place": "6e35b6c9-ab85-4b08-873c-f8365ab50b41",
                "number_of_inputs": 2
            },
            {
                "transition": "cb361ab1-0bdc-4653-8c6c-eef751c46b82",
                "place": "27b46fb9-f76c-48cb-896f-1a6c91987db3",
                "number_of_inputs": 1
            },
            {
                "transition": "13d01582-de77-460e-b10d-185d5b82e69a",
                "place": "c57a52dc-fa30-4cad-bf78-699f30d5cac6",
                "number_of_inputs": 1
            }
        ],
        "outputs": [
            {
                "transition": "e35c3c4a-8657-422a-892f-d36df425f02e",
                "place": "6e35b6c9-ab85-4b08-873c-f8365ab50b41",
                "number_of_outputs": 1
            },
            {
                "transition": "cb361ab1-0bdc-4653-8c6c-eef751c46b82",
                "place": "5b05cbf0-2603-469d-9ffc-d354d8ac0f70",
                "number_of_outputs": 1
            }
        ],
        "placesHash": {
            "6e35b6c9-ab85-4b08-873c-f8365ab50b41": {
                "id": "6e35b6c9-ab85-4b08-873c-f8365ab50b41",
                "name": "P2",
                "tokens": 3
            },
            "c57a52dc-fa30-4cad-bf78-699f30d5cac6": {
                "id": "c57a52dc-fa30-4cad-bf78-699f30d5cac6",
                "name": "P1",
                "tokens": 0
            },
            "5b05cbf0-2603-469d-9ffc-d354d8ac0f70": {
                "id": "5b05cbf0-2603-469d-9ffc-d354d8ac0f70",
                "name": "P5",
                "tokens": 0
            },
            "27b46fb9-f76c-48cb-896f-1a6c91987db3": {
                "id": "27b46fb9-f76c-48cb-896f-1a6c91987db3",
                "name": "P4",
                "tokens": 3
            }
        },
        "transitionsHash": {
            "cb361ab1-0bdc-4653-8c6c-eef751c46b82": {
                "id": "cb361ab1-0bdc-4653-8c6c-eef751c46b82",
                "name": "T1"
            },
            "e35c3c4a-8657-422a-892f-d36df425f02e": {
                "id": "e35c3c4a-8657-422a-892f-d36df425f02e",
                "name": "T2"
            },
            "13d01582-de77-460e-b10d-185d5b82e69a": {
                "id": "13d01582-de77-460e-b10d-185d5b82e69a",
                "name": "T3"
            }
        }
    }];
}