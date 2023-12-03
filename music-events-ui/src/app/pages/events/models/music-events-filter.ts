import { MusicEventsFilterOptions } from "./music-events-filter-options";

export interface MusicEventsFilter extends MusicEventsFilterOptions {
    startDate?: Date,
    endDate?: Date,
}