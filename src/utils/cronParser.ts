
/**
 * Parse a cron expression string into its component parts
 */
export const parseCronExpression = (expression: string) => {
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
      active: seconds !== "*"
    },
    minutes: {
      value: minutes,
      active: minutes !== "*"
    },
    hours: {
      value: hours,
      active: hours !== "*"
    },
    days: {
      value: days,
      active: days !== "*"
    },
    month: {
      value: month,
      active: month !== "*"
    },
    dayOfWeek: {
      value: dayOfWeek,
      active: dayOfWeek !== "*"
    }
  };
};
