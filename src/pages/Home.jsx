import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { accesstoken } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(()=>{
    // console.log = console.warn = console.error = () => {};
    const fetchVideos = async ()=>{
      const res = await axios.get(`http://localhost:8800/api/videos/${type}`,{
        headers:{
          accesstoken:localStorage.getItem('accesstoken')
        }
      });
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