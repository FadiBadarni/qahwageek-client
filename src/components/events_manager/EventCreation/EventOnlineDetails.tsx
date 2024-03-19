import { useJsApiLoader } from '@react-google-maps/api';
import { NewEvent } from 'models/event';
import React, { useEffect, useRef, useState } from 'react';

interface EventOnlineDetailsProps {
  newEvent: NewEvent;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  updateLocation: (value: string) => void;
}

const googleMapsLibraries: 'places'[] = ['places'];

export const EventOnlineDetails: React.FC<EventOnlineDetailsProps> = ({
  newEvent,
  handleInputChange,
  updateLocation,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: googleMapsLibraries,
  });

  const locationInputRef = useRef<HTMLInputElement>(null);
  const [localLocation, setLocalLocation] = useState(newEvent.location);

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete | null = null;

    const handlePlaceSelect = () => {
      const place = autocomplete?.getPlace();
      if (!place || !place.geometry || !place.geometry.location) {
        console.error('No details available for input: ' + place?.name);
        return;
      }
      const formattedAddress = place.formatted_address || '';
      setLocalLocation(formattedAddress);
      updateLocation(formattedAddress);
    };

    if (isLoaded && locationInputRef.current && !newEvent.isOnlineEvent) {
      autocomplete = new window.google.maps.places.Autocomplete(
        locationInputRef.current,
        {
          types: ['establishment'],
          componentRestrictions: { country: 'IL' },
          fields: ['place_id', 'name', 'geometry', 'formatted_address'],
        }
      );

      autocomplete.addListener('place_changed', handlePlaceSelect);
    }

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [isLoaded, updateLocation, newEvent.isOnlineEvent]);

  useEffect(() => {
    if (newEvent.isOnlineEvent) {
      setLocalLocation('');
    } else {
      setLocalLocation(newEvent.location);
    }
  }, [newEvent.isOnlineEvent, newEvent.location]);

  const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLocation(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6">
      <div className="md:w-1/2">
        <label
          htmlFor="isOnlineEvent"
          className="flex items-center text-sm font-medium text-light-text dark:text-dark-text"
        >
          <input
            id="isOnlineEvent"
            name="isOnlineEvent"
            type="checkbox"
            checked={newEvent.isOnlineEvent}
            onChange={handleInputChange}
            className="rounded border-neutral-300 text-brand-500 shadow-sm focus:border-brand-300 focus:ring focus:ring-offset-0 focus:ring-brand-500 ml-2"
          />
          هل الفعالية عبر الإنترنت؟
        </label>
        <input
          ref={locationInputRef}
          id="location"
          name="location"
          type="text"
          value={localLocation}
          onChange={handleLocalInputChange}
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
          placeholder={
            newEvent.isOnlineEvent
              ? 'أدخل رابط الحدث عبر الإنترنت (مثل Zoom)'
              : 'أدخل موقع الفعالية هنا'
          }
        />
      </div>
      <div className="md:w-1/2">
        <label
          htmlFor="eventLink"
          className="block text-sm font-medium text-light-text dark:text-dark-text"
        >
          رابط الفعالية
        </label>
        <input
          id="eventLink"
          name="eventLink"
          type="text"
          value={newEvent.eventLink}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
          placeholder="أدخل رابط الفعالية إذا كان متاحًا"
        />
      </div>
    </div>
  );
};
