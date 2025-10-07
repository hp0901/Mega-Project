// import React, { Fragment, useEffect, useState } from "react";
// import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { RxCross2 } from "react-icons/rx";
// import { Menu, Transition } from "@headlessui/react";

// import { apiConnector } from "../../services/apiconnector";
// import { categoriesEndpoints } from '../../services/apis';
// import { NavbarLinks } from "../../data/navbar-links";
// import logoImg from "../../assets/Logo/Logo-Full-Light.png";
// import { logout } from "../../slices/authSlice";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Redux state
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);

//   const location = useLocation();

//   // Local state
//   const [isLoading, setIsLoading] = useState(false);
//   const [subLinks, setSubLinks] = useState([]);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Fetch categories for sublinks
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setIsLoading(true);
//       try {
//         const result = await apiConnector("GET", categoriesEndpoints.CATEGORIES_API);
//         console.log("Api result:", result?.data?.data);
//         setSubLinks(result?.data?.data || []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setSubLinks([]); // fallback to empty array
//       }
//        setIsLoading(false);
//     };
//     fetchCategories();
//   },  [] );

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   // Check if route matches current location
//   const matchRoute = (route) => {
//     if (!route) return false;
//     return matchPath({ path: route }, location.pathname);
//   };

//   // Logout handler
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <header className="sticky top-0 z-50 border-b border-richblack-700 bg-richblack-800 backdrop-blur-sm">
//       <div className="flex items-center justify-between w-11/12 max-w-maxContent mx-auto py-3">
        
//         {/* Logo */}
//         <Link to="/" className="flex-shrink-0">
//           <img src={logoImg} alt="Logo" width={160} height={42} loading="lazy" />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex flex-1 justify-center items-center gap-x-6 text-richblack-25 font-medium">
//           {NavbarLinks.map((link, i) => (
//             <Link
//               key={i}
//               to={link.path}
//               className={`px-3 py-2 rounded-md hover:bg-richblack-700 ${
//                 matchRoute(link.path) ? "bg-richblack-700 text-yellow-25" : ""
//               }`}
//             >
//               {link.title}
//             </Link>
//           ))}
//         </nav>

//         {/* Desktop Right Side */}
//         <div className="hidden md:flex items-center gap-x-4">
//           {/* Cart */}
//           {user && user.accountType !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative text-richblack-5">
//               <AiOutlineShoppingCart size={24} />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-yellow-100 text-richblack-900 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}

//           {/* Profile Photo Dropdown */}
//           {token ? (
//             <Menu as="div" className="relative inline-block text-left">
//               <Menu.Button className="flex items-center">
//                 <img
//                   src={user?.image || "/default-avatar.png"}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full border-2 border-yellow-50 object-cover"
//                 />
//               </Menu.Button>

//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-richblack-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-richblack-700">
//                   <div className="py-1 flex flex-col">
//                     <Menu.Item>
//                       {({ active }) => (
//                         <Link
//                           to="/dashboard/my-profile"
//                           className={`block px-4 py-2 text-sm text-richblack-25 hover:bg-richblack-700 ${active ? "bg-richblack-700" : ""}`}
//                         >
//                           Dashboard
//                         </Link>
//                       )}
//                     </Menu.Item>
//                     <Menu.Item>
//                       {({ active }) => (
//                         <button
//                           onClick={handleLogout}
//                           className={`w-full text-left px-4 py-2 text-sm text-richblack-25 hover:bg-richblack-700 ${active ? "bg-richblack-700" : ""}`}
//                         >
//                           Logout
//                         </button>
//                       )}
//                     </Menu.Item>
//                   </div>
//                 </Menu.Items>
//               </Transition>
//             </Menu>
//           ) : (
//             <div className="flex items-center gap-x-2">
//               <Link
//                 to="/login"
//                 className="px-3 py-1.5 text-richblack-100 border border-richblack-700 rounded-md hover:bg-richblack-700"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-3 py-1.5 bg-yellow-50 text-black rounded-md hover:bg-yellow-100 font-semibold"
//               >
//                 Sign up
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="md:hidden text-richblack-25"
//         >
//           {isMobileMenuOpen ? <RxCross2 size={24} /> : <GiHamburgerMenu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <Transition
//         show={isMobileMenuOpen}
//         as={Fragment}
//         enter="transition ease-out duration-200"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <div className="md:hidden absolute top-full right-4 mt-2 w-64 origin-top-right rounded-md bg-richblack-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-richblack-700">
//           <div className="p-4">

