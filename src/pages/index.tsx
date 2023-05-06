import { Modal } from "@/components/Modal";
import ProgressCircle from "@/components/ProgressCircle";
import { SettingsIcon } from "@/components/SettingsIcon";
import {
  getLeftOverSeconds,
  getMinutesFromSeconds,
} from "@/utils/timeCalculations";
import { useEffect, useRef, useState } from "react";
import {
  POMDORO_TIMER_IN_SECONDS,
  SHORT_BREAK_TIMER_IN_SECONDS,
  LONG_BREAK_TIMER_IN_SECONDS,
} from "@/constants/constants";

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
  const intervalRef = useRef<NodeJS.Timer>();
  const [progress, setProgress] = useState<number>(100);
  const [activeButton, setActiveButton] = useState<number>(1);
  const accentColor = "#E06469";
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const buttons: Buttons[] = [
    { id: 1, text: "pomodoro" },
    { id: 2, text: "short break" },
    { id: 3, text: "long break" },
  ];
  console.log(progress);
  const [secondsLeft, setSecondsLeft] = useState<number>(
    POMDORO_TIMER_IN_SECONDS
  );
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  useEffect(() => {
    const activeTimer =
      activeButton === 1
        ? POMDORO_TIMER_IN_SECONDS
        : activeButton === 2
        ? SHORT_BREAK_TIMER_IN_SECONDS
        : LONG_BREAK_TIMER_IN_SECONDS;
    setProgress(Math.round((secondsLeft / activeTimer) * 100 * 100) / 100);
    if (secondsLeft === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsTimerRunning(false);
    }
  }, [secondsLeft]);

  const handleTimerStart = () => {
    if (isTimerRunning) {
      clearInterval(intervalRef.current);
      setIsTimerRunning(false);
    } else {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => (prev >= 0.1 ? prev - 0.1 : 0));
      }, 100);
      setIsTimerRunning(true);
    }
  };
  const clickButton = (id: number) => {
    setActiveButton((prev) => id);
    setProgress(100);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsTimerRunning(false);
    }
    if (id === 1) {
      setSecondsLeft((prev) => POMDORO_TIMER_IN_SECONDS);
    } else if (id === 2) setSecondsLeft((prev) => SHORT_BREAK_TIMER_IN_SECONDS);
    else setSecondsLeft((prev) => LONG_BREAK_TIMER_IN_SECONDS);
  };
  return (
    <div className="font-poppins font-bold h-screen bg-violet-950 flex justify-center items-center">
      {showModal && <Modal />}
      <div className="w-full xl:w-1/2 max-w-[700px] h-full flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="w-full mt-10">
          <h1 className="text-2xl md:text-3xl text-center text-neutral-300">
            pomodoro
          </h1>
        </div>
        {/* Buttons */}
        <div className="p-1 sm:w-1/2 text-sm w-3/4 h-12 rounded-full flex gap-2 bg-violet-900 text-gray-300">
          {buttons.map((button, i) => (
            <button
              key={i}
              onClick={() => clickButton(button.id)}
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
            className={`${
              isTimerRunning ? "bg-accent" : "border border-gray-400"
            } absolute p-1 rounded-md drop-shadow-xl hover:shadow-inner hover:shadow-black bottom-1/4 text-xl text-neutral-300`}
          >
            {isTimerRunning ? "P A U S E" : "S T A R T"}
          </button>
        </div>
        {/* Settings */}
        <div className="w-full flex items-center justify-center h-12">
          <SettingsIcon
            onClick={() => setShowModal((prev) => !prev)}
            strokeColor={accentColor}
          />
        </div>
      </div>
    </div>
  );
}
