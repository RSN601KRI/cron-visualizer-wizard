
/**
 * Parse a cron expression string into its component parts with enhanced validation
 */
export const parseCronExpression = (expression: string) => {
  // Handle special expressions
  if (expression.startsWith("@")) {
    return parseSpecialExpression(expression);
  }

  // Trim extra spaces and split by one or more spaces
  const parts = expression.trim().split(/\s+/);

  // Must have exactly 6 parts (seconds, minutes, hours, days, month, day-of-week)
  if (parts.length !== 6) {
    return null;
  }

  const [seconds, minutes, hours, days, month, dayOfWeek] = parts;

  return {
    seconds: {
      value: seconds,
      active: seconds !== "*" && seconds !== "?"
    },
    minutes: {
      value: minutes,
      active: minutes !== "*" && minutes !== "?"
    },
    hours: {
      value: hours,
      active: hours !== "*" && hours !== "?"
    },
    days: {
      value: days,
      active: days !== "*" && days !== "?"
    },
    month: {
      value: month,
      active: month !== "*" && month !== "?"
    },
    dayOfWeek: {
      value: dayOfWeek,
      active: dayOfWeek !== "*" && dayOfWeek !== "?"
    }
  };
};

/**
 * Parse special cron expressions like @yearly, @monthly, etc.
 */
const parseSpecialExpression = (expression: string) => {
  let seconds = "0";
  let minutes = "0";
  let hours = "0";
  let days = "*";
  let month = "*";
  let dayOfWeek = "*";

  switch (expression.toLowerCase()) {
    case "@yearly":
    case "@annually":
      month = "1";
      days = "1";
      break;
    case "@monthly":
      days = "1";
      break;
    case "@weekly":
      dayOfWeek = "0";
      break;
    case "@daily":
    case "@midnight":
      break;
    case "@hourly":
      minutes = "0";
      hours = "*";
      break;
    default:
      return null;
  }

  return {
    seconds: {
      value: seconds,
      active: seconds !== "*" && seconds !== "?"
    },
    minutes: {
      value: minutes,
      active: minutes !== "*" && minutes !== "?"
    },
    hours: {
      value: hours,
      active: hours !== "*" && hours !== "?"
    },
    days: {
      value: days,
      active: days !== "*" && days !== "?"
    },
    month: {
      value: month,
      active: month !== "*" && month !== "?"
    },
    dayOfWeek: {
      value: dayOfWeek,
      active: dayOfWeek !== "*" && dayOfWeek !== "?"
    }
  };
};

/**
 * Validate a cron expression for format correctness
 * Returns true if valid, false if invalid
 */
export const isValidCronExpression = (expression: string): boolean => {
  if (!expression || typeof expression !== 'string') return false;
  
  // Handle special expressions
  if (expression.startsWith("@")) {
    const specials = ["@yearly", "@annually", "@monthly", "@weekly", "@daily", "@midnight", "@hourly"];
    return specials.includes(expression.toLowerCase());
  }
  
  // Check for exactly 6 parts in standard format
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 6) return false;
  
  // Define value ranges for each field
  const ranges = [
    { min: 0, max: 59 }, // seconds
    { min: 0, max: 59 }, // minutes
    { min: 0, max: 23 }, // hours
    { min: 1, max: 31 }, // days
    { min: 1, max: 12 }, // months
    { min: 0, max: 6 }   // day of week (0-6, Sunday to Saturday)
  ];
  
  // Basic validation for each part
  for (let i = 0; i < 6; i++) {
    const part = parts[i];
    
    // Wildcards are always valid
    if (part === "*" || part === "?") continue;
    
    // Handle range expressions (e.g., 1-5)
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      if (isNaN(start) || isNaN(end) || 
          start < ranges[i].min || end > ranges[i].max || start > end) {
        return false;
      }
      continue;
    }
    
    // Handle list expressions (e.g., 1,3,5)
    if (part.includes(",")) {
      const values = part.split(",").map(Number);
      for (const val of values) {
        if (isNaN(val) || val < ranges[i].min || val > ranges[i].max) {
          return false;
        }
      }
      continue;
    }
    
    // Handle step expressions (e.g., */5, 1-10/2)
    if (part.includes("/")) {
      const [range, step] = part.split("/");
      if (isNaN(Number(step)) || Number(step) < 1) {
        return false;
      }
      
      // If the range part is just a wildcard, it's valid
      if (range === "*") continue;
      
      // If it's a range expression, validate it
      if (range.includes("-")) {
        const [start, end] = range.split("-").map(Number);
        if (isNaN(start) || isNaN(end) || 
            start < ranges[i].min || end > ranges[i].max || start > end) {
          return false;
        }
      }
      continue;
    }
    
    // Simple numeric value
    const val = Number(part);
    if (isNaN(val) || val < ranges[i].min || val > ranges[i].max) {
      return false;
    }
  }
  
  return true;
};
