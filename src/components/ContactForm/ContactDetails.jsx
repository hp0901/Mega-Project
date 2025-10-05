import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
 return (
  <div className="flex flex-col gap-6 rounded-2xl bg-richblack-800 p-6 shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-richblack-500/30">
    {contactDetails.map((ele, i) => {
      let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
      return (
        <div
          className="flex flex-col gap-1 rounded-xl border-2 border-transparent bg-richblack-700/50 p-4 text-sm text-richblack-200 backdrop-blur-sm
                     transition-transform transition-colors duration-300
                     hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/40"
          key={i}
        >
          <div className="flex flex-row items-center gap-3">
            <Icon size={25} className="text-yellow-50" />
            <h1 className="text-xl font-bold text-richblack-5">
              {ele?.heading}
            </h1>
          </div>
          <p className="font-medium text-richblack-300">{ele?.description}</p>
          <p className="font-bold text-richblack-50">{ele?.details}</p>
        </div>
      );
    })}
  </div>
);

}

export default ContactDetails