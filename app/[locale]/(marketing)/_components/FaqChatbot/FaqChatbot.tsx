"use client";

import { Button } from "@/shared/components/Button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useFaqChatbot } from "../../_hooks/useFaqChatbot";

export default function FaqChatbot() {
  const t = useTranslations("assistant");
  const { question, setQuestion, messages, loading, getAnswer, clearChat } = useFaqChatbot();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previousMessageCount = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip scroll on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousMessageCount.current = messages.length;
      return;
    }

    // Only scroll if messages were actually added
    if (messages.length > previousMessageCount.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }

    previousMessageCount.current = messages.length;
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    getAnswer();
  };

  return (
    <section id="faq-chatbot" className="flex flex-col items-center py-20 text-center bg-white rounded-4xl">
      <div className="container-narrow px-4">
        <h3 className="mb-10 leading-tight text-text-dark">{t("title")}</h3>
        <p className="mb-16 font-medium text-text-dark">{t("subtitle")}</p>

        <h4 className="text-gray-700 font-semibold mb-6 text-md">{t("examples_title")}</h4>
        <ul className="text-left text-gray-700 text-sm mb-8 bg-gray-50 p-6 rounded-2xl">
          {t.raw("examples").map((ex: string, idx: number) => (
            <li
              key={idx}
              className={`p-3 leading-relaxed ${
                idx !== t.raw("examples").length - 1 ? "mb-3 border-b border-gray-200" : "mb-0"
              }`}
            >
              • &ldquo;{ex}&rdquo;
            </li>
          ))}
        </ul>

        {/* Chat messages */}
        {messages.length > 0 && (
          <div
            ref={messagesContainerRef}
            className="flex flex-col gap-3 mb-6 max-h-[400px] overflow-y-auto pr-2"
          >
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-2xl max-w-[85%] wrap-break-word flex items-start gap-2 shadow-md ${
                  msg.role === "user"
                    ? "bg-(--color-dark-navy) text-white self-end"
                    : "bg-grey-light text-text-dark self-start"
                }`}
              >
                <span className="text-lg shrink-0">{msg.role === "user" ? "👤" : "🤖"}</span>
                <div className="prose prose-sm text-left min-w-0">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-12 justify-center w-full">
          <label htmlFor="question" className="sr-only">
            {t("ask_placeholder")}
          </label>
          <input
            ref={inputRef}
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t("ask_placeholder")}
            className="border border-gray-300 rounded-2xl px-4 py-6 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={t("ask_placeholder")}
            autoComplete="off"
            disabled={loading}
          />
          <div className="flex flex-col lg:flex-row justify-center align-center gap-8 w-full">
            <Button type="submit" intent="secondary" size="lg" disabled={loading || !question.trim()}>
              {loading ? t("thinking") : t("ask_button")}
            </Button>
            {messages.length > 0 && (
              <Button type="button" intent="ghost" size="lg" onClick={clearChat} disabled={loading}>
                {t("clear_button")}
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
