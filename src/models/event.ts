import { PostStatus } from './post';

export interface MeetupEvent {
  id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  imageUrl: string;
  eventLink: string;
  onlineEvent: boolean;
  location?: string;
  category: EventCategory;
  status: EventStatus;
  userId: number;
  creator: string;
  createdAt: string;
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
  startDateTime: string;
  endDateTime: string;
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

export const translatePostStatus = (status: PostStatus) => {
  const statusTranslations: { [key in PostStatus]: string } = {
    [PostStatus.Pending]: 'قيد الانتظار',
    [PostStatus.Published]: 'منشور',
    [PostStatus.Rejected]: 'مرفوض',
  };

  return statusTranslations[status];
};
