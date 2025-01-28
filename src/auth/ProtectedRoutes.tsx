import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

interface ProtectedRoutesProps {
    allowedRoles: string[];
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
    const { signIn, state, getDecodedIDToken } = useAuthContext();
    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const location = useLocation();

    useEffect(() => {
        const fetchRolesAndCheckAccess = async () => {
            try {
                const decodedIdToken = await getDecodedIDToken();

                if (decodedIdToken && decodedIdToken.application_roles) {

                    const roles: string[] = Array.isArray(decodedIdToken.application_roles)
                        ? decodedIdToken.application_roles
                        : [decodedIdToken.application_roles];

                    const access = roles.some((role: string) => allowedRoles.includes(role));

                    setHasAccess(access);

                } else {
                    console.warn("application_roles is not an array:", decodedIdToken?.application_roles);
                    setHasAccess(false); // No roles = no access
                }
            } catch (error) {
                console.error("Error fetching roles:", error);
                setHasAccess(false); // Error = no access
            } finally {
                setIsLoading(false); // Loading complete
            }
        };

        fetchRolesAndCheckAccess();
    }, [getDecodedIDToken, allowedRoles]);

    if (isLoading) {
        // Optionally render a loading spinner while roles are being fetched
        return <div>Loading...</div>;
    }

    if (!state.isAuthenticated) {
        // Redirect to login if user is not authenticated
        signIn()
            .then(() => {
                console.log("Redirecting to Asgardeo login page...");
            })
            .catch((error) => {
                console.error("Error during sign-in:", error);
            });

        return <div>Redirecting to login...</div>;
    }

    if (!hasAccess) {
        // Redirect to unauthorized page if user doesn't have the right roles
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;