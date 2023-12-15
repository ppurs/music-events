import { AccountDetails } from "./account-details";
import { MusicProfile } from "src/app/shared/models/music-profile";

export interface ProfileDetails extends AccountDetails {
    musicProfiles: MusicProfile[]
}