export interface MusicEvent {
    id: number,
    title: string,
    description?: string,
    performers?: string[],     
    city: string,
    location: string,
    date: Date, 
    type: string,
    genre?: string,  //???
    price: number,
    ticketsAvailable: boolean
}