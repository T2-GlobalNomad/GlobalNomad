import { Reservation } from '@/lib/types';
import { InfiniteData } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export function useScrollPositioning(
  data:
    | InfiniteData<{ reservations: Reservation[]; nextPage?: number }, unknown>
    | undefined,
) {
  const listRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef(0);
  const prevScrollTopRef = useRef(0);

  useEffect(() => {
    if (listRef.current) {
      prevScrollTopRef.current = window.scrollY;
    }
  }, [data]);

  useEffect(() => {
    if (listRef.current) {
      const heightDiff =
        listRef.current.scrollHeight - prevScrollHeightRef.current;
      if (heightDiff > 0) {
        window.scrollTo({ top: prevScrollTopRef.current, behavior: 'instant' });
      }
    }
  }, [data]);

  return { listRef, prevScrollHeightRef, prevScrollTopRef };
}
