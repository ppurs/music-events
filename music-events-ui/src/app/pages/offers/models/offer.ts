export interface Offer {
    id?: number,
    title: string,
    description: string,
    city: string,
    location?: string,
    date: Date, 
    type: string,
    genre?: string,  //???
    organizer?: string
}