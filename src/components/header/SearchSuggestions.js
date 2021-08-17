import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import styled from "styled-components";

export default function SearchSuggestions({ search, usersFound }) {
  const loading = <Loader type="Oval" color="#6D6D6D" height={40} width={40} />;

  return (
    <Suggestions searching={search}>
      {usersFound !== null ? (
        usersFound.length > 0 ? (
          usersFound.map((f) => (
            <Link to={`/user/${f.id}`} key={f.id}>
              <UserSearched key={f.id}>
                <UserAvatar src={f.avatar} alt={f.username} />
                <UserName>{f.username}</UserName>
                {f.isFollowingLoggedUser ? <span> • following</span> : ""}
              </UserSearched>
            </Link>
          ))
        ) : (
          <NotFound>Nenhum usuário encontrado</NotFound>
        )
      ) : (
        <NotFound>{loading}</NotFound>
      )}
    </Suggestions>
  );
}

const Suggestions = styled.div`
  width: 100%;
  background-color: whitesmoke;
  border-radius: 0 0 5px 5px;
  position: absolute;
  top: 40px;
  left: 0;
  display: ${(props) => (props.searching ? "block" : "none")};
`;

const NotFound = styled.div`
  width: 100%;
  padding: 20px;
  font-style: italic;
  color: #7f7f7f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserSearched = styled.div`
  padding: 15px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    color: #c5c5c5;
  }
  &:hover {
    background-color: #efefef;
    border-radius: 0 0 5px 5px;
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
  object-fit: cover;
  margin-right: 13px;
`;

const UserName = styled.p`
  max-width: 150px;
  color: #515151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
