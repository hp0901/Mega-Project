import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from '../../services/apiconnector'
import { contactusEndpoint } from '../../services/apis'
import toast from 'react-hot-toast'

const ContactUsForm = () => {


    const [loading,setLoading] = useState(false)
    const {
        register,
        handleSubmit,reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

        const submitContactForm = async(data) => {
        console.log(data)
        try{
            setLoading(true)
        const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
        )
        toast.success("Query sent successfully")
        setLoading(false);
        }
        catch(error){
            console.log("Error:" , error.message);
            toast.error("Could not send the query. Please try again later.")
            setLoading(false);
        }
    }

    useEffect( () => {
       if(isSubmitSuccessful){
        reset({
            email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
        })
       }
    } ,[reset,isSubmitSuccessful])
  return (
  <form onSubmit={handleSubmit(submitContactForm)}>
    <div
      className="
        rounded-xl p-7 lg:p-14 flex flex-col gap-14
        text-richblack-300
      "
    >
      <div className="flex flex-col lg:flex-row gap-5">
        {/* firstName */}
        <div
          className="
            flex flex-col border-2 border-blue-400 rounded-md p-3
            transition-shadow duration-300
            hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]
            flex-1
          "
        >
          <label
            htmlFor="firstname"
            className="mb-1 px-2 py-1 rounded text-white font-semibold"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="text-black bg-transparent focus:outline-none"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && <span>Please enter Your name</span>}
        </div>

        {/* lastName */}
        <div
          className="
            flex flex-col border-2 border-blue-400 rounded-md p-3
            transition-shadow duration-300
            hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]
            flex-1
          "
        >
          <label
            htmlFor="lastname"
            className="mb-1 px-2 py-1 rounded text-white font-semibold"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="text-black bg-transparent focus:outline-none"
            placeholder="Enter Last name"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* email */}
      <div
        className="
          flex flex-col border-2 border-blue-400 rounded-md p-3
          transition-shadow duration-300
          hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]
        "
      >
        <label
          htmlFor="email"
          className="mb-1 px-2 py-1 rounded text-white font-semibold"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="text-white bg-transparent focus:outline-none"
          placeholder="Enter email Address"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Please enter your email address</span>}
      </div>

      {/* phoneNo */}
      <div
        className="
          flex flex-col border-2 border-blue-400 rounded-md p-3
          transition-shadow duration-300
          hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]
        "
      >
        <label
          htmlFor="phonenumber"
          className="mb-1 px-2 py-1 rounded text-white font-semibold"
        >
          Phone Number
        </label>

        <div className="flex flex-col sm:flex-row gap-1">
          {/* dropdown */}
          <select
            name="dropdown"
            id="dropdown"
            className="w-full sm:w-[80px] rounded-md bg-yellow-400 text-white focus:outline-none"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((element, index) => {
              return (
                <option key={index} value={element.code}>
                  {element.code} -{element.country}
                </option>
              );
            })}
          </select>

          <input
            type="number"
            name="phonenumber"
            id="phonenumber"
            placeholder="12345 67890"
            className="text-black bg-transparent focus:outline-none w-full sm:w-[calc(100%-90px)]"
            {...register("phoneNo", {
              required: { value: true, message: "Please enter Phone Number" },
              maxLength: { value: 10, message: "Invalid Phone Number" },
              minLength: { value: 8, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
      </div>

      {/* message */}
      <div
        className="
          flex flex-col border-2 border-blue-400 rounded-md p-3
          transition-shadow duration-300
          hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]
        "
      >
        <label
          htmlFor="message"
          className="mb-1 px-2 py-1 rounded text-white font-semibold"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          className="text-white bg-transparent focus:outline-none"
          rows="7"
          placeholder="Enter Your message here"
          {...register("message", { required: true })}
        />
        {errors.message && <span>Please enter your message.</span>}
      </div>

      <button
        type="submit"
        className="rounded-md bg-blue-400 text-center px-6 text-[16px] font-bold text-white hover:bg-blue-500 transition-colors"
      >
        Send Message
      </button>
    </div>
  </form>
);

    }  
    export default ContactUsForm
    