import { createContext, useContext } from 'react';

export const TOPICS = [
  'An AI audit',
  'A specific agent',
  'Support for an agent we built',
  'A website',
  'Not sure yet',
] as const;

export type Topic = (typeof TOPICS)[number];

export const ContactContext = createContext<(topic?: Topic) => void>(() => {});

/** Returns a function that opens the contact form, optionally with a topic preselected. */
export const useContact = () => useContext(ContactContext);
