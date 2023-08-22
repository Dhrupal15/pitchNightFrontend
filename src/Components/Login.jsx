import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../api/user";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import logo from "../assets/images/logo.png";

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    formErrors: { email: "", password: "" },
  });
  const [apiError, setApiError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, formErrors } = formData;

  const navigate = useNavigate();

  const validateForm = () => {
    let emailError = "";
    let passwordError = "";
    if (!email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Email is invalid";
    }
    if (!password) {
      passwordError = "Password is required";
    } else if (password.length < 8) {
      passwordError = "Password must be at least 8 characters long";
    } else if (
      !/[a-z]+/.test(password) ||
      !/[A-Z]+/.test(password) ||
      !/[^a-zA-Z0-9]+/.test(password)
    ) {
      passwordError =
        "Password must contain one lowercase letter, one uppercase letter, and one special character";
    }
    setFormData({
      ...formData,
      formErrors: { email: emailError, password: passwordError },
    });
    if (
      Object.entries(formErrors.email) == "" &&
      Object.entries(formErrors.password) == "" &&
      Object.entries(formData.email) != ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email: formData.email, password: formData.password };
    if (validateForm()) {
      await user
        .login(payload)
        .then((res) => {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("loggedInUser", JSON.stringify(res.data));
          handleLogin();
          navigate("/");
        })
        .catch((err) => setApiError(err.response.data.error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = () => {
    validateForm();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid mx-auto"
                    style={{ borderRadius: "1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body px-4 px-lg-5 text-black">
                    <form
                      onSubmit={handleSubmit}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                    >
                      <div className="text-center mb-3 pb-1">
                        <img
                          src={logo}
                          className="img rounded-start"
                          alt="Logo"
                          height="100"
                        />
                      </div>
                      <h5
                        className="my-2 text-center text-uppercase"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>
                      {apiError && (
                        <div className="alert alert-danger text-center">
                          {apiError}
                        </div>
                      )}

                      <div className="form-outline mb-4">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {formErrors.email && (
                          <p className="text-danger">{formErrors.email}</p>
                        )}
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <div className="input-group mb-3">
                          <input
                            className="form-control form-control-lg"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />

                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? <EyeSlash /> : <Eye />}
                          </button>
                        </div>
                        {formErrors.password && (
                          <p className="text-danger">{formErrors.password}</p>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div></div>
                        <a href="/" className="text-body">
                          Forgot password?
                        </a>
                      </div>
                      <div className="pt-3  d-grid gap-2 col-8 mx-auto">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <div>
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                          Don't have an account?{" "}
                          <a href="/signup" className="link-danger">
                            Register
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
