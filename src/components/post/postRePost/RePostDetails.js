import { useContext } from "react";
import { Link } from "react-router-dom";
import { BiRepost } from "react-icons/bi";
import styled from "styled-components";

import UserContext from "../../../contexts/UserContext";

export default function RePostDetails({ postDetails }) {
    const { repostedBy } = postDetails;
    const { userProfile } = useContext(UserContext);

    return (
        <Repost>
            <RepostInfo>
                <BiRepost color={"#fff"} />
                <span>
                    Re-posted by{" "}
                    <Link to={`/user/${repostedBy.id}`}>
                        {repostedBy.id === userProfile.user.id
                            ? "you"
                            : repostedBy.username}
                    </Link>
                </span>
            </RepostInfo>
        </Repost>
    );
}

const Repost = styled.div`
    background-color: #1e1e1e;
    padding: 10px 20px 28px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 16px 16px 0px 0px;
    margin-bottom: -20px;
    @media (max-width: 614px) {
        border-radius: 0;
    }
    span {
        margin-left: 5px;
        color: #fff;
        font-size: 12px;
    }
`;

const RepostInfo = styled.div`
    background-color: #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 614px) {
        border-radius: 0;
    }
    span {
        margin-left: 5px;
        color: #fff;
        font-size: 12px;
    }
`;

/*

*/
