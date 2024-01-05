export interface Application {
    id?: number,
    title: string,
    city: string,
    location?: string,
    date: string, 
    type: string,
    genre?: string,  
    organizer: {
        name: string,
        email?: string
    }
    status: string
}