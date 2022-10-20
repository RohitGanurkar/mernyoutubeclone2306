import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TimeAgo from "timeago-react";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

function Comment({comment}) {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchData = async() =>{
      const channelRes = await axios.get(
        `http://localhost:8800/api/users/find/${comment.userId}`,{
          headers:{
            accesstoken:localStorage.getItem('accesstoken')
          }
        }
      );
      setChannel(channelRes.data);
    }
    fetchData()
  }, [comment.useId])
  
  
  return (
    <Container>
      <Avatar src={channel.img}/>
      <Details>
        <Name>
          {channel.name}<Date><TimeAgo datetime={comment.createdAt} locale='ind'/></Date>
        </Name>
        <Text>
          {comment.desc}
        </Text>
      </Details>
    </Container>
  )
}

export default Comment