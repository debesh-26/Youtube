import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios  from "axios";


const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: none;
  padding: 0px 20px;
  outline: none;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${({ theme }) => theme.textSoft};
  }
`;
const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const comment = e.target[0].value;
    try {
      const res = await axios.post("/comments", {
        comment,
        videoId,
        userId: currentUser._id,
      });
      setComments([...comments, res.data]);
      e.target[0].value = "";
    } catch (err) {}
  };
  return (
    <Container>
      <form onSubmit={handleSubmitComment}>
      <NewComment>
      {currentUser?(<Avatar src={currentUser.img}/>):(<Avatar src="/img/images.jpg"/>)}
        <Input placeholder="Add a Comment....... " />
      </NewComment>
      </form>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
