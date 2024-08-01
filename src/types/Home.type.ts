import { Buddy } from './Auth.types';
import { StoryWithBuddies } from './Story.types';
import { Trip } from './Trips.types';

export type BuddyTripStory = {
    buddies: Buddy[];
    trips: Trip[];
    stories: StoryWithBuddies[];
};
