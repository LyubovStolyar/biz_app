import { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Joi from "joi";
import { handleRequest } from "../../services/apiService";
import { TOKEN_KEY } from "../../services/auth";
import { useFormik } from "formik";
import './Login.css'


export interface IErrors {
  [key: string]: string;
}

// this page demonstrates the use of Formik and joi

function Login() {
  const navigate = useNavigate();
    const inputRef = useRef<null | HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

  const formik = useFormik({
    // assign default value to field
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors: IErrors = {};

      const schema = Joi.object().keys({
        email: Joi.string().required().min(6).max(256),
        password: Joi.string().required().min(6).max(1024),
      });

      const { error } = schema.validate(values);

      if (error) {
        error.details.forEach((item) => {
          if (item.context) {
            const key = item.context.key + "";
            errors[key] = item.message;
          }
        });
      }

      return errors;
    },

    onSubmit: (values) => {
      const res = handleRequest("users/login", values);

      res
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem(TOKEN_KEY, json.token);
          navigate("/home");
        });
    },
  });

  return (
    <>


    <form onSubmit={formik.handleSubmit} className='loginForm'>
      
      <p className="login">Login</p>
      <div>
        <input
          ref={inputRef}
          className="loginInput"
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
      </div>

      {formik.touched.email && formik.errors.email ? (
        <div className="">{formik.errors.email}</div>
      ) : null}

      <div>
        <input
          type="password"
          className="loginInput"
          placeholder="Password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
      </div>

      {formik.touched.password && formik.errors.password ? (
        <div className="">{formik.errors.password}</div>
      ) : null}

      <button type="submit" className="loginButton">
        Login
      </button>
      <br />
      {/* <button className="loginButton"> */}
      <Link to='/' className='signUp'>Sign up</Link>
      {/* </button> */}
    </form>
    


    </>
  );
}

export default Login;
