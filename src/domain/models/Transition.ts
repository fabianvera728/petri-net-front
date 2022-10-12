import uuid from 'react-uuid'


export class Transition {
    public id: string
    public name: string

    constructor() {
        this.id = uuid()
        this.name = `T1`
    }

}
