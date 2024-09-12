import React, { useState } from "react";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess,registerStart,registerSuccess,registerFailure } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {auth,provider} from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  :hover {
    background-color: ${({ theme }) => theme.softHover};
    scale: 1.03;
  }
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Signin = () => {
  const [userNames, setUserNames] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [emails, setEmails] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        name:userNames,
        password:passwords,
      });
      dispatch(loginSuccess(res.data));
      navigate("/")
      console.log(res);
    } catch (err) {
      dispatch(registerStart());
    }
  };

  const handleReg=async(e)=>{
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/register", {
        name:userNames,
        email:emails,
        password:passwords,
      });
      dispatch(registerSuccess(res.data));
      navigate("/")
      console.log(res);
    } catch (err) {
      dispatch(registerFailure());
    }
  }

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        axios
          .post("/auth/googlelogin", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to VTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => {
            setUserNames(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPasswords(e.target.value);
          }}
        />
        <Button onClick={handleSignIn}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>

        <Input
          placeholder="username"
          onChange={(e) => {
            setUserNames(e.target.value);
          }}
        />
        <Input
          placeholder="email"
          onChange={(e) => {
            setEmails(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPasswords(e.target.value);
          }}
        />
        <Button onClick={handleReg}>Register</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Signin;
