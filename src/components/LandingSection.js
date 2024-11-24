import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import avatarImage from "../images/me.jpg";

const greeting = "Hello, I am Pete!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >

    <Avatar size="2xl" src={avatarImage} />
    <Heading as="h3" size="2x" color="white">Hello, I am Rodrigo!</Heading>
    <VStack h="10"/>
    <Heading as="h1" size="3xl" color="white" lineHeight="1.4" textAlign="center">A web developer <br /> specialised in React</Heading>


  </FullScreenSection>
);

export default LandingSection;
