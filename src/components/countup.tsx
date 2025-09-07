import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { NumberLabel } from "./number-label";

interface CountUpProps {
  startDate?: Date;
  className?: string;
}

export function CountUp({ startDate = new Date(), className }: CountUpProps) {
  const [[days, hours, minutes, seconds], setTime] = useState<number[]>([
    0, 0, 0, 0,
  ]);

  useEffect(() => {
    const update = () => {
      setTime(dateDiff(startDate, new Date()));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className={cn(
      "mx-auto grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      className
    )}>
      <NumberLabel value={days} label="days" />
      <NumberLabel value={hours} label="hours" />
      <NumberLabel value={minutes} label="minutes" />
      <NumberLabel value={seconds} label="seconds" />
    </div>
  );
}

function dateDiff(startDate: Date, endDate: Date) {
  const startMs = startDate.getTime();
  const endMs = endDate.getTime();

  const sign = endMs >= startMs ? 1 : -1;
  let ts = Math.abs(Math.floor((endMs - startMs) / 1000));

  const days = sign * Math.floor(ts / 86400);
  ts %= 86400;
  const hours = sign * Math.floor(ts / 3600);
  ts %= 3600;
  const minutes = sign * Math.floor(ts / 60);
  ts %= 60;
  const seconds = sign * Math.floor(ts);

  return [days, hours, minutes, seconds];
}
