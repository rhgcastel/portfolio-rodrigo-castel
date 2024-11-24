import { Heading, HStack, Image, Text, VStack, Box, Link } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc, url }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  
  return (
    <Box
    display="flex"
    flexDirection="column"
    borderRadius="10px"
    backgroundColor="white"
    transition="all 0.3s ease-in-out"
  >

    <Box
    width="auto"
    overflow="hidden"
    maxHeight="60%"
    >
          <Link href={url} isExternal>
          <Image objectFit="cover" 
      width="100%" 
height="100%"
      src={imageSrc} 
      _hover={{ 
        transition:"transform 0.3s ease-in-out", 
        transform: "scale(1.1)", 
        cursor: "pointer",
        overflow: "hidden" }}/>
          </Link>

    </Box>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      p={4}
      color="black"
      width="100%"
      zIndex="1"
    >
<Link href={url} isExternal>
  <Heading
    as="h2"
    size="md"
    color="black"
    _hover={{ color: "#767676", cursor: "pointer" }}
    transition="color 0.3s ease-in-out"
  >
    {title}
  </Heading>
</Link>



      <VStack h="3" />
      <Text>{description}</Text>
      <VStack h="3" />
      <HStack
        _hover={{ color: "#767676", cursor: "pointer" }}
        transition="color 0.3s ease-in-out"
      >
        <Link href={url} isExternal>
        <Text as="b">See More</Text>
        </Link>
        <FontAwesomeIcon icon={faArrowRight} size="1x" />
      </HStack>
    </Box>
  </Box>
  );
};

export default Card;
