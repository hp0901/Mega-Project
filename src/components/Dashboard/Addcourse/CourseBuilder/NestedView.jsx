import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiDownArrow } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../common/ConformationModel'
import { deleteSection, deleteSubSection } from '../../../../services/Operations/courseDetailsAPI'
import { setCourse } from '../../../../slices/courseSlice'

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector(state => state.course)
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id }, token);
    if (result) dispatch(setCourse(result));
    setConfirmationModal(null);
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
  // Pass the data object as the first argument and the token as the second
  const result = await deleteSubSection({ subSectionId, sectionId }, token); 
  
  if (result) {
    // Dispatch the updated course data
    dispatch(setCourse(result));
  }
  setConfirmationModal(null);
}

  return (
    <div className='rounded-lg bg-richblack-700 p-6 px-8'>
      {course?.courseContent?.map((section) => (
        <details key={section._id} open>
          <summary className='flex items-center justify-between gap-x-3 border-b-2'>
            <div className='flex items-center gap-x-3'>
              <RxDropdownMenu />
              <p>{section.sectionName}</p>
            </div>
            <div className='flex items-center gap-x-3'>
              <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                <MdEdit />
              </button>
              <button onClick={() => setConfirmationModal({
                text1: "Delete this Section",
                text2: "All the lectures in this section will be deleted",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => handleDeleteSection(section._id),
                btn2Handler: () => setConfirmationModal(null),
              })}>
                <RiDeleteBin6Line />
              </button>
              <BiDownArrow className="text-xl text-richblack-300" />
            </div>
          </summary>

          <div>
            {section?.subSection?.map((lecture) => (
              <div key={lecture?._id} className='flex items-center justify-between gap-x-3 border-b-2'>
                {/* Add a cursor-pointer and onClick handler */}
                <div
                    className='flex items-center gap-x-3 cursor-pointer'
                    onClick={() => setViewSubSection({ ...lecture, sectionId: section._id })}
                >
                    <RxDropdownMenu />
                    <p>{lecture.title}</p>
                </div>
                <div className='flex items-center gap-x-3'>
                  <button onClick={() => setEditSubSection({ ...lecture, sectionId: section._id })}>
                    <MdEdit />
                  </button>
                  <button onClick={() => setConfirmationModal({
                    text1: "Delete this Lecture",
                    text2: "Selected lecture will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSubSection(lecture._id, section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })}>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => setAddSubSection(section._id)} className='mt-4 flex items-center gap-x-2 text-yellow-50'>
              <AiOutlinePlus />
              <p>Add Lecture</p>
            </button>
          </div>
        </details>
      ))}

      {addSubSection && <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />}
      {viewSubSection && <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />}
      {editSubSection && <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default NestedView
