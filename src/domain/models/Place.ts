import { v4 } from 'uuid'

export class Place {
    public id: string
    public name: string
    public tokens: number

    constructor() {
        this.id = v4()
        this.name = `P1`
        this.tokens = 0
    }

}

