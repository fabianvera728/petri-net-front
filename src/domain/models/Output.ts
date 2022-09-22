export class Output {
    transition: string
    place: string
    number_of_outputs: number

    constructor(transition: string, place: string, number_of_outputs: number) {
        this.transition = transition
        this.place = place
        this.number_of_outputs = number_of_outputs
    }

}