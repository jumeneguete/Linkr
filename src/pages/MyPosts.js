import { useState, useEffect, useContext } from "react";

import UserContext from "../contexts/UserContext";
import GenericPage from "../components/GenericPage";
import { callServer } from "../functions/apiFunctions";

export default function MyPosts() {
  const { userProfile } = useContext(UserContext);
  const { user } = userProfile;
  const { id } = user;
  const [myPostsList, setMyPostsList] = useState(null);
  const [morePostsToLoad, setMorePostsToLoad] = useState(true);

  const pageUrl = `${process.env.REACT_APP_API_BASE_URL}/users/${id}/posts`;
  const erroAlert = "Sorry, we couln't load your posts";

  let urlToGetMorePosts = "";

  if (myPostsList && myPostsList.length > 0) {
    const lastPostId = myPostsList[myPostsList.length - 1].id;
    urlToGetMorePosts = `${process.env.REACT_APP_API_BASE_URL}/users/${id}/posts?olderThan=${lastPostId}`;
  }

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${userProfile.token}` } };
    callServer(setMyPostsList, pageUrl, erroAlert, config);
    // eslint-disable-next-line
  }, []);

  return (
    myPostsList && (
      <GenericPage
        title={`My Posts`}
        arrayOfPosts={myPostsList}
        setArrayOfPosts={setMyPostsList}
        morePostsToLoad={morePostsToLoad}
        setMorePostsToLoad={setMorePostsToLoad}
        url={urlToGetMorePosts}
      />
    )
  );
}
