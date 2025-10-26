// Import necessary modules
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description } = req.body
      const video = req.files.video
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      console.log(video)
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log(uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
  
      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  
  exports.updateSubSection = async (req, res) => {
    try {
      const { subsectionId, title, description } = req.body
      const subSection = await SubSection.findById(subsectionId)
      console.log("Subsection id ", subsectionId)
      console.log("Title ", title)
      console.log("Description ", description)
      console.log("Subsection after findby id is ",subSection)
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        // data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  // This single function handles BOTH creating and editing a subsection
// exports.updateSubSection = async (req, res) => {
//   try {
//     // 1. Get all possible data from req.body
//     // sectionId = The ID of the parent section
//     // subSectionId = The ID of the subsection being edited (THIS IS THE KEY)
//     // title, description = new data
//     const { sectionId, subSectionId, title, description } = req.body
//     const video = req.files ? req.files.video : undefined

//     // 2. Check if we are UPDATING or CREATING
//     if (subSectionId) {
//       // --- UPDATE ---
//       // We have a subSectionId, so we are editing an existing subsection

//       // Find the subsection
//       const subSection = await SubSection.findById(subSectionId)

//       if (!subSection) {
//         return res.status(404).json({
//           success: false,
//           message: "SubSection not found",
//         })
//       }

//       // Update only the fields that were provided
//       if (title !== undefined) {
//         subSection.title = title
//       }

//       if (description !== undefined) {
//         subSection.description = description
//       }

//       // If a new video was uploaded, update it
//       if (video) {
//         const uploadDetails = await uploadImageToCloudinary(
//           video,
//           process.env.FOLDER_NAME
//         )
//         subSection.videoUrl = uploadDetails.secure_url
//         subSection.timeDuration = `${uploadDetails.duration}`
//       }

//       // Save the updated subsection
//       await subSection.save()

//       // --- FIX: Return the updated PARENT section ---
//       // Your frontend likely expects the updated course/section data to refresh the UI
//       // We need the parent sectionId for this, which your frontend should be sending.
//       if (!sectionId) {
//         return res.status(400).json({
//            success: false,
//            message: "Parent Section ID is required to update subsection" 
//         });
//       }
      
//       const updatedSection = await Section.findById(sectionId).populate(
//         "subSection"
//       )

//       return res.json({
//         success: true,
//         message: "SubSection updated successfully",
//         data: updatedSection, // Send back the updated parent section
//       })

//     } else {
//       // --- CREATE ---
//       // No subSectionId was provided, so we are creating a new one

//       // Check if all necessary fields are provided
//       if (!sectionId || !title || !description || !video) {
//         return res
//           .status(400) // Use 400 for Bad Request, 404 is for Not Found
//           .json({ success: false, message: "All Fields are Required" })
//       }

//       // Upload the video file to Cloudinary
//       const uploadDetails = await uploadImageToCloudinary(
//         video,
//         process.env.FOLDER_NAME
//       )

//       // Create a new sub-section
//       const SubSectionDetails = await SubSection.create({
//         title: title,
//         timeDuration: `${uploadDetails.duration}`,
//         description: description,
//         videoUrl: uploadDetails.secure_url,
//       })

//       // Update the corresponding section with the newly created sub-section
//       const updatedSection = await Section.findByIdAndUpdate(
//         { _id: sectionId },
//         { $push: { subSection: SubSectionDetails._id } },
//         { new: true }
//       ).populate("subSection")

//       // Return the updated section in the response
//       return res.status(200).json({ success: true, data: updatedSection })
//     }
//   } catch (error) {
//     // Handle any errors
//     console.error("Error in updateSubSection:", error)
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }