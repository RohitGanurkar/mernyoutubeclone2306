import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TimeAgo from "timeago-react";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  padding-top: ${(props) => props.type === "delete" && "10px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "300px" : "100%")};
  height: ${(props) => (props.type === "sm" ? "150px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Div = styled.div`
  padding-top:3px;
  height: 25px;
  cursor: pointer;
  color: red;
`;

function Card({ type, video, deleteVideo }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
    const fetchUser = async () => {
      const res = await axios.get(
        `https://mernyoutubeclone2306.herokuapp.com/api/users/find/${video.userId}`
      );
      setUser(res.data);
    };

    fetchUser();
  }, [video.userId , currentUser , navigate]);

  return (
    <>
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <Container type={type}>
          <Image type={type} src={video.imgUrl} />
          <Details type={type}>
            <ChannelImage type={type} src={user.img} />
            <Texts>
              <Title>{video.title}</Title>
              <ChannelName>{user.name} </ChannelName>
              <Info>
                {video.views} views •{" "}
                <TimeAgo datetime={video.createdAt} locale="ind" />
              </Info>
            </Texts>
          </Details>
        </Container>
      </Link>
      {type === "delete" && (
        <Div
          onClick={() => {
            deleteVideo(video._id);
          }}
        >
          <HighlightOffIcon />
        </Div>
      )}
    </>
  );
}

export default Card;
