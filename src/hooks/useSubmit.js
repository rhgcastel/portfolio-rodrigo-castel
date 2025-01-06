import { useState } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const submit = async (url, values) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setResponse({ type: "success", message: data.message });
      } else {
        setResponse({ type: "error", message: data.message });
      }
    } catch (error) {
      console.error(error);
      setResponse({ type: "error", message: "Failed to submit form." });
    }
  };
  
  

  return { isLoading, response, submit, setResponse };
}

export default useSubmit;
