import { OffersFilterOptions } from "./offers-filter-options";

export interface OffersFilter extends OffersFilterOptions {
    startDate?: string,
    endDate?: string,
}