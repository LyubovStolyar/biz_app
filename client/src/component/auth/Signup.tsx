import { useEffect, useRef, useState } from "react";
import { handleRequest } from "../../services/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Joi, { bool } from "joi";
import './Signup.css';

export interface IErrors {
  [key: string]: string;
}
let submited: boolean = false;
let signUpError: any; 

function Signup() {
  
  const navigate = useNavigate();
  const formik = useFormik({

    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: ""
    },

    validate: (values) => {
      const errors: IErrors = {};

      const schema = Joi.object().keys({
        name: Joi.string().required().min(2).max(256),
        email: Joi.string().required().min(6).max(256),
        password: Joi.string().required().min(6).max(1024),
        confirm: Joi.equal(values.password)
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


onSubmit: (res) => {
    const data = handleRequest("users/signup", {name: res.name, email: res.email, password: res.password});

    if(res == null){
      return;
    }

      data.then((res) => {
        if(res.status != 200){
          signUpError = res;
          console.log(res);
        }else{
          navigate("/login");
        }
      })
  },
});

  return (
    <>
      <div className='signupForm'>
        <p className="signup">Sign Up</p>
        <input
        // ref={inputRef}
          type="text"
          placeholder="Name"
          name="name"
          className="signupInput"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
       {formik.touched.name && formik.errors.name ? (
        <div className="">{formik.errors.name}</div>
      ) : null}

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="signupInput"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />

          {formik.touched.email && formik.errors.email ? (
        <div className="">{formik.errors.email}</div>
      ) : null}
      
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="signupInput"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
        <div className="">{formik.errors.password}</div>
      ) : null}

        <input
          type="password"
          className="signupInput"
          name="confirm"
          placeholder="Confirm password"
          onChange={(e) => {
            submited = false;
            formik.handleChange(e);
          }}
          value={formik.values.confirm}
          onBlur={formik.handleBlur}   
        />
         {submited && formik.errors.confirm ? (
        <div className="">{"Confirmed password must be equal to password"}</div>
      ) : null}

        <button type="submit" className="signupButton" onClick={() => {
          submited = true;
          formik.handleSubmit();
          }} >
          Sign Up
        </button>
        {/* {signUpError && (<div className="">{signUpError}</div>)} */}
        <br />
        <NavLink to="/login" className='signupLink'>Login</NavLink>
      </div>
    </>
  );
}

export default Signup;
