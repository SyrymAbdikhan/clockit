import { useState } from "react";

import { CountUp } from "./components/countup";
import { DatetimePicker } from "./components/datetime-picker";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  const urlSeconds = getQueryParam("s", new Date().getTime());
  const urlDate = new Date(parseInt(urlSeconds));
  const [startDate, setStartDate] = useState<Date | undefined>(urlDate);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="fixed top-0 right-0 m-4 flex gap-4 items-center">
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-4">
        <CountUp startDate={startDate} className="mb-[4rem]" />
        <DatetimePicker
          defaultDate={urlDate}
          defaultTime={urlDate}
          onClick={(new_date) => {
            setStartDate(new_date);
            setQueryParam("s", new_date.getTime());
          }}
          className="w-max mx-auto"
        />
      </div>
    </ThemeProvider>
  );
}

function setQueryParam(key: string, value: any) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url.toString());
}

function getQueryParam(key: string, defaultValue: any = undefined) {
  const value = new URLSearchParams(window.location.search).get(key);
  return value ? value : defaultValue;
}
