import { createContext, useState, useEffect, useContext } from "react";

import { getUserFollowers } from "../functions/apiFunctions";
import UserContext from "../contexts/UserContext";

const UserFollowersContext = createContext();

export default UserFollowersContext;

export function FollowersProvider({ children }) {
  const [followers, setFollowers] = useState(null);
  const { userProfile } = useContext(UserContext);

  useEffect(() => {
    if (userProfile) {
      const config = { headers: { Authorization: `Bearer ${userProfile.token}` } };
      const erroAlert = "Ocorreu um erro ao carregar os seus seguidores";
      const followersUrl = `${process.env.REACT_APP_API_BASE_URL}/users/follows`;
      getUserFollowers(setFollowers, followersUrl, erroAlert, config);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <UserFollowersContext.Provider value={{ followers }}>
      {children}
    </UserFollowersContext.Provider>
  );
}
