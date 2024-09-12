import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import YouTubeIcon from '@mui/icons-material/YouTube';
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useCookies } from 'react-cookie';



const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 1.12rem 1.625rem;
  position: sticky;
    top: 0;

`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  padding: 0.17rem 0rem;
  font-size: 0.87rem;
  font-weight: 500;
  
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Hr = styled.hr`
  margin: 0.6rem 0rem;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  font-size: 0.87rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
  line-height: 1.5rem;
`;
const Button = styled.button`
  padding: 0.3rem 0.93rem;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 0.2rem;
  font-weight: 500;
  margin-top: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
const Title = styled.div`
  font-size: 0.87rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const [, , removeCookie] = useCookies(['token']);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function Logout() {
    // Clear the user's tokens from local storage.
    removeCookie('jwt');

    localStorage.removeItem("refreshToken");
    // Clear the user's Redux state.
    dispatch(logout());
    // Redirect the user to the login page.
    window.location.href = "/";
  }
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <YouTubeIcon sx={{ color: "red" }} />
            Youtube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <HomeIcon />
          <span>Home</span>
        </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
       {currentUser && <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>}
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF YOUTUBE</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>

        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        {currentUser && <Item onClick={Logout}>
          <HelpOutlineOutlinedIcon />
          LogOut
        </Item>}
      </Wrapper>
    </Container>
  );
};

export default Menu;
