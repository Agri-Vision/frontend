import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SecureApp } from "@asgardeo/auth-react";
import { BaseLayout } from "../layouts/BaseLayout";
import CustomerMainDetail from "../pages/CustomerMainDetail";
import StressMainDashboard from "../pages/StressMainDashboard";
import YeildMainDashboard from "../pages/YeildMainDashboard";
import DiseaseMainDashboard from "../pages/DiseaseMainDashboard";
import AgentDashboard from "../pages/AgentDashboard";
import Example1 from "../pages/Example1";
import ProjectDetail from "../compoenents/AgentDashboardPannels/ProjectDetail";
import AdminProjectCreation from "../compoenents/AdminDashboardPanels/AdminProjectCreation";
import AdminDashboard from "../pages/AdminDashboard";
import CreateOrganization from "../compoenents/AdminDashboardPanels/CreateOrganization";
import UploadMaps from "../compoenents/AgentDashboardPannels/UploadMaps";
import { NotFoundPage } from "../pages/NotFound";
import { Loading } from "../pages/Loading";
import CustomerHome from "../pages/CustomerHome";
import RedirectToRoleBasedHome from "../auth/RedirectToRoleBasedHome";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import Unauthorized from "../pages/Unauthorized";

const IndexRoutes: React.FC = () => {
    return (
        <SecureApp fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<RedirectToRoleBasedHome />} />

                {/* User specific routes */}
                <Route path="/user" element={<BaseLayout />}>
                    <Route element={<ProtectedRoutes allowedRoles={['user']} />}>
                        <Route path="customer-home" element={<CustomerHome />} />
                        <Route path="customer-main-detail/:id" element={<CustomerMainDetail />} />
                        {/* <Route path="customer-main-detail" element={<CustomerMainDetail />} /> */}
                        <Route path="stress-dashboard" element={<StressMainDashboard />} />
                        <Route path="yeild-dashboard" element={<YeildMainDashboard />} />
                        <Route path="disease-dashboard" element={<DiseaseMainDashboard />} />
                    </Route>
                </Route>

                {/* Agent specific routes */}
                <Route path="/agent" element={<BaseLayout />}>
                    <Route element={<ProtectedRoutes allowedRoles={['agent']} />}>
                        <Route path="agent-dashboard" element={<AgentDashboard />} />
                        <Route path="agent-dashboard/project/:id" element={<ProjectDetail />} />
                        <Route path="agent-dashboard/project/:id" element={<ProjectDetail />} />
                        <Route path="agent-dashboard/upload-map/:id" element={<UploadMaps />} />
                    </Route>
                </Route>

                {/* Admin specific routes */}
                <Route path="/admin" element={<BaseLayout />}>
                    <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
                        <Route path="admin-dashboard" element={<AdminDashboard />} />
                        <Route path="admin-dashboard/project/:id" element={<ProjectDetail />} />
                        <Route path="admin-dashboard/create-project" element={<AdminProjectCreation />} />
                        <Route path="admin-dashboard/create-organization" element={<CreateOrganization />} />
                    </Route>
                </Route>

                {/* TODO: unknown routes need to update */}
                <Route path="example1" element={<Example1 />} />
                <Route path="example1" element={<Example1 />} />

                {/* Common routes */}
                <Route path="/loading" element={<Loading />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="/NotFoundPage" element={<NotFoundPage />} />
            </Routes>
        </SecureApp >
    );
};

export default IndexRoutes;
