"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TypingDots } from "../TypingDots";

const messages = [
  { sender: "driver", text: "Where do you need to go today?" },
  { sender: "client", text: "I’m heading to the airport. Do you offer fixed prices?" },
  {
    sender: "driver",
    text: "Yes, we offer competitive fixed fares and professional service. I can pick you up anytime.",
  },
  { sender: "client", text: "Perfect! I’ll book now." },
];

function PromoChat() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step < messages.length) {
      timer = setTimeout(() => setStep(step + 1), 2500);
    } else {
      timer = setTimeout(() => setStep(0), 10000);
    }

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="promo-chat-wrapper space-y-4 xl:min-h-[50vh] xl:overflow-hidden">
      <p className="text-text-muted text-md mb-12">
        Competitive rates, reliable service, and experienced driver – get to your destination safely and on
        time.
      </p>

      <div className="space-y-3">
        {messages.slice(0, step).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center py-2 px-6 gap-2 min-h-[70px] ${
              msg.sender === "client" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "driver" && (
              <Image
                src="/images/tomek-avatar.png"
                alt="Driver"
                width={45}
                height={45}
                className="rounded-full w-[45px] h-[45px]"
              />
            )}

            {/* 💬 Bubble */}
            <div
              className={`px-4 py-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                msg.sender === "driver"
                  ? "bg-grey-light text-text-dark rounded-bl-none"
                  : "bg-(--color-primary) text-white rounded-br-none"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "client" && (
              <Image
                src="/images/aga-avatar.jpg"
                alt="Client"
                width={45}
                height={45}
                className="rounded-full w-[45px] h-[45px]"
              />
            )}
          </motion.div>
        ))}

        {/* Typing dots */}
        {step < messages.length && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 py-6"
          >
            <Image
              src="/images/tomek-avatar.png"
              alt="Driver"
              width={45}
              height={45}
              className="rounded-full w-[45px] h-[45px]"
            />
            <div className="text-text-dark bg-grey-light px-4 py-3 rounded-2xl rounded-bl-none">
              <TypingDots />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default PromoChat;
