
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { generateDescription } from "../utils/cronGenerator";

type RecurrencePattern = "daily" | "weekly" | "monthly";

const RecurrencePatternGenerator = () => {
  const [pattern, setPattern] = useState<RecurrencePattern>("daily");
  const [time, setTime] = useState("12:00");
  const [amPm, setAmPm] = useState<"am" | "pm">("pm");
  const [selectedDays, setSelectedDays] = useState<string[]>(["monday"]);
  const [dayOfMonth, setDayOfMonth] = useState("1");
  const [description, setDescription] = useState("");

  const weekdays = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  useEffect(() => {
    setDescription(
      generateDescription(pattern, {
        time,
        amPm,
        selectedDays,
        dayOfMonth,
      })
    );
  }, [pattern, time, amPm, selectedDays, dayOfMonth]);

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="recurrencePattern" className="text-lg font-medium">
          Recurrence Pattern
        </Label>
        <Select
          value={pattern}
          onValueChange={(value) => setPattern(value as RecurrencePattern)}
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="time" className="text-lg font-medium">
          Time
        </Label>
        <div className="flex mt-1 space-x-2">
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="flex-grow"
          />
          <Select value={amPm} onValueChange={(value) => setAmPm(value as "am" | "pm")}>
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="am">AM</SelectItem>
              <SelectItem value="pm">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {pattern === "weekly" && (
        <div>
          <Label className="text-lg font-medium mb-2 block">Days of Week</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {weekdays.map((day) => (
              <div key={day.id} className="flex items-center space-x-2">
                <Checkbox
                  id={day.id}
                  checked={selectedDays.includes(day.id)}
                  onCheckedChange={() => handleDayToggle(day.id)}
                />
                <label
                  htmlFor={day.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {day.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {pattern === "monthly" && (
        <div>
          <Label htmlFor="dayOfMonth" className="text-lg font-medium">
            Day of Month
          </Label>
          <Select
            value={dayOfMonth}
            onValueChange={setDayOfMonth}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {daysOfMonth.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="mt-8 bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Generated Description:</h3>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default RecurrencePatternGenerator;
