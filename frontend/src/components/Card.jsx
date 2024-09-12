
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";


const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.backgroundcolor};
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  cursor: pointer;
  border-radius: 5px 5px 0 0;
  flex: 1;
  object-fit: cover;
  object-position: center;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "8px"};
  gap: 12px;
  flex: 1;
`;
const Channelimage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div``;

const Title = styled.h1`
  font-size: ${(props) => (props.type === "sm" ? "12px" : "16px")};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.div`
  font-size: ${(props) => (props.type === "sm" ? "13px" : "16px")};
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: ${(props) => (props.type === "sm" ? "10px" : "16px")};
  color: ${({ theme }) => theme.textSoft};
`;
const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  const handleView = async () => {
    await axios.put(`${process.env.REACT_APP_API_URL}/videos/view/${video._id}`);
  };
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type} onClick={handleView}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <Channelimage type={type} src={channel.img} />
          <Texts type={type}>
            <Title type={type}>{video.title}</Title>
            <ChannelName type={type}>{channel.name}</ChannelName>
            <Info type={type}>
              {video.views} views •{format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
