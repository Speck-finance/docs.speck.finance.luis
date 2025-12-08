import { Link, useLocation } from "react-router-dom";
import { FC } from "react";

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

export const Sidebar: FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden lg:block fixed top-14 left-0 w-44 h-[calc(100vh-3.5rem)] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive(item.path)
                    ? "bg-gray-100 dark:bg-gray-700 text-blue-600"
                    : ""
                }`}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.title}
              </Link>
              {item.children && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`block px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-white hover:text-gray-900 dark:hover:bg-gray-800 ${
                        isActive(child.path)
                          ? "bg-gray-100 dark:bg-gray-700 text-blue-600"
                          : ""
                      }`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};
