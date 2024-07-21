import { FunctionComponent, PropsWithChildren, ReactElement } from "react";

import { Outlet } from "react-router-dom";

import SideNavBar from "../pages/SideNavBar";
import { DeafultHeader } from "../compoenents/Header/DeafultHeader";
import { Box, Toolbar } from "@mui/material";

interface BaseLayoutProps { }

export const BaseLayout: FunctionComponent<
  PropsWithChildren<BaseLayoutProps>
> = (): ReactElement => {
  return (
    <Box>
      <Box className="header">
        <DeafultHeader />
      </Box>
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        <Box>
          <SideNavBar />
        </Box>
        <Box
          sx={{ paddingX: 5 }}
        >
          <Outlet />
        </Box>
      </Box>
      <div className="footer"></div>
    </Box>
  );
};
