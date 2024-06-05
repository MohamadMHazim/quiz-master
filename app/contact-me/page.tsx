'use client';
import React, { useState } from "react";
import { FiMail, FiUser, FiMessageSquare, FiUsers } from "react-icons/fi";
import schema from "./schema";
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";

interface Contacts {
  email: string;
  name: string;
  message: string;
}

const ContactMe: React.FC = () => {
  const [formData, setFormData] = useState<Contacts>({
    email: "",
    name: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = schema.safeParse(formData);
    if (!validation.success) {
      console.error(validation.error.errors);
      return;
    }
    const templateParams= {
      from_name: formData.email,
      to_name: formData.name,
      message: formData.message
    }
    emailjs
  .send('service_rx01jx9', 'template_u6c5rjk', templateParams, {
    publicKey: "FhQZj1fs55FQS7cbE"
  })
  .then(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Email Sent 👍!',
        text: 'Your email has been successfully sent.',
      });
    },
    (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Email Failed 😐!',
        text: 'Your email was not sent !.',
      });
      console.log(err);
    },
  );
    console.log("Form data is valid:", formData);
  };

  return (
    <section className="flex justify-center bg-gradient-to-r from-yellow-200 to-yellow-400 animate-gradient min-h-screen">
      <div className="flex flex-col items-center py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 flex">
          <FiUsers className="mr-5" /> Contact me
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-800 sm:text-xl">
          If you want to contact me or give me any feedback, don't hesitate to
          send a message. I value your feedback.
        </p>
        <form onSubmit={handleSendEmail} className="space-y-8 w-full max-w-md">
          <div className="flex flex-col items-center w-full">
            <label
              htmlFor="email"
              className="mb-2 text-lg font-medium text-gray-800 flex items-center"
            >
              <FiMail className="mr-2 text-2xl" /> Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full px-4 py-2.5"
              placeholder="name@example.com"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <label
              htmlFor="name"
              className="mb-2 text-lg font-medium text-gray-800 flex items-center"
            >
              <FiUser className="mr-2 text-2xl" /> Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full px-4 py-2.5"
              placeholder="Your name"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <label
              htmlFor="message"
              className="mb-2 text-lg font-medium text-gray-800 flex items-center"
            >
              <FiMessageSquare className="mr-2 text-2xl" /> Message
            </label>
            <textarea
              id="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Leave a comment..."
              required
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gray-800 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
