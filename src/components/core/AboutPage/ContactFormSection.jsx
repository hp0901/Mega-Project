import React from 'react'
import ContactUsForm from '../../ContactForm/ContactUsForm'

const ContactForm = () => {
  return (
  <div
    className="
      border-2 border-transparent rounded-xl p-7 lg:p-14 flex gap-3 flex-col
      text-richblack-300
      transition-colors duration-300
      hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/40
      bg-richblack-800
    "
  >
    <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
      Got a Idea? We&apos;ve got the skills. Let&apos;s team up
    </h1>
    <p>
      Tell us more about yourself and what you&apos;re got in mind.
    </p>

    <div className="mt-7">
      <ContactUsForm />
    </div>
  </div>
);

};

export default ContactForm;
