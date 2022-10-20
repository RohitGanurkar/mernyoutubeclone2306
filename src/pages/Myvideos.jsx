import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Myvideos = () => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const deleteVideo = async(videoId) =>{
    const res = await axios.delete(`http://localhost:8800/api/videos/${videoId}`,{
          headers:{
            accesstoken:localStorage.getItem('accesstoken')
          }
        });
    console.log(res)
    toast.success("Deleted Successfull",{
      toastId: 1215612,
      autoClose: 2000,
    })
  }

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:8800/api/users/video/${currentUser && currentUser._id}`,{
          headers:{
            accesstoken:localStorage.getItem('accesstoken')
          }
        });
      setVideos(res.data);
    };
    fetchVideos();
  }, [videos,deleteVideo]);

  return <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video} type={"delete"} deleteVideo={deleteVideo} />
    ))}
  </Container>;
};

export default Myvideos;