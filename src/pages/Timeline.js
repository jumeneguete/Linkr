import { useState, useEffect, useContext } from "react";
import useInterval from "react-useinterval";

import UserContext from "../contexts/UserContext";
import GenericPage from "../components/GenericPage";
import { callServer, reloadPosts } from "../functions/apiFunctions";

export default function Timeline() {
  const { userProfile } = useContext(UserContext);
  const [postsList, setPostsList] = useState(null);
  const [morePostsToLoad, setMorePostsToLoad] = useState(true);
  const pageUrl = `${process.env.REACT_APP_API_BASE_URL}/following/posts`;
  const erroAlert = "Sorry, we couln't load your timeline posts";
  let urlToGetMorePosts = "";

  if (postsList && postsList.length > 0) {
    const lastPostId = postsList[postsList.length - 1].id;
    urlToGetMorePosts = `${process.env.REACT_APP_API_BASE_URL}/following/posts?olderThan=${lastPostId}`;
  }

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${userProfile.token}` } };
    callServer(setPostsList, pageUrl, erroAlert, config);

    // eslint-disable-next-line
  }, []);

  useInterval(() => {
    const config = { headers: { Authorization: `Bearer ${userProfile.token}` } };
    reloadPosts(postsList, setPostsList, pageUrl, erroAlert, config);
  }, 15000);

  return (
    postsList && (
      <GenericPage
        title={`timeline`}
        arrayOfPosts={postsList}
        setArrayOfPosts={setPostsList}
        morePostsToLoad={morePostsToLoad}
        setMorePostsToLoad={setMorePostsToLoad}
        urlToGetMorePosts={urlToGetMorePosts}
        pageUrl={pageUrl}
      />
    )
  );
}
