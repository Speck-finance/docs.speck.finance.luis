import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { title: "Welcome to Speck", path: "/" },
  { title: "Manifesto", path: "/manifesto" },
  { title: "Whitepaper", path: "/white-paper" },
  { title: "Regulatory", path: "/regulatory" },
  // { title: "Partners", path: "/partners" },
  { title: "FAQ", path: "/faq" },
];

export const MobileMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <nav className="container mx-auto px-4 py-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive(item.path)
                    ? "bg-gray-100 dark:bg-gray-700 text-blue-600"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};
