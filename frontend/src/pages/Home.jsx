import React, { useEffect } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Home = ({ type }) => {
  const navigate = useNavigate();
  const [videos, setVideos] = React.useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/videos/${type}`);
      setVideos(res.data);
      if (res.statusCode === 401) {
        navigate("/signin");
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
