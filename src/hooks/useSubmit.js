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
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setResponse({ type: "success", message: data.message });
    } catch (error) {
      console.error(error);
      setResponse({ type: "error", message: error.message || "Failed to submit form." });
    }
  };
  
  
  
  

  return { isLoading, response, submit, setResponse };
}

export default useSubmit;
