import { Breadcrumb, Button, Result } from "antd";
import "../assets/css/login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const Login = () => {
  const [isActive, setActive] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isShowPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleActive = () => {
    setActive(!isActive);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.Name) {
      setLoading(true);
      document.body.classList.add("overflow-hidden");
      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 800);
    } else if (data.login_email) {
      setLogin(true);
      document.body.classList.add("overflow-hidden");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!isShowPassword);
  };
  return (
    <section className="login-page">
      <div className="container">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Login",
            },
          ]}
        />
      </div>
      <div className={`login ${isActive ? "active" : ""}`}>
        {isActive ? (
          <div className="form-container sign-up">
            <form>
              <h1>Create Account</h1>
              <div className="social-icons">
                <Link
                  to={"https://www.google.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="icon"
                >
                  <i className="fa-brands fa-google-plus-g" />
                </Link>
                <Link
                  to={"https://www.facebook.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="icon"
                >
                  <i className="fa-brands fa-facebook-f" />
                </Link>
                <Link
                  to={"https://www.github.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="icon"
                >
                  <i className="fa-brands fa-github" />
                </Link>
                <Link
                  to={"https://www.linkedin.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="icon"
                >
                  <i className="fa-brands fa-linkedin-in" />
                </Link>
              </div>
              <span>or use your email for registeration</span>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Name"
                  {...register("Name", {
                    required: true,
                    maxLength: 100,
                  })}
                  aria-invalid={errors.Name ? "true" : "false"}
                />
                {errors.Name?.type === "required" && (
                  <p style={{ margin: 0, color: "red" }}>
                    Name can not be left blank.
                  </p>
                )}
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("Email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  aria-invalid={errors.Email ? "true" : "false"}
                />
                {errors.Email?.type === "required" && (
                  <p style={{ margin: 0, color: "red" }}>
                    Email can not be left blank.
                  </p>
                )}
                {errors.Email?.type === "pattern" && (
                  <p style={{ margin: 0, color: "red" }}>
                    The email is not in the correct format.
                  </p>
                )}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Password"
                  {...register("Password", {
                    required: true,
                    minLength: 5,
                  })}
                  aria-invalid={errors.Password ? "true" : "false"}
                />
                {errors.Password?.type === "required" && (
                  <p style={{ margin: 0, color: "red" }}>
                    Password can not be left blank.
                  </p>
                )}
                {errors.Password?.type === "minLength" && (
                  <p style={{ margin: 0, color: "red" }}>
                    Minimum password is 5 characters.
                  </p>
                )}
              </div>
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                Sign Up
              </button>
            </form>
          </div>
        ) : null}
        {isActive ? null : (
          <div className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              <div className="social-icons">
                <Link
                  to={"https://www.google.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="icon"
                >
                  <i className="fa-brands fa-google-plus-g" />
                </Link>
                <Link
                  to={"https://www.facebook.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="icon"
                >
                  <i className="fa-brands fa-facebook-f" />
                </Link>
                <Link
                  to={"https://www.github.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="icon"
                >
                  <i className="fa-brands fa-github" />
                </Link>
                <Link
                  to={"https://www.linkedin.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="icon"
                >
                  <i className="fa-brands fa-linkedin-in" />
                </Link>
              </div>
              <span>or use your email password</span>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("login_email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  aria-invalid={errors.login_email ? "true" : "false"}
                />
                {errors.login_email?.type === "required" && (
                  <p style={{ margin: 0, color: "red" }}>
                    Email can not be left blank.
                  </p>
                )}
                {errors.login_email?.type === "pattern" && (
                  <p style={{ margin: 0, color: "red" }}>
                    The email is not in the correct format.
                  </p>
                )}
              </div>
              <div className="input-group" style={{ position: "relative" }}>
                <input
                  type={isShowPassword ? "password" : "text"}
                  placeholder="Password"
                  {...register("login_password", {
                    required: true,
                    minLength: 5,
                  })}
                  aria-invalid={errors.login_password ? "true" : "false"}
                />
                {errors.login_password?.type === "required" && (
                  <p style={{ margin: 0, color: "red" }}>
                    Password can not be left blank.
                  </p>
                )}
                {errors.login_password?.type === "minLength" && (
                  <p style={{ margin: 0, color: "red" }}>
                    Minimum password is 5 characters.
                  </p>
                )}
                <div className="eye" onClick={toggleShowPassword}>
                  {isShowPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </div>
              </div>
              <Link to={"/login"}>Forget Your Password?</Link>
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                Sign In
              </button>
            </form>
          </div>
        )}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={toggleActive}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hidden" id="register" onClick={toggleActive}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      {isDone ? (
        <div
          className="overlay"
          style={{ backgroundImage: `url("/products/banner_h4_1.jpg")` }}
        >
          <Result
            status="success"
            title="Successfully Registered!"
            subTitle={`Account created successfully.`}
            extra={[
              <Button type="primary" key="home">
                <Link to="/">Go to homepage</Link>
              </Button>,
            ]}
          />
        </div>
      ) : null}
      {isLogin ? (
        <div
          className="overlay"
          style={{
            backgroundImage: `url("/products/slide_h4_2.jpg")`,
          }}
        >
          <Result status="success" title="Logged in successfully!" />
        </div>
      ) : null}
      {loading ? (
        <div className="img-quickview-container">
          <span className="loader-1"></span>
        </div>
      ) : null}
    </section>
  );
};

export default Login;
