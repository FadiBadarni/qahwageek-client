import { v4 as uuidv4 } from 'uuid';

export function getSessionId(): string {
  const sessionIdCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('sessionId='));
  if (sessionIdCookie) {
    return sessionIdCookie.split('=')[1];
  } else {
    const newSessionId = uuidv4();
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
    document.cookie = `sessionId=${newSessionId}; expires=${expires.toUTCString()}; path=/`;
    return newSessionId;
  }
}
