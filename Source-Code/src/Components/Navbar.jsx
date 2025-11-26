import React, { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "Products", items: ["Overview", "Pricing", "Features"] },
  { label: "Solutions", items: ["For Teams", "For Individuals", "Enterprise"] },
  { label: "Resources", items: ["Blog", "Guides", "Help Center"] },
  { label: "Company", items: ["About", "Careers", "Contact"] },
];

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenIndex(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left: logo */}
          <div className="flex items-center mx-3">
            <a href="#" className="flex items-center gap-3">
              {/* Simple logo: circle + text */}
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                <span className="font-bold text-pink-400">VS</span>
              </div>
              <span className="font-semibold text-pink-400 hidden sm:inline">
                Vansh's Site
              </span>
            </a>
          </div>

          {/* center: nav links + search */}
          <div
            className="flex-1 flex items-center justify-center sm:justify-start"
            ref={wrapperRef}
          >
            <nav className="hidden sm:flex gap-6 mr-6">
              {navItems.map((nav, idx) => (
                <div key={nav.label} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex(openIndex === idx ? null : idx);
                    }}
                    className="px-2 py-1 text-pink-400 hover:text-pink-300 focus:outline-none"
                    aria-expanded={openIndex === idx}
                    aria-haspopup="true"
                  >
                    {nav.label}
                  </button>

                  {/* dropdown */}
                  <div
                    className={`absolute left-0 mt-2 w-48 rounded-lg shadow-lg ring-1 ring-black ring-opacity-40 bg-black text-pink-300 transition-transform origin-top ${
                      openIndex === idx
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0 pointer-events-none"
                    } `}
                    style={{ zIndex: 30 }}
                    role="menu"
                    aria-hidden={openIndex !== idx}
                  >
                    <div className="py-2">
                      {nav.items.map((it) => (
                        <a
                          key={it}
                          href="#"
                          className="block px-4 py-2 text-sm hover:bg-pink-500/10"
                          role="menuitem"
                        >
                          {it}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* search bar */}
          </div>

          {/* right: profile icon */}
          <div className="flex items-center gap-4">
            <div className="flex items-center w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <input
                  className="w-full rounded-md border border-pink-700 bg-black/60 text-pink-200 placeholder-pink-500 px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-pink-200 hover:text-pink-300 focus:outline-none"
                  aria-label="Submit search"
                >
                  {/* magnifier */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="hidden sm:block">
              <button
                className="p-2 rounded-full bg-pink-500/10 hover:bg-pink-500/20 focus:outline-none"
                aria-label="Open profile menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.24 0-9.6 1.62-9.6 4.86V22h19.2v-2.74c0-3.24-6.36-4.86-9.6-4.86z" />
                </svg>
              </button>
            </div>

            {/* mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      mobileOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile panel */}
      <div
        className={`sm:hidden bg-black/95 text-pink-300 ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((nav, idx) => (
            <div key={nav.label} className="">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left px-2 py-2 font-semibold"
              >
                {nav.label}
              </button>
              <div className={`${openIndex === idx ? "block" : "hidden"} pl-4`}>
                {nav.items.map((it) => (
                  <a
                    key={it}
                    href="#"
                    className="block px-2 py-1 text-sm hover:bg-pink-500/10"
                  >
                    {it}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* mobile search repeated for convenience */}
          <div className="pt-2">
            <input
              className="w-full rounded-md border border-pink-700 bg-black/60 text-pink-200 placeholder-pink-500 px-3 py-2"
              placeholder="Search..."
            />
          </div>

          <div className="pt-2">
            <a href="#" className="flex items-center gap-2 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                U
              </div>
              <div className="text-sm">Profile</div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
