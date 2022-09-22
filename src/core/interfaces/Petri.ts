export interface Place{
    key?: string | number
    name: string,
    tokens: number,
    outputs?: any[]
}

export interface Transition{
    name: string,
    key?: string | number
    outputs?: any[]
}
