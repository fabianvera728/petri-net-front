import {v4} from "uuid";

export class Transition {
    public id: string
    public name: string

    constructor() {
        this.id = v4()
        this.name = `T1`
    }
/*
    public toDigraph(color: string, fontColor: string) {
        return `${this.name || 'NA'} [fillcolor="${color}",fontcolor="${fontColor}"]`
    }*/

}