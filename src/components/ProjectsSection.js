import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "Wed2B (Website Development)",
    description:
      "Worked on the e-commerce platform for wedding dresses, with responsibilities including enhancing the front-end UI and implementing server-side functionality.",
    getImageSrc: () => require("../images/wed2b.jpg"),
    url: "https://www.wed2b.com/",
  },
  {
    title: "Sofia Cruz (Website Development)",
    description:
      "Developed a dynamic, responsive website for a fashion brand, including integrating an API for GraphQL to handle data queries effectively. Built in Angular 12.",
    getImageSrc: () => require("../images/sofia-cruz.jpg"),
    url: "https://www.sofia-cruz.com/",
  },
  {
    title: "Acme Dashboard",
    description:
      "Developed a modern admin dashboard for Acme, including login page, financial summaries, recent invoices, customer insights, search tool, etc. Built in NextJS.",
    getImageSrc: () => require("../images/acme.jpg"),
    url: "https://nextjs-dashboard-rodrigo-castels-projects.vercel.app/",
  },
  {
    title: "ImagePro (Image Optimising Tool)",
    description:
      "Created an image resizing and optimisation tool for internal company use. Built with React and Flask, the tool prioritised data security, reduced costs, and featured adjustable quality settings with aspect ratio maintenance.",
    getImageSrc: () => require("../images/image-pro.jpg"),
    url: "https://image-pro-psi.vercel.app/",
  },
];

const ProjectsSection = () => {
  return (
    <FullScreenSection
      backgroundColor="#14532d"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        Featured Projects
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "repeat(1, minmax(0, 1fr))", md: "repeat(2, minmax(0, 1fr))" }}
        gridGap={8}
      >
        {projects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            description={project.description}
            imageSrc={project.getImageSrc()}
            url={project.url}
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
