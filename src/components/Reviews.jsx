import React, { useState } from "react";

export const Reviews = (props) => {
  const [yourReview, setYourReview] = useState(true);
  const deleteReview = () => {
    setYourReview(!yourReview);
  };

  const costumersReview = () => {
    if (yourReview) {
      return (
        <div className="customerReview">
          <div className="inner-customerReview">
            <div className="editDiv">
              <img
                src={props.placeHolder}
                alt="placehold"
                className="reviewImg"
              />
              {editableDiv()}
            </div>
            <h1>{props.name}</h1>
            <div className="starsDiv">{chosenStar()}</div>
            <h1>{props.headLine}</h1>
            <p>{props.writtenReview}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
  const editableDiv = () => {
    if (props.name === props.userName) {
      return (
        <div className="innerEditDiv">
          <button onClick={() => deleteReview()}>Delete</button>
          <button>Edit</button>
        </div>
      );
    } else {
      return null;
    }
  };

  const chosenStar = () => {
    const chosenStars = [];

    for (let i = 0; i < props.starRating; i++) {
      chosenStars.push(
        <button key={i} className="reviewStarButton">
          <img src={props.yellowStar} alt="" className="reviewStar" />
        </button>
      );
    }

    for (let i = props.starRating; i < 5; i++) {
      chosenStars.push(
        <button key={i} className="reviewStarButton">
          <img src={props.star} alt="" className="reviewStar" />
        </button>
      );
    }

    return chosenStars;
  };

  return <div className={"customersReviews"}>{costumersReview()}</div>;
};
