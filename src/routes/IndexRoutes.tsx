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

const IndexRoutes: React.FC = () => {
    return (
        <SecureApp fallback={<Loading />}>
            <Routes>
                <Route path="/home" element={<BaseLayout />}>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="customer-main-detail" element={<CustomerMainDetail />} />
                    <Route path="stress-dashboard" element={<StressMainDashboard />} />
                    <Route path="yeild-dashboard" element={<YeildMainDashboard />} />
                    <Route path="disease-dashboard" element={<DiseaseMainDashboard />} />
                    <Route path="agent-dashboard" element={<AgentDashboard />} />
                    <Route path="agent-dashboard/project/:projectId" element={<ProjectDetail />} />
                    <Route path="agent-dashboard/upload-map/:projectId" element={<UploadMaps />} />
                    <Route path="admin-dashboard" element={<AdminDashboard />} />
                    <Route path="admin-dashboard/project/:projectId" element={<ProjectDetail />} />
                    <Route path="admin-dashboard/create-project" element={<AdminProjectCreation />} />
                    <Route path="admin-dashboard/create-organization" element={<CreateOrganization />} />

                    <Route path="example1" element={<Example1 />} />                    
                </Route>
                <Route path="/loading" element={<Loading />} />
                <Route path="/NotFoundPage" element={<NotFoundPage />} />
            </Routes>
        </SecureApp>
    );
};

export default IndexRoutes;
