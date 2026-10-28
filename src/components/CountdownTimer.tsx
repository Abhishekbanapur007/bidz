import React, { useState, useEffect } from 'react';
import { formatTimeRemaining } from '../utils/timeFormat';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endTime: string;
  compact?: boolean;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endTime,
  compact = false,
  className = '',
}) => {
  const [time, setTime] = useState(() => formatTimeRemaining(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTimeRemaining(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  if (time.isExpired) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 ${className}`}>
        <Clock className="w-3.5 h-3.5" />
        <span>Closed</span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 tabular-nums ${
        time.isUrgent
          ? 'text-amber-600 font-semibold'
          : 'text-slate-700 font-medium'
      } ${compact ? 'text-xs' : 'text-sm'} ${className}`}
    >
      <Clock className={`w-3.5 h-3.5 ${time.isUrgent ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
      <span>{time.text}</span>
    </div>
  );
};
