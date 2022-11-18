import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {AiOutlineSearch} from 'react-icons/ai'
import {RiShoppingBag3Line} from 'react-icons/ri'
import {MdAccountBox} from 'react-icons/md'


// 
const COLORS = {
  primaryDark: "#115b4c",
  primaryLight: "#D4E6F1",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 6rem;
  right: 4rem;
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  cursor: pointer;
  z-index: 1000;
  text-align: center;


  @media (max-width: 685px) {
    right: .6rem;
    top: 0rem;
    background-color: white;
    box-shadow: none;
    height: 5rem;
    width: 5rem;
    box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  }

`;

const NavBackground = styled.div`
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  background-color: #2E4053;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  right: 4px;
  width: 2rem;
  height: 3px;
  display: inline-block;
  margin-top: 2.45rem;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 2.5rem;
    height: 3px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;

  @media (max-width: 618px) {
    top: 35%;
    left: 45%;
  }

  @media (max-width: 420px) {
    top: 40%;
    left: 43%;
  }

  @media (max-width: 380px) {
    top: 44%;
    left: 40%;
  }
`;
const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 3rem;
  font-weight: 300;
  text-decoration: none;
  color: white;
  padding: 1rem 2rem;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }

  @media (max-width: 618px) {
    font-size: 2.5rem;
  }

  @media (max-width: 420px) {
    font-size: 2rem;
  }

  @media (max-width: 380px) {
    font-size: 1.7rem;
  }
`;

// 

const Header = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>

      <MenuLabel htmlFor="navi-toggle" onClick={handleClick} className='menulabel'>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>

          <li>
            <ItemLink onClick={handleClick} to="/">
              Home
            </ItemLink>
          </li>

          <li>
            <ItemLink onClick={handleClick} to="/products">
              Products
            </ItemLink>
          </li>

          <li>
            <ItemLink onClick={handleClick} to="/portfolio">
              Contact
            </ItemLink>
          </li>

          <li>
            <ItemLink onClick={handleClick} to="/blog">
              About
            </ItemLink>
          </li>

          
            <li>

              <ItemLink onClick={handleClick} to="/search">
                <AiOutlineSearch/>
              </ItemLink>

              <ItemLink onClick={handleClick} to="/cart">
                <RiShoppingBag3Line/>
              </ItemLink>

              <ItemLink onClick={handleClick} to="/account">
                <MdAccountBox/>
              </ItemLink>

            </li>

        </List>
      </Navigation>
    </>
  );

}

export default Header