import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo.png';
import TempAvatar from '../images/temp_avatar.png';

const NavBar = () => {
  const navLinks = [
    { href: '/home', label: 'HOME' },
    { href: '/fitness-tracker', label: 'FITNESS TRACKER' },
    { href: '/exercises', label: 'EXERCISES' },
    { href: '/appointment', label: 'APPOINTMENT' },
    { href: '/profile', label: 'PROFILE' },
  ];

  const location = useLocation();

  const isActive = (match, location) => {
    if (!match) {
      return false;
    }
    // Check if the current location pathname starts with the link's href
    return location.pathname.startsWith(match.url);
  };

  return (
    <>
      <div className="fixed top-0 flex items-center w-full">
        <img src={Logo} alt="logo" className="mt-5 ml-7 w-[200px] col-auto" />
        <nav className="flex flex-row items-center ml-auto">
          <ul className="mr-2 mt-3 flex flex-row">
            <div className="text-sm p-2 align-middle">
              {navLinks.map((item) => (
                <NavLink
                  to={item.href}
                  key={item.label}
                  isActive={(match, location) => isActive(match, location)}
                  className={`leading-normal text-slate-gray mx-8 my-1 align-middle ${location.pathname.startsWith(item.href) ? 'font-bold border-primary-gray p-2' : ''
                    }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            {/* This is a temporary avatar */}
            <li>
              <img src={TempAvatar} alt="tempAvatar" className="w-[35px] mx-7 my-1" />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
