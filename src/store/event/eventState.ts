import { EventCalendar, EventCategory, MeetupEvent } from 'models/event';
import {
  CommonState,
  LoadingStatus,
  PaginatedData,
} from 'store/shared/commonState';

export interface EventState {
  upcomingEvents: CommonState<MeetupEvent[]>;
  eventsCategories: CommonState<EventCategory[]>;
  eventsByCategory: CommonState<PaginatedData<MeetupEvent[]>>;
  allEvents: CommonState<PaginatedData<MeetupEvent[]>>;
  selectedEvent: CommonState<MeetupEvent | null>;
  calendarEvents: CommonState<EventCalendar[]>;
  chosenEvent: CommonState<MeetupEvent | null>;
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
  eventsByCategory: {
    data: {
      items: [],
      totalCount: 0,
      currentPage: 0,
      totalPages: 0,
    },
    status: LoadingStatus.Idle,
    error: null,
  },
  allEvents: {
    data: {
      items: [],
      totalCount: 0,
      currentPage: 0,
      totalPages: 0,
    },
    status: LoadingStatus.Idle,
    error: null,
  },
  selectedEvent: {
    data: null,
    status: LoadingStatus.Idle,
    error: null,
  },
  calendarEvents: {
    data: [],
    status: LoadingStatus.Idle,
    error: null,
  },
  chosenEvent: {
    data: null,
    status: LoadingStatus.Idle,
    error: null,
  },
};
