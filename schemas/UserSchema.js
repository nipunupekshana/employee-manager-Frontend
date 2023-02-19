import * as Yup from "yup";

const regex =
  /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/; // Sri Lanka phone number regex
const UserSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should only contain alphabets")
    .min(6, "First name should be at least 6 characters")
    .max(10, "First name should not exceed 10 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name should only contain alphabets")
    .min(6, "Last name should be at least 6 characters")
    .max(10, "Last name should not exceed 10 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string()
    .matches(regex, "Invalid phone number")
    .required("Phone number is required"),
  gender: Yup.string()
    .oneOf(["m", "f"], "Invalid gender")
    .required("Gender is required"),
});

export default UserSchema;
