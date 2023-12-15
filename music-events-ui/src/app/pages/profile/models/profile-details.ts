import { AccountDetails } from "./account-details";
import { MusicProfile } from "src/app/pages/profile/models/music-profile";

export interface ProfileDetails extends AccountDetails {
    musicProfiles: MusicProfile[]
}