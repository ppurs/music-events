import { SortOrder } from "src/app/shared/models/sort-order";

export interface TicketsFilter {
    startDate?: string,
    endDate?: string,
    order: SortOrder
}