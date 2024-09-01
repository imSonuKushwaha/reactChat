import { useEffect } from "react";
import Chats from "./components/chats/Chats";
import Details from "./components/details/Details";
import Lists from "./components/lists/Lists";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/Firebase";
import useUserStore from "./lib/UserStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading..</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <Lists />
          <Chats />
          <Details />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
