import uuid from 'react-uuid'

export class Place {

    public id: string
    public name: string
    public tokens: number

    constructor() {
        this.id = uuid()
        this.name = `P1`
        this.tokens = 0
    }

}

