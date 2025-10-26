import React from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../data/homepage-explore'
import { useState } from 'react'
import CourseCard from './CourseCard'

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);


  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }

  return (
    // Add relative positioning for the absolute child
    <div className="relative">
        <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text='Power of code' />
        </div>

        <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
        Learn to build anything you can imagine
        </p>

        {/* --- Responsive Tab Bar (Wraps on Mobile) --- */}
        <div className='mt-5 flex flex-row flex-wrap justify-center items-center gap-3'>
            {
                tabsName.map( (element, index) => {
                    return (
                        <div 
                        className={`text-[16px] rounded-full px-5 py-2 md:px-7 md:py-2 cursor-pointer transition-all duration-200 font-medium
                        ${currentTab === element 
                            ? "bg-richblack-900 text-richblack-5"
                            : "bg-richblack-800 text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5" }`}
                        key={index}
                        onClick = {() => setMyCards(element)}
                        >
                            {element} 
                        </div>
                    )
                })
            }
        </div>

        {/* --- Original Card Layout (Restored) --- */}
        
        {/* Spacer for desktop layout */}
        <div className="hidden lg:block lg:h-[200px]"></div>

        {/* Absolute container for cards on desktop */}
        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
            {
                courses.map ((element, index) => {
                    return (
                        <CourseCard
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore