import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import menu from "./assets/icon-menu.svg";
import placeHolder from "./assets/user-placeholder.png";
import shoppingcart from "./assets/icon-cart.svg";
import previous from "./assets/icon-previous.svg";
import next from "./assets/icon-next.svg";
import minus from "./assets/icon-minus.svg";
import plus from "./assets/icon-plus.svg";
import logo from "./assets/logo.svg";
import cart from "./assets/icon-cart.svg";
import deleteLogo from "./assets/icon-delete.svg";
import star from "./assets/icon-star.svg";
import yellowStar from "./assets/yellowStar.svg";
import { product, assetsBaseUrl, loggedInUser } from "./data";
import { Reviews } from "./components/Reviews";
import { AddReviews } from "./components/AddReviews";
import "./App.css";

function App() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sneakerAmount, setSneakerAmount] = useState(0);
  const [savedSneakerAmount, setSavedSneakerAmount] = useState(null);
  const [basket, setBasket] = useState(false);
  const [addedReview, setAddedReview] = useState(true);
  const [addYourReview, setAddYourReview] = useState(false);
  const [inGeneralReviews, setInGeneralReviews] = useState(true);
  const [reviewsList, setReviewsList] = useState([product.reviews]);

  const profilePicture = assetsBaseUrl + "/" + loggedInUser.profileImage;
  const originalImages = `${assetsBaseUrl}/${product.images.originals[photoIndex]}`;
  const thumbnailImages = `${assetsBaseUrl}/${product.images.thumbnails[3]}`;
  const cartThumbnailImage = `${assetsBaseUrl}/${product.images.thumbnails[3]}`;
  const handlePrevIcon = () => {
    if (photoIndex === 0) {
      setPhotoIndex(3);
    } else {
      setPhotoIndex(photoIndex - 1);
    }
  };
  console.log(thumbnailImages);
  const handleNextIcon = () => {
    if (photoIndex === 3) {
      setPhotoIndex(0);
    } else {
      setPhotoIndex(photoIndex + 1);
    }
  };
  const handleMiniPhotoClick = () => {};
  const removeSneakerAmount = () => {
    if (sneakerAmount === 0) {
      null;
    } else {
      setSneakerAmount(sneakerAmount - 1);
    }
  };
  const addSneakerAmount = () => {
    setSneakerAmount(sneakerAmount + 1);
  };

  const openBasket = () => {
    setBasket(!basket);
  };

  const orderedBasket = () => {
    setSavedSneakerAmount(sneakerAmount + savedSneakerAmount);

    setSneakerAmount(0);
  };

  const deleteOrder = () => {
    setSavedSneakerAmount(0);
  };
  const reviews = product.reviews;

  const addReview = () => {
    setAddedReview(!addedReview);
    setAddYourReview(!addYourReview);
    // reviewsList[1] = !reviewsList[1];
  };
  const deleteReview = () => {
    setInGeneralReviews(!inGeneralReviews);
    reviewsList[1] = !reviewsList[1];
  };
  const chosenStar = () => {
    const chosenStars = [];

    for (let i = -1; i < reviewsList[1].starRating; i++) {
      chosenStars.push(
        <button key={i} className="reviewStarButton">
          <img src={yellowStar} alt="" className="reviewStar" />
        </button>
      );
    }

    for (let i = reviewsList[1].starRating; i < 4; i++) {
      chosenStars.push(
        <button key={i} className="reviewStarButton">
          <img src={star} alt="" className="reviewStar" />
        </button>
      );
    }

    return chosenStars;
  };

  const newReview = () => {
    if (reviewsList[1]) {
      return (
        <>
          <div className="customersReviews yourReview ">
            <div className="customerReview">
              <div className="inner-customerReview">
                <div className="editDiv">
                  <img
                    src={placeHolder}
                    alt="placehold"
                    className="reviewImg"
                  />
                  <div className="innerEditDiv">
                    <button onClick={() => deleteReview()}>Delete</button>
                    <button>Edit</button>
                  </div>
                </div>
                <h1>{loggedInUser.name}</h1>
                <div className="starsDiv">{chosenStar()}</div>
                <h1>{reviewsList[1].headLine}</h1>
                <p>{reviewsList[1].writtenReview}</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      null;
    }
  };

  const reviewsDiv = reviews.map((item, itemIndex) => {
    return (
      <>
        <Reviews
          key={itemIndex}
          name={item.user}
          placeHolder={placeHolder}
          star={star}
          yellowStar={yellowStar}
          starRating={item.starRating}
          headLine={item.headline}
          writtenReview={item.writtenReview}
          userName={loggedInUser.name}
          setAddedReview={setAddedReview}
          addedReview={addedReview}
          setAddYourReview={setAddYourReview}
          addYourReview={addYourReview}
          reviewsList={reviewsList}
          setReviewsList={setReviewsList}
          inGeneralReviews={inGeneralReviews}
          setInGeneralReviews={setInGeneralReviews}
          deleteReview={deleteReview}
        />
      </>
    );
  });
  const addReviews = () => {
    return (
      <AddReviews
        star={star}
        yellowStar={yellowStar}
        addReview={addReview}
        reviewsList={reviewsList}
        setReviewsList={setReviewsList}
        addedReview={addedReview}
        setAddedReview={setAddedReview}
        setAddYourReview={setAddYourReview}
      />
    );
  };
  const reviewsDivShown = () => {
    if (addedReview) {
      return reviewsDiv;
    } else if (addYourReview) {
      return addReviews();
    }
  };

  return (
    <>
      <div className="body">
        <div className="header">
          <div className="header-LeftSide">
            <img src={menu} alt="menuLogo" className="menuLogo" />
            <a href="#">
              <img src={logo} alt="logo" />
            </a>
            <div className="left-side-menu">
              <a href="#">Collections</a>
              <a href="#">Men</a>
              <a href="#">Women</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="header-RightSide">
            {savedSneakerAmount ? <span>{savedSneakerAmount}</span> : null}
            <button onClick={openBasket}>
              <img src={shoppingcart} alt="shoppingCart" />
            </button>
            <img src={profilePicture} alt="profilePicture" />
          </div>
        </div>
        <hr className="firstHr" />
        <div className="shoesCarousel">
          {basket ? (
            savedSneakerAmount ? (
              <div className="shopping-basket shopping-basket-ordered">
                <h2>Cart</h2>
                <hr />
                <div className="ordered-basket-info">
                  <img src={cartThumbnailImage} alt="basket-photo" />
                  <div className="basket-info-inner">
                    <p>Fall Limited Edition Sneakers</p>
                    <p>
                      $125.00 x {savedSneakerAmount}
                      <strong>{`$${125.0 * savedSneakerAmount}.00`}</strong>
                    </p>
                  </div>
                  <button onClick={deleteOrder}>
                    <img src={deleteLogo} alt="deleteLogo" />
                  </button>
                </div>

                <button className="checkoutBtn">Checkout</button>
              </div>
            ) : (
              <div className="shopping-basket shopping-basket-clear">
                <h2>Cart</h2>
                <hr />
                <p>Your cart is empty.</p>
              </div>
            )
          ) : null}
          <div className="sneakersPhotosDiv">
            <img
              className="sneakersPhoto"
              src={originalImages}
              alt={originalImages}
            />
            <div className="four-SneakersPhotos">
              <img src={thumbnailImages} alt="" />
            </div>
          </div>

          <button
            className="sneakersButtonLeft sneakerButton"
            onClick={handlePrevIcon}
          >
            <img
              className="sneakersIconLeft carouselIcon"
              src={previous}
              alt="123"
            />
          </button>
          <button
            className="sneakersButtonRight sneakerButton"
            onClick={handleNextIcon}
          >
            <img
              className="sneakersIconRight carouselIcon"
              src={next}
              alt="123"
            />
          </button>
          <div className="sneakers-infoMainDiv">
            <div className="sneakers-info">
              <p>SNEAKER COMPANY</p>
              <h2>Fall Limited Edition Sneakers</h2>
              <div className="infoStarsDiv">
                <div className="infoStarsButtonDiv">
                  <button className="reviewStarButton">
                    <img src={yellowStar} alt="" className="reviewStar" />
                  </button>
                  <button className="reviewStarButton">
                    <img src={yellowStar} alt="" className="reviewStar" />
                  </button>
                  <button className="reviewStarButton">
                    <img src={yellowStar} alt="" className="reviewStar" />
                  </button>
                  <button className="reviewStarButton">
                    <img src={yellowStar} alt="" className="reviewStar" />
                  </button>
                  <button className="reviewStarButton">
                    <img src={star} alt="" className="reviewStar" />
                  </button>
                </div>
                <p>4.2 out of 5</p>
              </div>
              <p className="sneakers-info-p">
                These low-profile sneakers are your perfect casual wear
                companion. Featuring a durable rubber outer sole, they’ll
                withstand everything the weather can offer.
              </p>
            </div>
            <div className="price-div">
              <div className="price-div-span">
                <span>$125.00</span>
                <span>50%</span>
              </div>

              <p>$250.00</p>
            </div>
            <div className="amountAndAdd">
              <div className="amount-div">
                <button onClick={removeSneakerAmount}>
                  <img src={minus} alt="minus" />
                </button>
                <span>{sneakerAmount}</span>
                <button onClick={addSneakerAmount}>
                  <img src={plus} alt="plus" />
                </button>
              </div>
              <button
                className="addToCart"
                onClick={sneakerAmount ? orderedBasket : null}
              >
                <img src={cart} alt="cart" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {addedReview && !reviewsList[1] ? (
          <div className="customer-button">
            <p>Customer reviews</p>
            <button onClick={() => addReview()}></button>
          </div>
        ) : null}
        {reviewsList[1] && newReview()}
        {reviewsDivShown()}
      </div>
    </>
  );
}

export default App;