//             {/* Main Links */}
//             <div className="flex flex-col gap-y-1">
//               {NavbarLinks.map((link, i) => (
//                 <Link
//                   key={i}
//                   to={link.path}
//                   className={`block px-3 py-2 rounded-md text-base font-medium text-richblack-25 hover:bg-richblack-700 ${
//                     matchRoute(link.path) ? "bg-richblack-700 text-yellow-25" : ""
//                   }`}
//                 >
//                   {link.title}
//                 </Link>
//               ))}
//             </div>

//             <div className="my-4 border-t border-richblack-700"></div>

//             {/* Mobile Cart */}
//             {user && user.accountType !== "Instructor" && (
//               <Link
//                 to="/dashboard/cart"
//                 className="relative flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-richblack-25 hover:bg-richblack-700"
//               >
//                 <AiOutlineShoppingCart size={24} />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-2 left-6 bg-yellow-100 text-richblack-900 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                     {totalItems}
//                   </span>
//                 )}
//                 <p className="ml-3">Cart</p>
//               </Link>
//             )}

//             {/* Mobile Dashboard + Logout */}
//             {token ? (
//               <div className="mt-4 flex flex-col gap-y-2">
//                 <Link
//                   to="/dashboard/my-profile"
//                   className="py-2 text-center border border-richblack-600 rounded-md text-richblack-25 hover:bg-richblack-700"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="py-2 text-center bg-yellow-50 text-black rounded-md font-semibold hover:bg-yellow-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-4 flex flex-col gap-y-2">
//                 <Link
//                   to="/login"
//                   className="py-2 text-center border border-richblack-600 rounded-md text-richblack-25 hover:bg-richblack-700"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="py-2 text-center bg-yellow-50 text-black rounded-md font-semibold hover:bg-yellow-100"
//                 >
//                   Sign up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </Transition>
//     </header>
//   );
// };

// export default Navbar;

import React, { Fragment, useEffect, useState } from "react";
// Assuming react-router-dom is available in the environment
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
// Assuming @headlessui/react is available in the environment
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

// --- Mock Data and Services (to remove dependencies) ---

// Mocked data that was previously imported
const NavbarLinks = [
  { title: "Home", path: "/" },
  { title: "Catalog", path: "/catalog" },
  { title: "About Us", path: "/about" },
  { title: "Contact Us", path: "/contact" },
];

// Mocked API connector to simulate fetching data
const mockApiConnector = (method, url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (url === 'CATEGORIES_API') {
        resolve({
          data: {
            data: [
              { name: "Web Development", _id: "1" },
              { name: "Data Science", _id: "2" },
              { name: "Machine Learning", _id: "3" },
            ],
          },
        });
      } else {
        resolve({ data: {} });
      }
    }, 500); // Simulate network delay
  });
};

// --- SVG Icons (to replace react-icons) ---

const AiOutlineShoppingCart = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" {...props}><path d="M922.9 701.9H327.4l29.9-113.4L252.3 294c-5.6-22.5-27.1-39-50.8-39H160c-26.5 0-48 21.5-48 48s21.5 48 48 48h42.1l135.5 459.4c5.6 22.5 27.1 39 50.8 39h402.1c26.5 0 48-21.5 48-48s-21.5-48-48-48H382.4l-29.9-113.4h485.4c21.8 0 40.1-16.1 43.1-37.7l73.4-442.2c1-6.3-1.6-12.8-6.9-17.1-5.3-4.2-12.5-5.2-19.1-2.8L307.3 345.5l-43.2-162.8c-1.6-6.3-7.5-10.7-14.1-10.7H160c-26.5 0-48 21.5-48 48s21.5 48 48 48h22.4l43.2 162.8L922.9 701.9zM362.5 821.8c-48.3 0-87.5 39.2-87.5 87.5s39.2 87.5 87.5 87.5 87.5-39.2 87.5-87.5-39.2-87.5-87.5-87.5zM774.5 821.8c-48.3 0-87.5 39.2-87.5 87.5s39.2 87.5 87.5 87.5 87.5-39.2 87.5-87.5-39.2-87.5-87.5-87.5z"></path></svg>
);

