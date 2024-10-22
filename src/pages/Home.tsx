import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Loading } from "./Loading";
import Projects from "../compoenents/Home/Projects";

const Home = () => {
  const { signIn, state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    signIn();
    console.log(state);
    if (!state?.isAuthenticated) {
      return;
    } else {
      navigate(`/sidenavex`);
    }
  });
  //[ state?.isAuthenticated ]

  return (
    <div>
      <h2 style={{ textAlign: 'left', fontFamily: 'Nunito, Poppins, sans-serif', marginBottom: '20px' }}>Estates</h2>
      <div className="header"><Projects /></div>
    </div>
  );
};

export default Home;
