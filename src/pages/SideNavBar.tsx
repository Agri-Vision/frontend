import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MuiExpandableSidebar from "../compoenents/SideNavBars/MuiExpandableSidebar";
import HomeIcon from '@mui/icons-material/Home';


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
    

  ];

  return (
    <>
      <MuiExpandableSidebar items={navItems} />

    </>
  );
};

export default SideNavBar;
