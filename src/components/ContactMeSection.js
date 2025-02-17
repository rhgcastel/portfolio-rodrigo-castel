import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit, setResponse } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Name is required") 
        .min(2, "Name must be at least 2 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      type: Yup.string()
        .required("Type of enquiry is required"),
      comment: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!formik.isValid) {
        formik.setTouched({ firstName: true, email: true, type: true, comment: true });
        console.log("Validation failed:", formik.errors);
        return;
      }
      
      try {
        console.log("Submitting values:", values);
        const res = await submit('/', values);
        console.log("Response:", res);
        
        if (res.type === "success") {
          onOpen({ type: "success", message: res.message });
          resetForm();
        } else {
          onOpen({ type: "error", message: res.message });
        }
      } catch (error) {
        console.error("Submission error:", error);
        onOpen({ type: "error", message: "Something went wrong" });
      }
    },
  });
  
  

  useEffect(() => {
    if (!response) return;
  
    console.log("Response received:", response);
    if (response?.type === 'success') {
      onOpen({
        type: 'success',
        message: response.message || "Form submitted successfully!",
      });
      formik.resetForm();
    } else {
      onOpen({
        type: 'error',
        message: response?.message || "Something went wrong!",
      });
    }
    setResponse(null);
  }, [response, formik, onOpen, setResponse]);
  

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={{ base: 12, md: 16 }}
      spacing={{ base: 6, md: 8 }} 
    >
      <VStack 
        w={{ base: "90%", md: "768px", lg: "1024px" }}
        p={{ base: 6, md: 12, lg: 32 }}
        alignItems="flex-start"
      >
        <Heading as="h1" id="contactme-section" fontSize={{ base: "2xl", md: "3xl" }}>
          Contact me
        </Heading>

        <Box p={{ base: 4, md: 6 }} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.errors.firstName && formik.touched.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.type && formik.touched.type}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                >
                  <option value="">Select an option</option>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.comment && formik.touched.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={{ base: "150px", md: "250px" }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button 
                type="submit" 
                colorScheme="purple" 
                width={{ base: "100%", md: "50%" }} 
                isLoading={isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
