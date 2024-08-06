import { Buddy } from './Auth.types';
import { StoryWithBuddies } from './Story.types';
import { TripWithContract } from './Trips.types';

export type BuddyTripStory = {
    buddies: Buddy[];
    trips: TripWithContract[];
    stories: StoryWithBuddies[];
};
