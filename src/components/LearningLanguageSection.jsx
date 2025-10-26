import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import know_your_progress from '../assets/Images/Know_your_progress.png'
import compare_with_others from '../assets/Images/Compare_with_others.png' 
import plan_your_lesson from '../assets/Images/Plan_your_lessons.png'

const LearningLanguageSection = () => {
  return (
     <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>

          <div className='text-4xl font-semibold text-center'>
              Your Swiss Knife for
              <HighlightText text={" Learning any Language"} />
          </div>

          {/* --- Responsive Text --- */}
          <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[90%] md:w-[70%]'>
              Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </div>

          {/* --- Responsive Image Container --- */}
          {/* Stacks vertically on mobile (flex-col) */}
          {/* Becomes a row on large screens (lg:flex-row) */}
          <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-5'>
              <img 
                  src = {know_your_progress}
                  alt = "KnowYourProgressImage"
                  // Negative margin only applies on large screens
                  className='object-contain lg:-mr-32'
              />
              <img 
                  src = {compare_with_others}
                  alt = "CompareWithOthersImage"
                  // z-10 ensures this image is on top
                  className='object-contain z-10' 
              />
              <img 
                  src = {plan_your_lesson}
                  alt = "PlanYourLessonImage"
                  // Negative margin only applies on large screens
                  className='object-contain lg:-ml-36'
              />
          </div>

          {/* Added margin-top for better mobile spacing */}
          <div className='w-fit mt-8'>
              <CTAButton active={true} linkto={"/signup"}>
                  <div>
                      Learn more
                  </div>
              </CTAButton>
          </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection