import React, { useState } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Button from "../../ui/Button/Button";

// CONTEXT

import { useUser } from "../../../UserContext";

// COMPONENT

import FullTextContent from "../../ui/HoverTextPreview/HoverTextPreview";

// API

import { POST_USER } from "../../../scripts/Api";
import Modal from "../../ui/Modal/Modal";

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
    .matches(/^\+380\d{9}$/, "+38 (XXX) XXX - XX - XX")
    .required("Please enter your phone"),

  position_id: Yup.number().required("Please enter your position"),

  photo: Yup.mixed()
    .test(
      "fileRequired",
      "Please upload your photo",
      (value) => value instanceof File
    )
    .test(
      "fileFormat",
      "Unsupported file format. Allowed: JPEG, JPG",
      (value) => value && ["image/jpeg"].includes(value.type)
    )
    .test(
      "fileSize",
      "File is too large. Max size is 5MB",
      (value) => value && value.size <= 5 * 1024 * 1024 // 5 MB
    )
    .test(
      "imageDimensions",
      "The minimum image resolution required is 70x70 pixels.",
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

export default function CreateForm() {
  // STATE
  const [handleTouched, setHandleTouched] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // CONTEXT

  const { positions, setIsSend, setPage, showModal, setShowModal } = useUser();

  // FORM INITIAL VALUE

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position_id: 1,
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
          formData.append("position_id", values.position_id);
          formData.append("photo", values.photo);

          try {
            const response = await POST_USER(formData);
            setIsSend(true);
            setPage(1);
            resetForm();
          } catch (error) {
            console.log(error.message);
            setStatusMessage(error.message);
            setShowModal(true);
          } finally {
            setSubmitting(false);
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
        }) => (
          <form onSubmit={handleSubmit} className="form__wrapper">
            {/* NAME */}
            <label className="custom__input_label _name">
              <Field
                type="text"
                name="name"
                onChange={handleChange}
                className="custom__input"
                placeholder={"Your name"}
                autoComplete="name"
                style={{
                  border:
                    errors.name && touched.name ? `2px solid var(--error)` : "",
                }}
              />
              <span
                className="_label-text"
                style={{
                  color:
                    errors.name && touched.name
                      ? "var(--error)"
                      : "var(--label-color)",
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
            <label className="custom__input_label _email">
              <Field
                type="email"
                name="email"
                onChange={handleChange}
                className="custom__input"
                autoComplete="email"
                placeholder={"Email"}
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
                    errors.email && touched.email
                      ? "var(--error)"
                      : "var(--label-color)",
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
            <label className="custom__input_label _phone">
              <Field
                type="tel"
                name="phone"
                onChange={handleChange}
                placeholder={"Phone"}
                className="custom__input"
                autoComplete="phone"
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
                    errors.phone && touched.phone
                      ? "var(--error)"
                      : "var(--label-color)",
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
                      name="position_id"
                      value={Number(id)}
                      onChange={handleChange}
                      checked={Number(values.position_id) === Number(id)}
                      className="radio__input"
                    />
                    <span className="radio__custom"></span>
                    {name}
                  </label>
                );
              })}
            </div>

            {/* PHOTO */}
            <div className="custom__file">
              <Field name="photo">
                {({ form: { errors, values, setFieldValue } }) => {
                  const handleErorr = errors.photo && handleTouched;

                  return (
                    <React.Fragment>
                      {/* INVISIBLE FUNCTIONAL SYSTEM */}
                      <label
                        htmlFor="photo"
                        className="custom__file_label _file"
                      >
                        <input
                          id="photo"
                          type="file"
                          name="photo"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("photo", file);
                          }}
                          onFocus={() => {
                            if (errors.photo) {
                              setHandleTouched(true);
                            } else return;
                          }}
                          onBlur={() => {
                            if (errors.photo || (errors.photo && !values.photo))
                              setHandleTouched(true);
                            else setHandleTouched(false);
                          }}
                          className="custom__input"
                        />
                      </label>
                      {/* VISIBLE UI SYSTEM */}
                      <div
                        className="custom__file_input"
                        style={{
                          border: handleErorr ? "2px solid var(--error)" : "",
                        }}
                      >
                        <button
                          type="button"
                          className="custom__file_upload"
                          style={{
                            border: handleErorr ? "none" : undefined,
                            borderRight: handleErorr
                              ? "2px solid var(--error)"
                              : "var(--label-color)",
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
                      {/* ERROR */}
                      {handleErorr && (
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
      {/* MODAL */}
      {showModal && (
        <Modal>
          <h3 className="error_message">{statusMessage}</h3>
          <Button
            type={"button"}
            handleClick={() => setShowModal(false)}
            size={100}
          >
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
}
