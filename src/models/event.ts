export interface MeetupEvent {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  imageUrl: string;
  eventLink: string;
  onlineEvent: boolean;
  location?: string;
  category: EventCategory;
  status: EventStatus;
}
export interface EventCategory {
  id: number;
  name: string;
  description?: string;
}

export enum EventStatus {
  Pending = 'PENDING',
  Published = 'PUBLISHED',
  Rejected = 'REJECTED',
}

export interface NewEvent {
  title: string;
  description: string;
  dateTime: string;
  imageUrl: string;
  eventLink: string;
  isOnlineEvent: boolean;
  location?: string;
  category: EventCategory;
}

export const translateStatus = (status: EventStatus) => {
  const statusTranslations: { [key in EventStatus]: string } = {
    [EventStatus.Pending]: 'قيد الانتظار',
    [EventStatus.Published]: 'منشور',
    [EventStatus.Rejected]: 'مرفوض',
  };

  return statusTranslations[status];
};
