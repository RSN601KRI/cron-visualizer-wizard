
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseCronExpression, isValidCronExpression } from "../utils/cronParser";
import { AlertCircle } from "lucide-react";

const CronExpressionEvaluator = () => {
  const [cronExpression, setCronExpression] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [parsedFields, setParsedFields] = useState({
    seconds: { value: "*", active: false },
    minutes: { value: "*", active: false },
    hours: { value: "*", active: false },
    days: { value: "*", active: false },
    month: { value: "*", active: false },
    dayOfWeek: { value: "*", active: false },
  });

  useEffect(() => {
    if (cronExpression.trim()) {
      const valid = isValidCronExpression(cronExpression);
      setIsValid(valid);
      
      if (valid) {
        const parsed = parseCronExpression(cronExpression);
        if (parsed) {
          setParsedFields(parsed);
        }
      }
    } else {
      // Reset to default when input is empty
      setIsValid(true);
      setParsedFields({
        seconds: { value: "*", active: false },
        minutes: { value: "*", active: false },
        hours: { value: "*", active: false },
        days: { value: "*", active: false },
        month: { value: "*", active: false },
        dayOfWeek: { value: "*", active: false },
      });
    }
  }, [cronExpression]);

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="cronExpression" className="text-lg font-medium">
          Cron Expression
        </Label>
        <Input
          id="cronExpression"
          value={cronExpression}
          onChange={(e) => setCronExpression(e.target.value)}
          placeholder="e.g., 0 */5 * * * *"
          className={`mt-1 ${!isValid && cronExpression ? 'border-red-500' : ''}`}
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter a 6-part cron expression (seconds minutes hours days month day-of-week)
        </p>
        
        {!isValid && cronExpression && (
          <div className="flex items-center mt-2 text-red-500">
            <AlertCircle size={16} className="mr-1" />
            <span className="text-sm">Invalid cron expression format</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Parsed Fields</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <span className="font-medium">Seconds:</span>
            <span>
              {parsedFields.seconds.value} 
              {parsedFields.seconds.active && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  active
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <span className="font-medium">Minutes:</span>
            <span>
              {parsedFields.minutes.value}
              {parsedFields.minutes.active && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  active
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <span className="font-medium">Hours:</span>
            <span>
              {parsedFields.hours.value}
              {parsedFields.hours.active && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  active
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <span className="font-medium">Days:</span>
            <span>
              {parsedFields.days.value}
              {parsedFields.days.active && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  active
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <span className="font-medium">Month:</span>
            <span>
              {parsedFields.month.value}
              {parsedFields.month.active && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  active
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <span className="font-medium">Day of Week:</span>
            <span>
              {parsedFields.dayOfWeek.value}
              {parsedFields.dayOfWeek.active && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  active
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
      
      {cronExpression && isValid && (
        <div className="p-4 bg-cron-light-purple rounded-md">
          <h3 className="text-lg font-medium mb-2 text-cron-dark-purple">Cron Expression Explanation</h3>
          <p className="text-sm text-gray-700">
            This expression will run at {parsedFields.seconds.active ? `second ${parsedFields.seconds.value}` : 'every second'}, 
            {parsedFields.minutes.active ? ` minute ${parsedFields.minutes.value}` : ' every minute'}, 
            {parsedFields.hours.active ? ` hour ${parsedFields.hours.value}` : ' every hour'}, 
            {parsedFields.days.active ? ` day ${parsedFields.days.value}` : ' every day'} 
            {parsedFields.month.active ? ` of month ${parsedFields.month.value}` : ' of every month'} 
            {parsedFields.dayOfWeek.active ? ` on ${getDayName(parsedFields.dayOfWeek.value)}` : ''}.
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function to convert numeric day of week to name
const getDayName = (dayValue: string): string => {
  const dayMap: Record<string, string> = {
    "0": "Sunday",
    "1": "Monday", 
    "2": "Tuesday", 
    "3": "Wednesday", 
    "4": "Thursday", 
    "5": "Friday", 
    "6": "Saturday"
  };
  
  return dayMap[dayValue] || dayValue;
};

export default CronExpressionEvaluator;
