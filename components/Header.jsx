"use client";

import { ModeToggle } from "./DarkModeSwitch";

const Header = () => {
  return (
    <header className="py-6 px-2 w-full mx-auto">
      <div className="w-7xl max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="/"
          className="my-0 flex items-center text-xl md:text-3xl font-semibold  no-underline hover:text-slate-200"
        >
          <span>Recent Earthquakes</span>
        </a>
        <ul className="navbar-nav ms-auto list-none flex">
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
