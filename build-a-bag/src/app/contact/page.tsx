"use client";

import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import Nav from "../components/Nav/Nav";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check localStorage to set initial isSubmitted state
    const submitted = localStorage.getItem("isSubmitted");
    if (submitted === "true") {
      setIsSubmitted(true);
    }
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_09lsdek",
        "template_602hamf", // Replace with your template ID
        form.current!,
        "7Xniu4oQAodcmMsLw" // Replace with your user/public key
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
          setIsSubmitted(true);
          localStorage.setItem("isSubmitted", "true"); // Save state to localStorage
        },
        (error) => {
          console.log(error.text);
          alert("An error occurred, please try again.");
        }
      );
  };

  return (
    <div className="flex flex-col h-[90vph] bg-gray-200 relativ mt-[20vh]">
      {/* Background Overlay with Animation */}
      <div className="absolute inset-0 z-0 flex justify-end items-center animate-swing">
        <img
          className="w-[30vw] mr-20 opacity-15 object-cover"
          src="logo.svg"
          alt="Golf Bag Logo"
        />
      </div>

      {/* Contact Form and Bag Layout */}
      <main className="flex-1 flex flex-row items-center py-10 px-4 relative z-10">
        <div className="w-1/2 flex justify-center">
          <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full bg-gray-800 text-blue-200 font-bold py-3 rounded-lg hover:bg-gray-900 transition-all ${
                  isSubmitted ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isSubmitted}
              >
                {isSubmitted ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
