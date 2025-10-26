import React from 'react'

import Logo1 from "../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skill",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description:"Code your way to a solution",
    },
];

const TimelineSection = () => {
  return (
    <div>
      {/* Main container: stacks on mobile, row on desktop */}
      <div className='flex flex-col lg:flex-row gap-14 lg:gap-20 items-center'>

        {/* --- Left Column (Timeline) --- */}
        {/* Takes full width on mobile, 45% on desktop */}
        <div className='w-full lg:w-[45%] flex flex-col gap-8'>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-row gap-6' key={index}>

                            {/* Logo circle */}
                            <div className='w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center shadow-md'>
                                <img src={element.Logo} alt='Logo' />
                            </div>

                            {/* Text content */}
                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>
                        </div>
                    )
                } )
            }
        </div>

        {/* --- Right Column (Image & Stats) --- */}
        <div className='relative w-full lg:w-[50%]'>
            
            <img  src={timelineImage}
            alt="timelineImage"
            className='shadow-lg shadow-blue-200 object-cover h-fit rounded-lg'
            />

            {/* Stats Box: stacks on mobile, row on tablet+ */}
            <div className='absolute bg-caribbeangreen-700 flex flex-col md:flex-row text-white uppercase 
                            py-5 md:py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]
                            w-[90%] md:w-auto
                            rounded-md shadow-lg'
            >
                {/* Stat 1 */}
                <div className='flex flex-row gap-5 items-center 
                                border-b md:border-b-0 md:border-r border-caribbeangreen-300 
                                px-6 py-2 md:px-7 justify-center'
                >
                    <p className='text-2xl md:text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>

                {/* Stat 2 */}
                <div className='flex flex-row gap-5 items-center 
                                px-6 py-2 md:px-7 justify-center'
                >
                    <p className='text-2xl md:text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                </div>

            </div>
        </div>

      </div>
    </div>
  )
}

export default TimelineSection