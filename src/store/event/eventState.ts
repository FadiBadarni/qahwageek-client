import { EventCategory, MeetupEvent } from 'models/event';
import { CommonState, LoadingStatus } from 'store/shared/commonState';

export interface EventState {
  upcomingEvents: CommonState<MeetupEvent[]>;
  eventsCategories: CommonState<EventCategory[]>;
}

export const initialEventState: EventState = {
  upcomingEvents: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
  eventsCategories: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
};
