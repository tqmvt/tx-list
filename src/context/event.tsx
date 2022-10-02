import React, { createContext, ReactNode, useContext, useState } from 'react';

import { TransactionType } from '@/lib/types';

type Props = {
  children: ReactNode;
};

interface EventContextProps {
  event: TransactionType;
  setEvent: (event: TransactionType) => void;
  hasNewEvent: boolean;
  setHasNewEvent: (hasEvent: boolean) => void;
  hasNewBlock: boolean;
  setHasNewBlock: (hasBlock: boolean) => void;
  currentBlockNumber: number;
  setCurrentBlockNumber: (blockNumber: number) => void;
}

const EventContext = createContext<EventContextProps>({} as EventContextProps);

export function EventWrapper({ children }: Props): JSX.Element {
  const [event, setEvent] = useState<TransactionType>({} as TransactionType);
  const [hasNewEvent, setHasNewEvent] = useState<boolean>(false);
  const [hasNewBlock, setHasNewBlock] = useState<boolean>(false);
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);

  return (
    <>
      <EventContext.Provider
        value={{
          event,
          setEvent,
          hasNewEvent,
          setHasNewEvent,
          hasNewBlock,
          setHasNewBlock,
          currentBlockNumber,
          setCurrentBlockNumber,
        }}
      >
        {children}
      </EventContext.Provider>
    </>
  );
}

export function useEventContext() {
  return useContext(EventContext);
}
