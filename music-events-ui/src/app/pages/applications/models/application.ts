import { Offer } from "../../offers/models/offer"

export interface Application {
    id?: number,
    offer: Offer,
    type: string,
    bandName?: string,
    instrument?: string,
    genre?: string,
    contact?: {
        name: string,
        email?: string
    }
    status: string
}