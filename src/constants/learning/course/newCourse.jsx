import * as Yup from "yup";

export const courseValidationSchema = Yup.object({
  courseName: Yup.string().required("Course name is required"),
  courseDescription: Yup.string().required("Course description is required."),
  courseFile: Yup.string().optional().nullable(),
  excerpt: Yup.string(),
  authorId: Yup.string().required("Author ID is required"),
  maximumStudents: Yup.number()
    .required("Maximum number of students is required")
    .typeError("Must be a number"),
  difficultyLevelId: Yup.string(),
  isPublicCourse: Yup.boolean().default(false),
  allowQA: Yup.boolean().default(true),
  coursePrice: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Price cannot be negative"),
  whatWillILearn: Yup.string().required("This field is required"),
  targetedAudience: Yup.string().required("Targeted audience is required"),
  courseDuration: Yup.number()
    .required("Course duration is required")
    .typeError("Must be a number"),
  materialsIncluded: Yup.string(),
  requirementsInstructions: Yup.string(),
  courseIntroVideo: Yup.string().url("Enter a valid YouTube link"),
  // categoryids: Yup.array().of(Yup.string().required("Category ID is required")),
  coursetags: Yup.array()
    .min(1, "Each tag should have at least 1 character")
    .max(4, "You can add up to 10 tags only"),
  featuredImage: Yup.mixed().optional().nullable(),
});

export const courseInitialValues = {
  courseName: "",
  courseDescription: "",
  courseFile: null, // Assuming this is a file input
  excerpt: "",
  authorId: "",
  maximumStudents: 1, // Empty string for number field initially
  difficultyLevelId: 1,
  isPublicCourse: false, // default to false
  allowQA: true, // default to false
  coursePrice: "", // Empty string for number field initially
  whatWillILearn: "",
  targetedAudience: "",
  courseDuration: "", // Empty string for number field initially
  materialsIncluded: "",
  requirementsInstructions: "",
  courseIntroVideo: "",
  categoryids: "2", // Empty array for category IDs
  courseTags: [], // Empty array for tags
  featuredImage: null, // Assuming this is a file input
};
