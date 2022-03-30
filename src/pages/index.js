import { useMoralis } from "react-moralis";
import AuthPage from "../components/AuthPage";
import UploadForm from "../components/UploadForm";

const Home = () => {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) {
    return <AuthPage />;
  }
  return (
    <div>
      <UploadForm />
    </div>
  );
};

export default Home;
