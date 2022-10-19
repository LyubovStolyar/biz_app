import { useEffect, useRef, useState } from "react";
import { handleRequest } from "../../services/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Joi from "joi";

export interface IErrors {
  [key: string]: string;
}

function Signup() {
  const navigate = useNavigate();


  const formik = useFormik({

    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors: IErrors = {};

      const schema = Joi.object().keys({
        name: Joi.string().required().min(2).max(256),
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


onSubmit: (res) => {
    const data = handleRequest("users/signup", res);
      data  
      // .then((res: any) => {
      //   console.log(res);
      //   navigate("/login");
      // })

   .then((res) => {
        console.log(res);
        navigate("/login");
      })
  },
});


  return (
    <>
      <div>
        <p>Sign Up</p>
        <input
        // ref={inputRef}
          type="text"
          placeholder="Name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
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
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        <input
          type="text"
          placeholder="Confirm password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
         
        />
         {formik.touched.password && formik.errors.password ? (
        <div className="">{formik.errors.password}</div>
      ) : null}

        <button type="submit" className="">
          Sign Up
        </button>
        <NavLink to="/login">Login</NavLink>
      </div>
    </>
  );
}

export default Signup;
