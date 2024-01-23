import { useState } from "react";
export const Reviews = (props) => {
  const [chosenStarsLength, setChosenStarLength] = useState(5);
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
      null;
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
      null;
    }
  };

  const chosenStar = () => {
    const chosenStars = [];

    if (chosenStars.length === props.starRating) {
      return null;
    }

    for (let i = 0; i < props.starRating; i++) {
      chosenStars.push(
        <button key={i} className="reviewStarButton">
          <img src={props.yellowStar} alt="" className="reviewStar" />
        </button>
      );
    }

    for (let i = 0; i < chosenStarsLength - props.starRating; i++) {
      chosenStars.push(
        <button key={i + props.starRating} className="reviewStarButton">
          <img src={props.star} alt="" className="reviewStar" />
        </button>
      );
    }

    return chosenStars;
  };
  return (
    <div
      className={
        props.name === props.userName
          ? "customersReviews yourReview"
          : "customersReviews"
      }
    >
      {costumersReview()}
    </div>
  );
};
