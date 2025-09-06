import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { NumberLabel } from "./number-label";

interface CountUpProps {
  startDate?: Date;
  className?: string;
}

export function CountUp({ startDate = new Date(), className }: CountUpProps) {
  const [[days, hours, minutes, seconds], setTime] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const update = () => setTime(dateDiff(startDate, new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className={cn("mx-auto flex gap-4 justify-center flex-wrap", className)}>
      <NumberLabel value={days} label="days" />
      <NumberLabel value={hours} label="hours" />
      <NumberLabel value={minutes} label="minutes" />
      <NumberLabel value={seconds} label="seconds" />
    </div>
  );
}

function dateDiff(startDate: Date, endDate: Date ) {
  let ms = endDate.getTime() - startDate.getTime();
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  ms %= 24 * 60 * 60 * 1000;
  const hours = Math.floor(ms / (60 * 60 * 1000));
  ms %= 60 * 60 * 1000;
  const minutes = Math.floor(ms / (60 * 1000));
  ms %= 60 * 1000;
  const seconds = Math.floor(ms / 1000);
  return [days, hours, minutes, seconds];
}
