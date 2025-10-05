import React from 'react';
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeBlock,
  codeColor,
}) => {
  return (
    <div
      className={`flex ${position} my-20 justify-between gap-10 flex-col lg:flex-row`}
    >
      <div className="w-full lg:w-[60%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>

        <div className="flex gap-7 mt-7 flex-col sm:flex-row">
          <CTAButton
            active={ctabtn1.active}
            linkto={ctabtn1.linkto}
            className="flex items-center gap-2"
          >
            {ctabtn1.btnText}
            <FaArrowRight />
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full lg:w-[500px] h-fit flex flex-row text-[15px] py-4">
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-3xl ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeBlock, 3000, '']}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: 'pre-line',
              display: 'block',
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;