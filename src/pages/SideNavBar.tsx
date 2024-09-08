import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
// import MuiSideNav from "../components/SideNavBars/MuiSideNav";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MuiExpandableSidebar from "../compoenents/SideNavBars/MuiExpandableSidebar";

interface SideNavBarPropsInterface { }

const SideNavBar: FunctionComponent<
  PropsWithChildren<SideNavBarPropsInterface>
> = (): ReactElement => {
  const navItems = [
    {
      icon: <GridViewOutlinedIcon />,
      label: "Dashbord",
      link: "/home/customer-main-detail"
    },
    {
      icon: <DraftsOutlinedIcon />,
      label: "Example1",
      link: "/home/example1",
    },
    {
      icon: <SendOutlinedIcon />,
      label: "Example3",
      link: "/home/example3",
    },
    {
      icon: <StarBorderOutlinedIcon />,
      label: "Example4",
      link: "/home/example4",
    },
    {
      icon: <DeleteOutlinedIcon />,
      label: "Example5",
      link: "/home/example5",
    },
    {
      icon: <DraftsOutlinedIcon />,
      label: "Example6",
      subItems: [
        {
          icon: <StarBorderOutlinedIcon />,
          label: "SubExample1",
          link: "/home/example1",
        },
        {
          icon: <DeleteOutlinedIcon />,
          label: "SubExample2",
          link: "/home/subexample2",
        },
      ],
    },
  ];

  return (
    <>
      <MuiExpandableSidebar items={navItems} />

    </>
  );
};

export default SideNavBar;
