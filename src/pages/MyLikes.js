import { useState, useEffect, useContext } from "react";

import UserContext from "../contexts/UserContext";
import GenericPage from "../components/GenericPage";
import { callServer } from "../functions/apiFunctions";

export default function MyLikes() {
  const { userProfile } = useContext(UserContext);
  const [myLikesList, setMyLikesList] = useState(null);
  const [morePostsToLoad, setMorePostsToLoad] = useState(true);

  const pageUrl = `${process.env.REACT_APP_API_BASE_URL}/posts/liked`;
  const erroAlert = "Sorry, we couln't load your liked posts";

  let urlToGetMorePosts = "";

  if (myLikesList && myLikesList.length > 0) {
    const lastPostId = myLikesList[myLikesList.length - 1].id;
    urlToGetMorePosts = `${process.env.REACT_APP_API_BASE_URL}/posts/liked?olderThan=${lastPostId}`;
  }

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${userProfile.token}` } };
    callServer(setMyLikesList, pageUrl, erroAlert, config);
    // eslint-disable-next-line
  }, []);

  return (
    myLikesList && (
      <GenericPage
        title={`My Likes`}
        arrayOfPosts={myLikesList}
        setArrayOfPosts={setMyLikesList}
        morePostsToLoad={morePostsToLoad}
        setMorePostsToLoad={setMorePostsToLoad}
        url={urlToGetMorePosts}
      />
    )
  );
}
