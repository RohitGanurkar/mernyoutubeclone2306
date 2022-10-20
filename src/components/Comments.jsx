import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SendIcon from '@mui/icons-material/Send';
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
 
`;

function Comments({videoId}) {
  

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const [commentInput, setSommentInput] = useState("")

  const addComment =async() =>{
    const res = await axios.post("https://mernyoutubeclone2306.herokuapp.com/api/comments", {desc:commentInput,videoId:videoId} , {
          headers:{
            accesstoken:localStorage.getItem('accesstoken')
          }
        })
    setSommentInput("")
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://mernyoutubeclone2306.herokuapp.com/api/comments/${videoId}`,{
          headers:{
            accesstoken:localStorage.getItem('accesstoken')
          }
        });
        setComments(res.data);
      } catch (err) {
        
      }
    };
    fetchComments();
  }, [videoId ,comments]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." value={commentInput} onChange={e=>setSommentInput(e.target.value)}/>
        <Button onClick={addComment}><SendIcon/></Button>
      </NewComment>
      {comments.map((comment)=>{
        return <Comment key={comment._id} comment={comment}/>
      })}
    </Container>
  )
}

export default Comments