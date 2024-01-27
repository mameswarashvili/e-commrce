import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, boolean, object, number } from "Yup";
import "./AddReviews.css";
export const AddReviews = (props) => {
  const [chosenStarsLength, setChosenStarLength] = useState(5);
  const [starIndex, setStarIndex] = useState(-1);

  const initialValues = {
    starRating: null,
    headLine: "",
    writtenReview: "",
  };

  const validationSchema = object({
    headLine: string().trim().min(4).required("Please enter your headline"),
    writtenReview: string()
      .trim()
      .min(15)
      .required("Please enter your written review"),
    starRating: number().required("Please select a star rating"),
  });

  return (
    <div className="addReviewMainBox">
      <h1>Add a review</h1>
      <p>Overall Rating</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          props.setReviewsList([, values, ...props.reviewsList]);
          props.setAddedReview(true);
          props.setAddYourReview(false);
        }}
      >
        {(formik) => {
          const chosenStars = [];
          for (let i = -1; i < starIndex; i++) {
            chosenStars.push(
              <img
                key={i}
                src={props.yellowStar}
                alt="Yellow Star"
                className="reviewStar"
              />
            );
          }

          for (let i = chosenStars.length; i < chosenStarsLength; i++) {
            chosenStars.push(
              <img
                key={i}
                src={props.star}
                alt="Regular Star"
                className="reviewStar"
              />
            );
          }

          const customStars = chosenStars.map((item, itemIndex) => (
            <button
              type="button"
              key={itemIndex}
              className="addReviewStarButton"
              onClick={() => {
                formik.setFieldValue("starRating", itemIndex);
                setStarIndex(itemIndex);
              }}
              name="starRating"
            >
              {item}
            </button>
          ));
          // console.log(formik.values);
          return (
            <Form>
              <div className="customStarDiv">{customStars} </div>
              <ErrorMessage
                name="starRating"
                className="errorMessage"
                component="span"
              />

              <div>
                <label htmlFor="headLine">Headline</label>
                <Field
                  name="headLine"
                  type="text"
                  className="formikHeadline"
                  placeholder="What’s most important to know?"
                />
                <ErrorMessage
                  name="headLine"
                  className="errorMessage"
                  component="span"
                />
              </div>
              <div>
                <label htmlFor="writtenReview">Written review</label>
                <Field
                  name="writtenReview"
                  as="textarea"
                  className="formikwrittenReview"
                  placeholder="What did you like or dislike? What did you use this product for?"
                />
                <ErrorMessage
                  name="writtenReview"
                  className="errorMessage"
                  component="span"
                />
              </div>
              <div className="footerDiv">
                <button type="button" onClick={props.addReview}>
                  Cancel
                </button>
                <button type="submit">Add</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
