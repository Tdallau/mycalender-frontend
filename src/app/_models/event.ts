export interface Event {
  SUMMARY: string;
  DTSTAMP: string;
  DTSTART: string;
  DTEND: string;
  DESCRIPTION?: string;
  LOCATION: string;
  DURATION?: string;
  UID: string;
}