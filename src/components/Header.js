import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: rodrigohgcastel@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/rhgcastel",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/rodrigo-castel-94a51634/",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const prevScrollY = useRef(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > prevScrollY.current) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    prevScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.transform =
        scrollDirection === "down" ? "translateY(-200px)" : "translateY(0)";
    }
  }, [scrollDirection]);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform="translateY(0)"
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex="99"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={{ base: 6, md: 16 }}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={8}>
              {socials.map((social, index) => (
                <Link
                  _hover={{ color: "#767676", cursor: "pointer" }}
                  href={social.url}
                  id={social.id}
                  key={index}
                  target="_blank"
                >
                  <FontAwesomeIcon
                    _hover={{ color: "#767676", cursor: "pointer" }}
                    icon={social.icon}
                    size="2x"
                  />
                </Link>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <Link
                _hover={{ color: "#767676", cursor: "pointer" }}
                href="#contactme-section"
                onClick={handleClick("contact-me")}
              >
                Contact me
              </Link>
                            <Link
                _hover={{ color: "#767676", cursor: "pointer" }}
                href="#projects-section"
                onClick={handleClick("projects-section")}
              >
                Projects
              </Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
