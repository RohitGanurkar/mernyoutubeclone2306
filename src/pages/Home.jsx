import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding:25px
`;

const Home = ({type}) => {

  const [videos, setVideos] = useState([])

  useEffect(()=>{
    console.log = console.warn = console.error = () => {};
    const fetchVideos = async ()=>{
      const res = await axios.get(`https://mernyoutubeclone2306.herokuapp.com/api/videos/${type}`,{withCredentials:true});
      setVideos(res.data);
    }
    fetchVideos();
  },[type])

  return (
    <Container>
      {videos.map((video)=>{
        return <Card key={video._id} video={video}/>
      })}
    </Container>
  );
};

export default Home;