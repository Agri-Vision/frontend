import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SecureApp } from "@asgardeo/auth-react";

import { BaseLayout } from "../layouts/BaseLayout";

import CustomerMainDetail from "../pages/CustomerMainDetail";
import Example1 from "../pages/Example1";
import { NotFoundPage } from "../pages/NotFound";
import { Loading } from "../pages/Loading";

const IndexRoutes: React.FC = () => {
    return (
        <SecureApp fallback={<Loading />}>
            <Routes>
                <Route path="/home" element={<BaseLayout />}>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="customer-main-detail" element={<CustomerMainDetail />} />
                    <Route path="example1" element={<Example1 />} />                    
                </Route>
                <Route path="/loading" element={<Loading />} />
                <Route path="/NotFoundPage" element={<NotFoundPage />} />
            </Routes>
        </SecureApp>
    );
};

export default IndexRoutes;