const GiHamburgerMenu = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" {...props}><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
);

const RxCross2 = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
);


const Navbar = () => {
  const navigate = useNavigate();

  // --- Mocked Redux State (using useState) ---
  const [token, setToken] = useState("mock-token"); // Simulate user being logged in
  const [user, setUser] = useState({
    accountType: "Student",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe"
  });
  const [totalItems, setTotalItems] = useState(3);

  const location = useLocation();

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch categories for sublinks using mocked API
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const result = await mockApiConnector("GET", "CATEGORIES_API");
        console.log("Mock Api result:", result?.data?.data);
        setSubLinks(result?.data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setSubLinks([]); // fallback to empty array
      }
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if route matches current location
  const matchRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, location.pathname);
  };

  // Logout handler
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setTotalItems(0);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-richblack-700 bg-richblack-800 backdrop-blur-sm">
      <div className="flex items-center justify-between w-11/12 max-w-maxContent mx-auto py-3">
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="https://placehold.co/160x42/0A0A0A/FFFFFF?text=StudyNotion" alt="Logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-x-6 text-richblack-25 font-medium">
          {NavbarLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`px-3 py-2 rounded-md hover:bg-richblack-700 ${
                matchRoute(link.path) ? "bg-richblack-700 text-yellow-25" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-x-4">
          {/* Cart */}
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative text-richblack-5">
              <AiOutlineShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-100 text-richblack-900 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Profile Photo Dropdown */}
          {token ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="flex items-center">
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-yellow-50 object-cover"
                />
              </MenuButton>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-richblack-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-richblack-700">
                  <div className="py-1 flex flex-col">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          to="/dashboard/my-profile"
                          className={`block px-4 py-2 text-sm text-richblack-25 hover:bg-richblack-700 ${active ? "bg-richblack-700" : ""}`}
                        >
                          Dashboard
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`w-full text-left px-4 py-2 text-sm text-richblack-25 hover:bg-richblack-700 ${active ? "bg-richblack-700" : ""}`}
                        >
                          Logout
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          ) : (
            <div className="flex items-center gap-x-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-richblack-100 border border-richblack-700 rounded-md hover:bg-richblack-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1.5 bg-yellow-50 text-black rounded-md hover:bg-yellow-100 font-semibold"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-richblack-25"
        >
          {isMobileMenuOpen ? <RxCross2 size={24} /> : <GiHamburgerMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isMobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden absolute top-full right-4 mt-2 w-64 origin-top-right rounded-md bg-richblack-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-richblack-700">
          <div className="p-4">

            {/* Main Links */}
            <div className="flex flex-col gap-y-1">
              {NavbarLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-richblack-25 hover:bg-richblack-700 ${
                    matchRoute(link.path) ? "bg-richblack-700 text-yellow-25" : ""
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="my-4 border-t border-richblack-700"></div>

            {/* Mobile Cart */}
            {user && user.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                className="relative flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-richblack-25 hover:bg-richblack-700"
              >
                <AiOutlineShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 left-6 bg-yellow-100 text-richblack-900 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
                <p className="ml-3">Cart</p>
              </Link>
            )}

            {/* Mobile Dashboard + Logout */}
            {token ? (
              <div className="mt-4 flex flex-col gap-y-2">
                <Link
                  to="/dashboard/my-profile"
                  className="py-2 text-center border border-richblack-600 rounded-md text-richblack-25 hover:bg-richblack-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 text-center bg-yellow-50 text-black rounded-md font-semibold hover:bg-yellow-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-y-2">
                <Link
                  to="/login"
                  className="py-2 text-center border border-richblack-600 rounded-md text-richblack-25 hover:bg-richblack-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="py-2 text-center bg-yellow-50 text-black rounded-md font-semibold hover:bg-yellow-100"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Navbar;

