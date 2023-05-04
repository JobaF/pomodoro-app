import ProgressCircle from "@/components/ProgressCircle";
import { SettingsIcon } from "@/components/SettingsIcon";
import { getLeftOverSeconds } from "@/utils/getLeftOverSeconds";
import { useState } from "react";

type buttons = {
  id: number;
  text: string;
};
export default function Home() {
  const color = "red";
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [activeButton, setActiveButton] = useState<number>(1);
  const accentColor = "#E06469";

  const buttons: buttons[] = [
    { id: 1, text: "pomodoro" },
    { id: 2, text: "short break" },
    { id: 3, text: "long break" },
  ];

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
        <div className="p-1 sm:text-sm sm:w-1/2 text-xs w-3/4 h-14 rounded-full flex gap-2 bg-violet-900 text-gray-300">
          {buttons.map((button) => (
            <button
              onClick={() => setActiveButton((prev) => button.id)}
              className={`w-1/3 h-full rounded-full ${
                activeButton === button.id
                  ? "bg-accent shadow-inner shadow-black"
                  : ""
              }  drop-shadow-lg ${
                activeButton !== button.id &&
                "hover:shadow-inner hover:shadow-black hover:bg-gray-800"
              } `}
            >
              {button.text}
            </button>
          ))}
        </div>
        {/* Counter */}
        <div className="relative w-96 h-96 flex-col flex justify-center items-center">
          <div className="w-full h-full rounded-full bg-violet-900">
            <ProgressCircle
              stroke={2}
              progress={50}
              strokeColor={accentColor}
            />
          </div>
          <p className="absolute text-7xl text-neutral-300">
            {timeLeft + ":" + getLeftOverSeconds(timeLeft)}
          </p>
          <button className="absolute bottom-1/4 text-xl text-neutral-300">
            P A U S E
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
