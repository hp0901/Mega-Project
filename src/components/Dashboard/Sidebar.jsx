import React, { useState, useEffect } from 'react';
import { sidebarLinks } from '../../data/dashboard-links';
import { logout } from "../../services/Operations/authAPI";
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut, VscThreeBars, VscChromeClose } from "react-icons/vsc";
import ConfirmationModal from '../common/ConformationModel';

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [collapsed, setCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) setCollapsed(false);
      else setCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (profileLoading || authLoading) {
    return <div className='mt-10 text-white'>Loading...</div>;
  }

  return (
    <>
      {/* 🔘 Toggle button (always visible at top, works for both desktop & mobile) */}
      <button
        onClick={() => setCollapsed(prev => !prev)}
        aria-label={collapsed ? "Open Sidebar" : "Close Sidebar"}
        className="fixed top-4 left-4 z-[1000] p-2 rounded-md bg-richblack-700 text-yellow-400 hover:bg-yellow-900 transition-colors"
      >
        {collapsed ? <VscThreeBars size={24} /> : <VscChromeClose size={24} />}
      </button>

      {/* Backdrop overlay for mobile */}
      {!isDesktop && !collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998]"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative top-0 left-0
          bg-richblack-800 text-white
          h-full md:h-[calc(100vh-3.5rem)]
          z-[999]
          flex flex-col
          duration-300 ease-in-out
          border-r border-r-richblack-700
          ${collapsed ? 'w-0 overflow-hidden' : 'w-56'}
        `}
      >
        {/* Sidebar Links */}
        <div className="flex flex-col flex-1 overflow-y-auto pt-14 space-y-1">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
                collapsed={collapsed && isDesktop}
              />
            );
          })}
        </div>

        {/* Divider */}
        <div className="mx-auto mb-4 h-[1px] w-10/12 bg-richblack-600"></div>

        {/* Settings + Logout */}
        <div className="flex flex-col space-y-2 pb-4">
          <SidebarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName="VscSettingsGear"
            collapsed={collapsed && isDesktop}
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-sm font-medium text-richblack-300 hover:text-yellow-400 transition-colors"
          >
            <div className="flex items-center justify-center gap-x-2">
              <VscSignOut className="text-lg" />
              {!collapsed && <span>Logout</span>}
            </div>
          </button>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    </>
  );
};

export default Sidebar;
