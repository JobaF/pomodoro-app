import ProgressCircle from "@/components/ProgressCircle";
import { SettingsIcon } from "@/components/SettingsIcon";
import {
  getLeftOverSeconds,
  getMinutesFromSeconds,
} from "@/utils/timeCalculations";
import { useEffect, useRef, useState } from "react";

type Buttons = {
  id: number;
  text: string;
};

type Timers = {
  pomodoroTimerInSeconds: number;
  shortBreakTimerInSeconds: number;
  longBreakTimerInSeconds: number;
};

export default function Home() {
  const POMDORO_TIMER_IN_SECONDS = 15;
  const SHORT_BREAK_TIMER_IN_SECONDS = 300;
  const LONG_BREAK_TIMER_IN_SECONDS = 600;
  const intervalRef = useRef<NodeJS.Timer>();

  const [secondsLeft, setSecondsLeft] = useState<number>(
    POMDORO_TIMER_IN_SECONDS
  );
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  useEffect(() => {
    setProgress(Math.floor((secondsLeft / POMDORO_TIMER_IN_SECONDS) * 100));
  }, [secondsLeft]);
  const [progress, setProgress] = useState<number>(100);
  const [activeButton, setActiveButton] = useState<number>(1);
  const accentColor = "#E06469";
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const buttons: Buttons[] = [
    { id: 1, text: "pomodoro" },
    { id: 2, text: "short break" },
    { id: 3, text: "long break" },
  ];
  const handleTimerStart = () => {
    if (!isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    setIsTimerRunning((prev) => !prev);
  };
  return (
    <div className="font-poppins font-bold h-screen bg-violet-950 flex justify-center items-center">
      <div className="w-full xl:w-1/2 max-w-[700px] h-full flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="w-full mt-10">
          <h1 className="text-2xl md:text-3xl text-center text-neutral-300">
            pomodoro
          </h1>
        </div>
        {/* Buttons */}
        <div className="p-1 sm:w-1/2 text-sm w-3/4 h-12 rounded-full flex gap-2 bg-violet-900 text-gray-300">
          {buttons.map((button, id) => (
            <button
              key={id}
              onClick={() => setActiveButton((prev) => button.id)}
              className={`w-1/3 h-full rounded-full ${
                activeButton === button.id
                  ? "bg-accent shadow-inner shadow-black"
                  : ""
              }  drop-shadow-lg ${
                activeButton !== button.id &&
                "hover:shadow-inner hover:shadow-black"
              } `}
            >
              {button.text}
            </button>
          ))}
        </div>
        {/* Counter */}
        <div className="relative w-96 h-96 flex-col flex justify-center items-center">
          <ProgressCircle
            stroke={2}
            progress={progress}
            strokeColor={accentColor}
          />
          <p className="absolute text-7xl text-neutral-300">
            {getMinutesFromSeconds(secondsLeft) +
              ":" +
              getLeftOverSeconds(secondsLeft)}
          </p>
          <button
            onClick={handleTimerStart}
            className="absolute border p-1 rounded-md hover:border-accent hover:text-accent hover:scale-105 bottom-1/4 text-xl text-neutral-300"
          >
            {isTimerRunning ? "P A U S E" : "S T A R T"}
          </button>
        </div>
        {/* Settings */}
        <div className="w-full flex items-center justify-center h-12">
          <SettingsIcon strokeColor={accentColor} />
        </div>
      </div>
    </div>
  );
}
