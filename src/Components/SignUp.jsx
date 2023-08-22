import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../api/user";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (
      !/[a-z]+/.test(formData.password) ||
      !/[A-Z]+/.test(formData.password) ||
      !/[^a-zA-Z0-9]+/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain one lowercase letter, one uppercase letter, and one special character";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    const payload = formData;
    if (isValid) {
      await user
        .signup(payload)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => setApiError(err.response.data.error));
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    user.getAllUsers().then((res) => console.log(res.data));
  }, []);

  return (
    <section style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt=""
                    className="img-fluid"
                    style={{ borderRadius: "1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <h3 className="mb-5 text-uppercase">
                        Student registration form
                      </h3>
                      {apiError && (
                        <div className="alert alert-danger text-center">
                          {apiError}
                        </div>
                      )}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label">First name</label>

                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="form-control"
                            />
                            {errors.firstName && (
                              <p className="text-danger">{errors.firstName}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label">Last name</label>
                          <div className="form-outline">
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="form-control"
                            />
                            {errors.lastName && (
                              <p className="text-danger">{errors.lastName}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email}</p>
                        )}
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label">Password:</label>
                        <div className="input-group mb-3">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? <EyeSlash /> : <Eye />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-danger">{errors.password}</p>
                        )}
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label">Confirm Password:</label>
                        <div className="input-group mb-3">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={toggleShowConfirmPassword}
                          >
                            {showConfirmPassword ? <EyeSlash /> : <Eye />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-danger">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                      <div className="pt-3  d-grid gap-2 col-8 mx-auto">
                        <button
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                        >
                          Sign Up
                        </button>
                      </div>
                      <div>
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                          Already Registered?{" "}
                          <a href="/login" className="link-danger">
                            SignIn
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

export default SignUp;
