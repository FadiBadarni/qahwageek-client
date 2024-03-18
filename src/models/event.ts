export interface MeetupEvent {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  imageUrl: string;
  eventLink: string;
  isOnlineEvent: boolean;
  location?: string;
  category: EventCategory;
}
export interface EventCategory {
  id: number;
  name: string;
  description?: string;
}
