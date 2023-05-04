import ProgressCircle from "@/components/ProgressCircle";
import { SettingsIcon } from "@/components/SettingsIcon";
import { getLeftOverSeconds } from "@/utils/getLeftOverSeconds";
import { useState } from "react";

type buttonActive = 1 | 2 | 3;

export default function Home() {
  const color = "red";
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [activeButton, setActiveButton] = useState<buttonActive>(2);
  const accentColor = "#E06469";

  return (
    <div className="font-poppins font-bold h-screen bg-violet-950 flex justify-center items-center">
      <div className="w-full lg:w-1/2 max-w-[700px] h-full flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="w-full mt-10">
          <h1 className="text-2xl md:text-3xl text-center text-neutral-300">
            pomodoro
          </h1>
        </div>
        {/* Buttons */}
        <div className="p-1 text-sm w-3/5 h-14 rounded-full flex gap-2 bg-violet-900 text-gray-300">
          <button
            onClick={() => setActiveButton((prev) => 1)}
            className={`w-1/3 h-full rounded-full ${
              activeButton === 1 ? "bg-accent shadow-inner shadow-black" : ""
            }  drop-shadow-lg ${
              activeButton !== 1 &&
              "hover:shadow-inner hover:shadow-black hover:bg-gray-800"
            } `}
          >
            pomodoro
          </button>
          <button
            onClick={() => setActiveButton((prev) => 2)}
            className={`w-1/3 h-full rounded-full ${
              activeButton === 2 ? "bg-accent shadow-inner shadow-black" : ""
            }  drop-shadow-lg ${
              activeButton !== 2 &&
              "hover:shadow-inner hover:shadow-black hover:bg-gray-800"
            } `}
          >
            short break
          </button>
          <button
            onClick={() => setActiveButton((prev) => 3)}
            className={`w-1/3 h-full rounded-full ${
              activeButton === 3 ? "bg-accent shadow-inner shadow-black" : ""
            }  drop-shadow-lg ${
              activeButton !== 3 &&
              "hover:shadow-inner hover:shadow-black hover:bg-gray-800"
            } `}
          >
            long break
          </button>
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
