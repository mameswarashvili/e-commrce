import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./AddReviews.css";
export const AddReviews = (props) => {
  const [chosenStarsLength] = useState(5);
  const [starIndex, setStarIndex] = useState(-1);
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
      <img key={i} src={props.star} alt="Regular Star" className="reviewStar" />
    );
  }

  const handleStarClick = (index) => {
    setStarIndex(index);
  };

  const customStars = chosenStars.map((item, itemIndex) => (
    <button
      key={itemIndex}
      className="addReviewStarButton"
      onClick={() => handleStarClick(itemIndex)}
    >
      {item}
    </button>
  ));

  console.log(starIndex);

  const initialValues = {
    starRating: 0,
    headLine: "",
    writtenReview: "",
  };
  return (
    <div className="addReviewMainBox">
      <h1>Add a review</h1>
      <p>Overall Rating</p>
      {customStars}
      <Formik initialValues={initialValues}>
        <Form>
          <div>
            <label htmlFor="headLine">Headline</label>
            <Field name="headLine" type="text" className="formikHeadline" />
            <ErrorMessage name="headLine" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
