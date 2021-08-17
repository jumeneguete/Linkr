import styled from "styled-components";

export default function YoutubeVideo({ youtubeLink, postDetails }) {
  const { link, linkTitle } = postDetails;
  return (
    <>
      <YoutubeObject
        data={`https://www.youtube.com/embed/${youtubeLink}`}
        title={linkTitle}
      />
      <VideoLink>{link}</VideoLink>
    </>
  );
}

const YoutubeObject = styled.object`
  width: 100%;
  height: 300px;

  @media (max-width: 614px) {
    height: 200px;
  }
`;

const VideoLink = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: #b7b7b7;
  margin-top: 10px;

  @media (max-width: 614px) {
    font-size: 11px;
  }
`;
