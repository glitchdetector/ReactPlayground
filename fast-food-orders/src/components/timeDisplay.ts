import { useEffect, useState } from "react";

const padded = (num: number) : string => num.toString().padStart(2, '0');

export const formatTimeSince = (seconds: number) => {
  if (seconds < 60) return `00m ${padded(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${padded(minutes)}m ${padded(seconds % 60)}s`;
  const hours = Math.floor(minutes / 60);
  return `${padded(hours)}h ${padded(minutes % 60)}m`;
}

export const useTimeSince = (timestamp: number | string | Date) => {
  const getSeconds = () => {
    const now = Date.now();
    const t = new Date(timestamp).getTime();
    return Math.floor((now - t) / 1000);
  };

  const [seconds, setSeconds] = useState(getSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(getSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return seconds;
}