"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DatetimePickerProps {
  defaultDate?: Date;
  defaultTime?: Date;
  onClick?: (new_date: Date | undefined) => void;
  className?: string;
}

export function DatetimePicker({
  defaultDate = new Date(),
  defaultTime = defaultDate,
  onClick,
  className,
}: DatetimePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [time, setTime] = useState(formatTime(defaultTime));

  useEffect(() => {
    setDate(defaultDate);
    setTime(formatTime(defaultTime));
  }, [defaultDate, defaultTime]);

  return (
    <div className={cn("grid gap-4 items-end grid-cols-1 sm:flex", className)}>
      <div className="flex gap-4">
        <div>
          <Label htmlFor="date-picker" className="px-1 mb-3">
            Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="time-picker" className="px-1 mb-3">
            Time
          </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 sm:flex">
        <Button
          className="col-span-3"
          onClick={() => {
            if (onClick && date && time) {
              const new_date = combineDateAndTime(date, time);
              onClick(new_date);
            }
          }}
        >
          Set
        </Button>
        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                if (onClick) {
                  onClick(undefined);
                }
              }}
            >
              <XIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset Time</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

function formatTime(date: Date) {
  return (
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2) + ":" +
    ("0" + date.getSeconds()).slice(-2)
  );
}

function combineDateAndTime(date: Date, time: string): Date {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);
  return newDate;
}
