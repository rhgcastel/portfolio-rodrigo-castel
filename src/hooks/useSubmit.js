import { useState } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useSubmit = () => {
  const [isLoading, setLoading] = useState(false); // ✅ Now this works
  const [response, setResponse] = useState(null);
  const FORMSPREE_ID = process.env.REACT_APP_FORMSPREE_ID; // ✅ Get ID from .env

  const submit = async (url, data) => {
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { // ✅ Correct API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send email.");
      }

      const result = { type: "success", message: "Email sent successfully!" };
      setResponse(result);
      return result;
    } catch (error) {
      const errorResult = { type: "error", message: "Something went wrong, please try again!" };
      setResponse(errorResult);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, submit, setResponse };
};

export default useSubmit;