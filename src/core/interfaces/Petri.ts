export interface Petri{
    name: string,
    description: string,
    places: Place[],
    tokens: Token[],
    transitions: Transition[]
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