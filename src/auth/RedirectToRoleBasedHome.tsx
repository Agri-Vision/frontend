import { useAuthContext } from "@asgardeo/auth-react";
import React from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../pages/Loading";

const RedirectToRoleBasedHome: React.FC = () => {
    const { getDecodedIDToken } = useAuthContext();

    const getUserRole = async () => {
        const decodedIdToken = await getDecodedIDToken();

        return decodedIdToken?.application_roles || [];
    };

    const [redirectPath, setRedirectPath] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchUserRole = async () => {
            const roles = await getUserRole();

            if (roles.includes("admin")) {
                setRedirectPath("/admin/admin-dashboard");
            } else if (roles.includes("agent")) {
                setRedirectPath("/agent/agent-dashboard");
            } else if (roles.includes("user")) {
                setRedirectPath("/user/customer-home");
            } else {
                setRedirectPath("/unauthorized");
            }
        };

        fetchUserRole();
    }, []);

    if (!redirectPath) {
        return <><Loading /></>; // Show loading spinner until role is determined
    }

    return <Navigate to={redirectPath} replace />;
};

export default RedirectToRoleBasedHome;