import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../common/IconBtn'
import { BuyCourse } from "../../services/Operations/studentFeaturesAPI"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'




const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("Cart total:", total);
    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);
            BuyCourse(token, courses, user, navigate, dispatch)
        //TODO: API integrate -> payment gateway tak leke jaegi
    }
return (
  <div className="w-full flex justify-end">
    <div className="bg-richblack-800 rounded-lg p-6 shadow-md w-max max-w-xl space-y-4">
      
      <div className="flex flex-col items-end text-end space-y-4">
        {/* Total Section */}
        <div className="text-lg font-semibold text-richblack-5">
          <p>
            Total : <span className="text-yellow-100">₹ {total}</span>
          </p>
        </div>

        {/* Buy Now Button */}
        <IconBtn 
          text="Buy Now"
          onclick={handleBuyCourse}
          customClasses="w-full sm:w-auto justify-center sm:justify-end bg-yellow-100 text-richblack-900 font-bold py-2 rounded-md hover:bg-yellow-200 transition duration-200"
        />
      </div>

    </div>
  </div>
);



}

export default RenderTotalAmount