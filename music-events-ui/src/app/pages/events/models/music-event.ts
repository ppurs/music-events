export interface MusicEvent {
    id: number,
    title: string,
    description?: string,
    performer?: string,
    city: string,
    place: string,
    date: Date, 
    type: string,
    genre?: string,  //???
    price: number,
}