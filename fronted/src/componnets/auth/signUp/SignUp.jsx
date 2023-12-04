import { Box, Button  } from "@mui/material";
import TextFields from "../../../componnets/common/fields/TextFields";
import PasswordFields from "../../../componnets/common/fields/PasswordFields";
import { useForm } from "react-hook-form";
import CheckBoxFields from "../../../componnets/common/fields/CheckBoxFields";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pawdRagExp } from "../../common/fields/UtilsFields";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFlexStyles } from "../../common/style/CommonStyles";
import { ROUTES } from "../../../utils/routes";

// Schema for form validation using Yup
const schema = yup.object({
  userName: yup.string().required("User Name is required"),
  email: yup.string().required("Email is required").email(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      pawdRagExp,
      "Must Contain 8 Characters, Maximum 30 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
  privacy: yup.bool().oneOf([true], "Field must be checked"),
});

const SignUp = ({ setUserSignUp }) => {
  // useForm hook to manage form state and handle form submission
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      privacy: false,
      validateOnly: "check",
    },
    resolver: yupResolver(schema),
  });

  const { signUp, signUpSuccessful } = useAuth();
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (data) => {
    clearErrors();
    try {
      const result = await signUp(data);

      if (result?.message?.includes("Email already registered")) {
        setError("email", {
          type: "manual",
          message: result.message,
        });
      }
      //The user connect first time in google acconet
      else if (
        result?.message.includes(
          "Password set successfully, connected by Google"
        )
      ) {
        setUserSignUp(true)
      } else navigate(ROUTES.VAREFECATION_USER);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Box>
        <Box sx={getFlexStyles("column", { m: 2 })}>
          <Box
            noValidate
            component="form"
            sx={{ maxWidth: "400px", width: "100%", mt: "2rem" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Form fields for user input */}
            <TextFields
              name="userName"
              control={control}
              label="User Name"
              errors={errors}
            />
            <TextFields
              name="email"
              control={control}
              label="Email"
              errors={errors}
            />
            <PasswordFields
              name="password"
              control={control}
              label="Password"
              errors={errors}
            />
            <PasswordFields
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              errors={errors}
            />
            <Box ml={1}>
              <CheckBoxFields
                name="privacy"
                control={control}
                errors={errors}
                label={"I agree to our Terms, and Privacy Policy"}
              />
            </Box>
            {/* Sign Up and Cancel buttons */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, p: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
