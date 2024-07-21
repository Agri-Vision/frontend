import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Loading } from "./Loading";

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
      <p>Hello world This is Loading Home Page</p>
    </div>
  );
};

export default Home;
