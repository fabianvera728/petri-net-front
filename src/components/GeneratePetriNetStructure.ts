export function generatePetriNetStructure() {
    return {
        name: '',
        description: '',
        places: [
            {
                name: 'P1'
            }
        ],
        transitions: [
            {
                name: 'T1'
            }
        ],
        inputs: [
            {
                transition: {
                    name: 'T1'
                },
                places: []
            }
        ],
        tokens: [
            {
                name: ''
            }
        ]
    };
}