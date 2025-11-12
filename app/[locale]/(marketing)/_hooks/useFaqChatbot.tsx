import { useState, useEffect } from "react";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

function sanitizeInput(text: string) {
  return text.replace(/<[^>]*>?/gm, "").trim();
}

export function useFaqChatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>("faq-chat-messages", []);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  async function getAnswer() {
    const safeQuestion = sanitizeInput(question);
    if (!safeQuestion) return;

    const userMessage: ChatMessage = { role: "user", text: safeQuestion };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: safeQuestion }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        text: data.answer ?? "No answer available.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      const errorMessage: ChatMessage = {
        role: "assistant",
        text: "Sorry, I couldn't get an answer right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
  }

  return {
    question,
    setQuestion,
    messages: isClient ? messages : [],
    loading,
    getAnswer,
    clearChat,
  };
}
