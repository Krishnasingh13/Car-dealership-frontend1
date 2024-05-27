import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../components/formik/InputField";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { asyncDealerSignUp } from "../../store/actions/appActions";
import {
  notifyErrorPromise,
  notifyPendingPromise,
  notifySuccessPromise,
} from "../../utils/Toast";
import { useEffect } from "react";

const initialValues = {
  email: "",
  user_name: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  user_name: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const SignUpDealer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign-Up-Dealer";
  }, []);

  const handleSubmit = (val) => {
    const id = notifyPendingPromise("Registering dealer...");
    dispatch(asyncDealerSignUp(val)).then((res) => {
      if (res == 200) {
        navigate("/dealer");
        notifySuccessPromise(id, "Dealer registered  successfully!");
      } else {
        console.log(res);
        notifyErrorPromise(id, res.message);
      }
    });
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 pb-14 container">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Register Dealer
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to={`/login-dealer`}
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <div className="space-y-5 mt-5">
                  <InputField
                    title="Email"
                    name="email"
                    type="email"
                    placeHolder="Email address"
                    handleBlur={handleBlur("email")}
                    handleChange={handleChange("email")}
                    errors={errors?.email}
                    value={values?.email}
                    touched={touched?.email}
                  />
                  <InputField
                    title="Username"
                    name="user_name"
                    type="user_name"
                    placeHolder="Username"
                    handleBlur={handleBlur("user_name")}
                    handleChange={handleChange("user_name")}
                    errors={errors?.user_name}
                    value={values?.user_name}
                    touched={touched?.user_name}
                  />
                  <InputField
                    title="Password"
                    name="password"
                    type="password"
                    placeHolder="Password"
                    handleBlur={handleBlur("password")}
                    handleChange={handleChange("password")}
                    errors={errors?.password}
                    value={values?.password}
                    touched={touched?.password}
                  />
                  <div>
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Get started <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              )}
            </Formik>
            <div className="mt-3 space-y-3">
              {/* <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button> */}
              {/* <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </span>
                Sign up with Facebook
              </button> */}
            </div>
          </div>
        </div>
        <div className="h-full w-full overflow-hidden">
          <video
            src="/assets/video/sign-up.mp4"
            loop
            autoPlay
            muted
            className="h-full mt-[-5vh] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};

export default SignUpDealer;