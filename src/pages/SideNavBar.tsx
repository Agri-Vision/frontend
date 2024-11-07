import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
// import MuiSideNav from "../components/SideNavBars/MuiSideNav";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
//import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
//import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
//import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MuiExpandableSidebar from "../compoenents/SideNavBars/MuiExpandableSidebar";
import HomeIcon from '@mui/icons-material/Home';
import GrassIcon from '@mui/icons-material/Grass';
import SpaIcon from '@mui/icons-material/Spa';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

interface SideNavBarPropsInterface { }

const SideNavBar: FunctionComponent<
  PropsWithChildren<SideNavBarPropsInterface>
> = (): ReactElement => {
  const navItems = [
    {
      icon: <HomeIcon />,
      label: "Home",
      link: "/home/customer-home"
    },
    {
      icon: <GridViewOutlinedIcon />,
      label: "Dashboard",
      link: "/home/customer-main-detail",
    },
    {
      icon: <SpaIcon />,
      label: "Yeild Dashboard",
      link: "/home/yeild-dashboard",
    },
    {
      icon: <GrassIcon />,
      label: "Stress Dashboard",
      link: "/home/stress-dashboard",
    },
    {
      icon: <CoronavirusIcon />,
      label: "Disease Dashboard",
      link: "/home/disease-dashboard",
    },
    // {
    //   icon: <DraftsOutlinedIcon />,
    //   label: "Example6",
    //   subItems: [
    //     {
    //       icon: <StarBorderOutlinedIcon />,
    //       label: "SubExample1",
    //       link: "/home/example1",
    //     },
    //     {
    //       icon: <DeleteOutlinedIcon />,
    //       label: "SubExample2",
    //       link: "/home/subexample2",
    //     },
    //   ],
    // },
  ];

  return (
    <>
      <MuiExpandableSidebar items={navItems} />

    </>
  );
};

export default SideNavBar;
