// Unauthorized.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Unauthorized</h1>
            <p>You do not have access to this page.</p>
            <button className="btn primary" onClick={() => { navigate("/") }}>Go back to home</button>
        </div>
    );
};

export default Unauthorized;
