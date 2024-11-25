import React from "react";
import Nav from "../components/Nav/Nav";

export default function Contact() {
  return (
    <div className="flex flex-col h-[91vh] bg-[#e7e7e7] relative">
      {/* Background Overlay with Animation */}
      <div className="absolute inset-0 z-0 flex justify-end items-center animate-swing mr-20">
        <img
          className="w-[30vw] object-cover"
          src="logo.svg"
          alt="Golf Bag Logo"
        />
      </div>
      {/* Contact Form and Bag Layout */}
      <main className="flex-1 flex flex-row items-center py-10 px-4 relative z-10">
        <div className="w-1/2 flex justify-center">
          <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
            <form className="flex flex-col gap-6">
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
                  rows={5}
                  className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-blue-200 font-bold py-3 rounded-lg hover:bg-gray-900 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
