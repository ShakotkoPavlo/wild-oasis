import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapture = true) {
  const localRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (localRef.current && !localRef.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClickOutside, listenCapture);
    return () => {
      document.removeEventListener("click", handleClickOutside, listenCapture);
    };
  }, [handler, listenCapture]);

  return localRef;
}
