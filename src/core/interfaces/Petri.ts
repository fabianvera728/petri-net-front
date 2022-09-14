export interface Petri{
    name: string,
    description: string,
    places: Place[],
    tokens: Token[],
    inputs: Input[],
    transitions: Transition[]
}

export interface Input{
    transition: Transition,
    places: Place[]
}

export interface Place{
    name: string
}

export interface Token{
    name: string
}

export interface Transition{
    name: string
}