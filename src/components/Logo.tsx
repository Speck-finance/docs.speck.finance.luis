import { FC } from "react";
import logo from "../assets/logo.svg";

export const Logo: FC = () => {
  return (
    <div className="relative group">
      <a
        href="https://speck.finance"
        className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <img
          src={logo}
          alt="Speck Finance Logo"
          className="w-[26px] h-[27px]"
        />
        <span className="text-xl font-semibold text-[#1A1D1F] dark:text-white">
          Speck Finance
        </span>
      </a>
      <div className="absolute left-0 top-full mt-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Go to speck.finance
      </div>
    </div>
  );
};
