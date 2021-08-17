import styled from "styled-components";

import Post from "./post/Post";

export default function RenderPosts(props) {
  const { arrayOfPosts, setArrayOfPosts, location, followers, pageUrl } = props;
  return arrayOfPosts !== null ? (
    arrayOfPosts.length > 0 ? (
      location === "/timeline" ? (
        followers && followers.length > 0 ? (
          listOfPosts(arrayOfPosts, setArrayOfPosts, pageUrl)
        ) : (
          <Info>Voce nao segue ninguem ainda, procure por perfis na busca</Info>
        )
      ) : (
        listOfPosts(arrayOfPosts, setArrayOfPosts, pageUrl)
      )
    ) : (
      <Info>Nenhum post encontrado</Info>
    )
  ) : (
    ""
  );
}

function listOfPosts(arrayOfPosts, setArrayOfPosts, pageUrl) {
  return arrayOfPosts?.map((p, i) => (
    <Post
      key={p.id}
      index={i}
      postDetails={p}
      setArrayOfPosts={setArrayOfPosts}
      arrayOfPosts={arrayOfPosts}
      pageUrl={pageUrl}
    />
  ));
}

const Info = styled.div`
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  margin-top: 50px;
`;
