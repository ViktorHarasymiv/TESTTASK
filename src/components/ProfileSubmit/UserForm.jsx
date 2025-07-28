import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";

// CONTEXT

import { useUser } from "../../UserContext";
import FullTextContent from "../FullTextContent/FullTextContent";
import { POST_USER } from "../../scripts/userApi";

// VALIDATION SCHEMA

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must not exceed 60 characters")
    .required("Please enter your name"),

  email: Yup.string()
    .max(60, "Email must not exceed 60 characters")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/,
      "username@example.com"
    )
    .required("Please enter your email"),

  phone: Yup.string()
    .matches(
      /^\+380\d{9}$/,
      "The phone number must be in the format  +380XXXXXXXXX"
    )
    .required("Please enter your phone"),

  position: Yup.string().required("Please enter your position"),

  photo: Yup.mixed()
    .test(
      "fileRequired",
      "Please upload your photo",
      (value) => value instanceof File
    )
    .test(
      "fileFormat",
      "Unsupported file format. Allowed: JPEG, PNG",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    )
    .test(
      "fileSize",
      "File is too large. Max size is 5MB",
      (value) => value && value.size <= 5 * 1024 * 1024 // 5 MB
    )
    .test(
      "imageDimensions",
      "Мінімальна роздільна здатність: 70x70px",
      (value) =>
        new Promise((resolve) => {
          if (!value) return resolve(false);
          const reader = new FileReader();
          reader.readAsDataURL(value);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
              resolve(img.width >= 70 && img.height >= 70);
            };
          };
        })
    )
    .required("Please upload your photo"),
});

export default function UserForm() {
  // CONTEXT
  const { positions } = useUser();

  // FORM INITIAL VALUE

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position: positions[0]?.name || "",
    photo: null,
    acceptConfig: false,
  };

  // STATE
  const [isHover, setIshover] = useState(false);

  return (
    <div className="form container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("email", values.email);
          formData.append("phone", values.phone);
          formData.append("position", values.position);
          formData.append("photo", values.photo);

          try {
            formData.forEach((value, key) => {
              console.log(`${key}:`, value);
            });

            const result = await POST_USER(formData);
            console.log("Success:", result);
          } catch (error) {
            alert("Something went wrong 😥");
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="form__wrapper">
            {/* NAME */}
            <label htmlFor="name" className="custom__input_label _name">
              <Field
                type="name"
                name="name"
                onChange={handleChange}
                className="custom__input"
                placeholder={""}
                style={{
                  border:
                    errors.name && touched.name ? `2px solid var(--error)` : "",
                }}
              />
              <span
                className="_label-text"
                style={{
                  color:
                    errors.name && touched.name ? "var(--error)" : "inherit",
                }}
              >
                Your name
              </span>
              <ErrorMessage
                name="name"
                component="span"
                className="custom__input_error"
              />
            </label>

            {/* EMAIL */}
            <label htmlFor="email" className="custom__input_label _email">
              <Field
                type="email"
                name="email"
                onChange={handleChange}
                className="custom__input"
                placeholder={""}
                style={{
                  border:
                    errors.email && touched.email
                      ? `2px solid var(--error)`
                      : "",
                }}
              />
              <span
                className="_label-text"
                style={{
                  color:
                    errors.email && touched.email ? "var(--error)" : "inherit",
                }}
              >
                Email
              </span>
              <ErrorMessage
                name="email"
                component="span"
                className="custom__input_error"
              />
            </label>

            {/* PHONE */}
            <label htmlFor="phone" className="custom__input_label _phone">
              <Field
                type="tel"
                name="phone"
                onChange={handleChange}
                placeholder={""}
                className="custom__input"
                style={{
                  border:
                    errors.phone && touched.phone
                      ? `2px solid var(--error)`
                      : "",
                }}
              />
              <span
                className="_label-text"
                style={{
                  color:
                    errors.phone && touched.phone ? "var(--error)" : "inherit",
                }}
              >
                Phone
              </span>
              <ErrorMessage
                name="phone"
                component="span"
                className="custom__input_error"
              />
            </label>

            {/* RADIO BUTTON */}
            <div className="custom__input_radio--wrapper _radio">
              <span className="custom__input_radio--title">
                Select your position
              </span>
              {positions.map(({ id, name }) => {
                return (
                  <label key={id} className="custom__input_radio--label">
                    <Field
                      type="radio"
                      name="position"
                      value={name}
                      checked={values?.position === name}
                      onChange={handleChange}
                      className="radio__input"
                    />
                    <span className="radio__custom"></span>
                    {name}
                    <ErrorMessage
                      name="position"
                      component="span"
                      className="custom__input_error"
                    />
                  </label>
                );
              })}
            </div>

            {/* PHOTO */}
            <div className="custom__file">
              <Field name="photo">
                {({ form: { errors, touched, values, setFieldValue } }) => {
                  const hasError = !errors.photo && touched.photo;

                  return (
                    <React.Fragment>
                      <label
                        htmlFor="photo"
                        className="custom__file_label _file"
                      >
                        <input
                          type="file"
                          name="photo"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("photo", file);
                          }}
                          className="custom__input"
                        />
                      </label>

                      <div
                        className="custom__file_input"
                        style={{
                          border: hasError ? "2px solid var(--error)" : "",
                        }}
                      >
                        <button
                          type="button"
                          className="custom__file_upload"
                          style={{
                            border: hasError ? "none" : undefined,
                            borderRight: hasError
                              ? "2px solid var(--error)"
                              : undefined,
                          }}
                        >
                          Upload
                        </button>

                        <span
                          className="custom__file_upload_label"
                          onMouseEnter={() => setIshover(true)}
                          onMouseLeave={() => setIshover(false)}
                        >
                          {values.photo?.name || "Upload your photo"}
                        </span>
                        {/* FULL TEXT  */}
                        {isHover && values.photo?.name && (
                          <FullTextContent
                            name={values.photo?.name || "Upload your photo"}
                          />
                        )}
                      </div>
                      {hasError && (
                        <span className="custom__input_error">
                          {errors.photo}
                        </span>
                      )}
                    </React.Fragment>
                  );
                }}
              </Field>
            </div>

            {/* SUBMIT */}
            <Button
              type={"submit"}
              size={100}
              disabled={!isValid || !dirty || isSubmitting}
            >
              Sign up
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
