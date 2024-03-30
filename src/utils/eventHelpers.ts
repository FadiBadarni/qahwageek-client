import { AppDispatch } from 'store/store';
import { EventCategory, NewEvent } from 'models/event';
import { createEvent, uploadEventImageToS3 } from 'store/event/eventActions';

export const handleEventInputChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setNewEvent: React.Dispatch<React.SetStateAction<NewEvent>>,
  eventsCategories: EventCategory[],
  setEventImage: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const { name, value, type } = e.target;
  const isCheckbox = type === 'checkbox';
  if (type === 'file') {
    // Handle file inputs for the image upload
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      setEventImage(files[0]);
    }
  } else if (name === 'isOnlineEvent') {
    const isChecked = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : false;
    setNewEvent((prev) => ({
      ...prev,
      [name]: isChecked,
      // Clear the location if the event is marked as online
      location: isChecked ? '' : prev.location,
    }));
  } else if (name === 'category') {
    // Handling category selection
    const selectedCategory = eventsCategories.find(
      (category) => category.id === Number(value)
    );
    setNewEvent((prev) => ({
      ...prev,
      category: selectedCategory || prev.category,
    }));
  } else {
    // Handling changes for all other inputs
    const newValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;
    setNewEvent((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }
};

export const handleEventDateChange = (
  date: Date | null,
  setNewEvent: React.Dispatch<React.SetStateAction<NewEvent>>,
  dateType: 'start' | 'end'
) => {
  setNewEvent((prev) => ({
    ...prev,
    [dateType === 'start' ? 'startDateTime' : 'endDateTime']:
      date?.toISOString() ?? '',
  }));
};

export const handleEventSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  newEvent: NewEvent,
  eventImage: File | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  setNewEvent: React.Dispatch<React.SetStateAction<NewEvent>>
) => {
  e.preventDefault();
  setLoading(true);

  try {
    const imageUrl = await uploadEventImageHelper(eventImage, dispatch);

    const eventDetailsWithImage = {
      ...newEvent,
      imageUrl,
    };

    await dispatch(createEvent(eventDetailsWithImage)).unwrap();

    setNewEvent({
      title: '',
      description: '',
      startDateTime: new Date().toISOString(),
      endDateTime: new Date().toISOString(),
      imageUrl: '',
      eventLink: '',
      isOnlineEvent: false,
      location: '',
      category: { id: 0, name: '', description: '' },
    });
  } catch (error) {
    console.error('Error creating event:', error);
  } finally {
    setLoading(false);
  }
};

export const uploadEventImageHelper = async (
  imageFile: File | null,
  dispatch: AppDispatch
): Promise<string> => {
  if (!imageFile) return '';

  const filename = `event-image-${Date.now()}.${imageFile.type.split('/')[1]}`;
  try {
    const imageUrl = await dispatch(
      uploadEventImageToS3({ file: imageFile, filename })
    ).unwrap();
    return imageUrl;
  } catch (error) {
    console.error('Error uploading event image:', error);
    throw error;
  }
};
