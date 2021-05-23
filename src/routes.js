// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import ToysTwoToneIcon from '@material-ui/icons/ToysTwoTone';
import ReceiptIcon from '@material-ui/icons/Receipt';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Lights from "views/Lights/Lights";
import Fans from "views/Fans/Fans";
import WindowCurtains from "views/WindowCurtains/WindowCurtains";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/lights",
    name: "Lights",
    icon: EmojiObjectsTwoToneIcon,
    component: Lights,
    layout: "/admin",
  },
  {
    path: "/fans",
    name: "Fans",
    icon: ToysTwoToneIcon,
    component: Fans,
    layout: "/admin",
  },
  {
    path: "/windowCurtains",
    name: "Window Curtains",
    icon: ReceiptIcon,
    component: WindowCurtains,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin",
  // },
  
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
