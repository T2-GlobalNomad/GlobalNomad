import { RefObject, SetStateAction, useEffect } from 'react';

interface Props {
  ref: RefObject<HTMLDivElement | null>;
  setter: React.Dispatch<SetStateAction<boolean>>;
}

export default function useClickOutside({ ref, setter }: Props) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setter(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setter]);
}
