import React from 'react';
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from 'react-router-dom';

export default function SidebarLink({ link, iconName, collapsed }) {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative flex items-center gap-x-3
        px-4 py-2
        text-sm font-medium
        hover:bg-yellow-900 transition-colors
        ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}
        `}
    >
      {/* Left vertical bar when active */}
      <span
        className={`absolute left-0 top-0 h-full w-1 bg-yellow-50
          ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
      ></span>

      <Icon className="text-lg flex-shrink-0" />

      {/* Hide text completely when collapsed */}
      {!collapsed && (
        <span className="whitespace-nowrap">
          {link.name}
        </span>
      )}
    </NavLink>
  );
}
