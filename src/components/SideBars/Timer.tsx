import React from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <div className="flex justify-center items-center h-7 w-7  lg:h-12 lg:w-12 shadow-xl border-2 border-amber-900 rounded-full bg-amber-50 ml-1">
      <h1 className="text-sm lg:text-xl font-bold">{timeLeft}</h1>
    </div>
  );
};

export default Timer;
