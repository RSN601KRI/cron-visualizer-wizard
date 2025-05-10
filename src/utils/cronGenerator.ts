
type RecurrenceOptions = {
  time: string;
  amPm: "am" | "pm";
  selectedDays: string[];
  dayOfMonth: string;
};

/**
 * Format time for display in the description
 */
const formatTimeForDisplay = (time: string, amPm: "am" | "pm"): string => {
  if (!time) return "00:00";
  
  const [hours, minutes] = time.split(":");
  const formattedHours = hours || "00";
  const formattedMinutes = minutes || "00";
  
  return `${formattedHours}:${formattedMinutes} ${amPm.toUpperCase()}`;
};

/**
 * Generate a human-readable description based on the recurrence pattern and options
 */
export const generateDescription = (
  pattern: "daily" | "weekly" | "monthly",
  options: RecurrenceOptions
): string => {
  const { time, amPm, selectedDays, dayOfMonth } = options;
  const formattedTime = formatTimeForDisplay(time, amPm);

  switch (pattern) {
    case "daily":
      return `Runs every day at ${formattedTime}.`;
    
    case "weekly":
      if (selectedDays.length === 0) {
        return "Please select at least one day of the week.";
      }
      
      const daysString = selectedDays
        .map(day => day.charAt(0).toUpperCase() + day.slice(1))
        .join(", ")
        .replace(/,([^,]*)$/, ' and$1');
      
      return `Runs every week on ${daysString} at ${formattedTime}.`;
    
    case "monthly":
      const dayWithSuffix = addOrdinalSuffix(dayOfMonth);
      return `Runs every month on the ${dayWithSuffix} at ${formattedTime}.`;
    
    default:
      return "Invalid recurrence pattern.";
  }
};

/**
 * Add ordinal suffix to a number (1st, 2nd, 3rd, etc.)
 */
const addOrdinalSuffix = (day: string): string => {
  const num = parseInt(day, 10);
  if (isNaN(num)) return day;
  
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return num + "st";
  }
  if (j === 2 && k !== 12) {
    return num + "nd";
  }
  if (j === 3 && k !== 13) {
    return num + "rd";
  }
  return num + "th";
};
