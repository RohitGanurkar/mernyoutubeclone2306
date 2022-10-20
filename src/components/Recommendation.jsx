import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from "../components/Card";

const Container = styled.div`
    flex:2
`
function Recommendation({tags}) {
    const [videos, setVideos] = useState([])

    useEffect(()=>{
      const fetchVideos = async ()=>{
        const res = await axios.get(`http://localhost:8800/api/videos/tags?tags=${tags}`,{
          headers:{
            accesstoken:localStorage.getItem('accesstoken')
          }
        });
        setVideos(res.data);
      }
      fetchVideos();
    },[tags])
  return (
    <Container>
        {videos.map(video=>{
            return <Card type="sm" key={video._id} video={video}/>
        })}
    </Container>
  )
}

export default Recommendation