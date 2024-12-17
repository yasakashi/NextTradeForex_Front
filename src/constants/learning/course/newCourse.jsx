import * as Yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  ,
  "image/web",
];

const FILE_SIZE = 500 * 1024; // 1000KB

export const courseValidationSchema = Yup.object({
  courseName: Yup.string().required("Course name is required"),
  courseDescription: Yup.string().required("Course description is required."),
  // courseFile: Yup.string().optional().nullable(),
  courseFile: Yup.mixed()
    .required("File is required.")
    .test("fileSize", "File must be less than 500 KB", (value) => {
      return typeof value === "string" || !value
        ? true
        : value.size < FILE_SIZE;
    })
    .test(
      "fileFormat",
      "File must be in JPG, PNG, JPEG, or WEBP format",
      (value) => {
        return typeof value === "string" || !value
          ? true
          : SUPPORTED_FORMATS.includes(value?.type);
      }
    ),
  excerpt: Yup.string(),
  // authorId: Yup.string().required("Author name is required."),
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
  targetedAudience: Yup.string(),
  courseDuration: Yup.number()
    .required("Course duration is required")
    .typeError("Must be a number"),
  materialsIncluded: Yup.string(),
  requirementsInstructions: Yup.string(),
  courseIntroVideo: Yup.string().url("Enter a valid YouTube link"),
  // categoryids: Yup.array().of(Yup.string().required("Category ID is required")),
  tags: Yup.array()
    .min(1, "Each tag should have at least 1 character")
    .max(4, "You can add up to 10 tags only"),
  featuredImage: Yup.mixed()
    .optional()
    .nullable()
    .test("fileSize", "File must be less than 500 KB", (value) => {
      return typeof value === "string" || !value
        ? true
        : value.size < FILE_SIZE;
    })
    .test(
      "fileFormat",
      "File must be in JPG, PNG, JPEG, or WEBP format",
      (value) => {
        return typeof value === "string" || !value
          ? true
          : SUPPORTED_FORMATS.includes(value?.type);
      }
    ),
});

export const courseInitialValues = {
  courseName: "",
  courseDescription: "",
  courseFile: null, // Assuming this is a file input
  excerpt: "",
  authorId: 1,
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
  categoryids: [], // Empty array for category IDs
  tags: [], // Empty array for tags
  featuredImage: null, // Assuming this is a file input
};
