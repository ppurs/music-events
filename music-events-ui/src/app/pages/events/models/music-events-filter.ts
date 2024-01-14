import { MusicEventsFilterOptions } from "./music-events-filter-options";

export interface MusicEventsFilter extends MusicEventsFilterOptions {
    search?: string,
    startDate?: string,
    endDate?: string,
}