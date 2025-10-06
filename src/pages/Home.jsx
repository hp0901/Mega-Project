import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HighlightText from '../components/HighlightText';
import CTAButton from '../components/CTAButton';
import video1 from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/CodeBlocks';
import ExploreMore from '../components/ExploreMore';
import TimelineSection from '../components/TimelineSection';
import LearningLanguageSection from '../components/LearningLanguageSection';
import InstructorSection from '../components/InstructorSection';
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/ReviewSlider'

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
      <Link to="/signup" className="mt-16 mx-auto w-fit">
        <div className="group p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95">
          <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>

      <div className="text-center text-4xl font-semibold mt-7">
        Empower Your future with
        <HighlightText text="Coding Skills" />
      </div>

      <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.
      </div>

      <div className="flex flex-col sm:flex-row gap-7 mt-8">
        <CTAButton active={true} linkto={"/signup"}>
          Learn More
        </CTAButton>

        <CTAButton active={false} linkto={"/login"}>
          Book a Demo
        </CTAButton>
      </div>

      <div className="mx-3 my-12 shadow-blue-200 w-full">
        <video
          className="w-full" // Make video responsive
          muted
          loop
          autoPlay
        >
          <source src={video1} type="video/mp4" />
        </video>
      </div>

      {/* Code Section 1 */}
      <div >
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock Your
              <HighlightText text="Coding Potential" />
              with our online coding courses
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={{
            active: true,
            linkto: "/signup",
            btnText: "Try it your self",
          }}
          ctabtn2={{
            active: false,
            linkto: "/login",
            btnText: "learn more",
          }}
          codeBlock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Harsh Patel</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<div>\n<h1>Welcome to my website</h1>\n<p>My name is Harsh Patel and I am a web developer.</p>\n</div>\n</body>\n</html>`}
          codeColor={"text-yellow-25"}
        />
      </div>
          

          <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeBlock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Harsh Patel</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<div>\n<h1>Welcome to my website</h1>\n<p>My name is Harsh Patel and I am a web developer.</p>\n</div>\n</body>\n</html>`}
                codeColor={"text-yellow-25"}
            />
            </div>
            <ExploreMore />
        </div>  



      {/* Section 2*/}
      <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white '>
                    <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex items-center gap-3' >
                       Explore Full Catalog
                       <FaArrowRight />
                       </div>
                    </CTAButton>
                    <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                    </CTAButton>
              </div>
            </div>
          </div>
          <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

            <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                <div className='text-4xl font-semibold w-[45%]'>
                Get the Skills you need for a
                <HighlightText text='Job that is in demand' />
                </div>
                <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                      </div>
                      <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                            </CTAButton>
                    </div>
                </div>
                <TimelineSection />
                <LearningLanguageSection />
                </div>
      </div>

      {/* Section 3 */}

      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

      <InstructorSection />
      <h2 className='text-center text-4xl font-semobold mt-10'>Review from other Learners</h2>
      </div>
          <ReviewSlider />
          {/* Review Slider here */}
          <Footer/>

      {/* Section 4 */}









      </div>
  );
};

export default Home;