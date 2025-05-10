
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseCronExpression } from "../utils/cronParser";

const CronExpressionEvaluator = () => {
  const [cronExpression, setCronExpression] = useState("");
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
      const parsed = parseCronExpression(cronExpression);
      if (parsed) {
        setParsedFields(parsed);
      }
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
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter a 6-part cron expression (seconds minutes hours days month day-of-week)
        </p>
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
    </div>
  );
};

export default CronExpressionEvaluator;
