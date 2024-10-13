import * as Yup from "yup";

export const courseValidationSchema = Yup.object({
  courseName: Yup.string().required("Course name is required"),
  courseDescription: Yup.string(),
  courseFile: Yup.string(),
  meetings: Yup.array().of(
    Yup.object({
      meetingTitle: Yup.string().required("Meeting title is required"),
      meetingDescription: Yup.string(),
      meetingFile: Yup.mixed(), // optional file
      meetingURL: Yup.string()
        .url("Enter a valid URL")
        .required("Meeting URL is required"),
      meetingDateTime: Yup.date()
        .required("Meeting date and time are required")
        .typeError(
          "Please enter a valid date and time (e.g., 16/10/2024 12:00 AM)"
        ),
    })
  ),
  videoPdfUrls: Yup.array().of(
    Yup.object({
      pdfTitle: Yup.string().required("PDF title is required"),
      pdfDescription: Yup.string(),
      pdfFile: Yup.mixed().required("PDF file is required"),
      viewPdfFile: Yup.string(),
      downloadable: Yup.boolean().default(true),
    })
  ),
  excerpt: Yup.string(),
  authorId: Yup.string().required("Author ID is required"),
  maximumStudents: Yup.number()
    .required("Maximum number of students is required")
    .typeError("Must be a number"),
  difficultyLevelId: Yup.string().required("Difficulty level ID is required"),
  isPublicCourse: Yup.boolean().default(false),
  allowQA: Yup.boolean().default(false),
  coursePrice: Yup.number()
    .required("Course price is required")
    .typeError("Must be a number"),
  whatWillILearn: Yup.string().required("This field is required"),
  targetedAudience: Yup.string().required("Targeted audience is required"),
  courseDuration: Yup.number()
    .required("Course duration is required")
    .typeError("Must be a number"),
  materialsIncluded: Yup.string(),
  requirementsInstructions: Yup.string(),
  courseIntroVideo: Yup.string().url("Enter a valid YouTube link"),
  courseCategoryIds: Yup.array().of(
    Yup.string().required("Category ID is required")
  ),
  coursetags: Yup.array()
    .min(1, "Each tag should have at least 1 character")
    .max(4, "You can add up to 10 tags only")
    .required("it is required"),
  featuredImage: Yup.mixed(), // optional file input
});

export const courseInitialValues = {
  courseName: "",
  courseDescription: "",
  courseFile: null, // Assuming this is a file input
  meetings: [
    {
      meetingTitle: "",
      meetingDescription: "",
      meetingFile: null, // Assuming this is a file input
      meetingURL: "",
      meetingDateTime: "", // Can be an empty string or null for date input
    },
  ],
  videoPdfUrls: [
    {
      pdfTitle: "",
      pdfDescription: "",
      pdfFile: null, // Assuming this is a file input
      viewPdfFile: "",
      downloadable: true, // default to true
    },
  ],
  excerpt: "",
  authorId: "",
  maximumStudents: "", // Empty string for number field initially
  difficultyLevelId: "",
  isPublicCourse: false, // default to false
  allowQA: false, // default to false
  coursePrice: "", // Empty string for number field initially
  whatWillILearn: "",
  targetedAudience: "",
  courseDuration: "", // Empty string for number field initially
  materialsIncluded: "",
  requirementsInstructions: "",
  courseIntroVideo: "",
  courseCategoryIds: [], // Empty array for category IDs
  courseTags: [], // Empty array for tags
  featuredImage: null, // Assuming this is a file input
};
