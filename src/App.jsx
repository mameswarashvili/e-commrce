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
  // const [addedSneaker, setAddedSneaker] = useState(0);

  const profilePicture = assetsBaseUrl + "/" + loggedInUser.profileImage;
  // console.log(sneakerAmount);
  const originalImages = `${assetsBaseUrl}/${product.images.originals[photoIndex]}`;
  const thumbnailImages = `${assetsBaseUrl}/${product.images.thumbnails[3]}`;
  const handlePrevIcon = () => {
    if (photoIndex === 0) {
      setPhotoIndex(3);
    } else {
      setPhotoIndex(photoIndex - 1);
    }
  };
  const handleNextIcon = () => {
    if (photoIndex === 3) {
      setPhotoIndex(0);
    } else {
      setPhotoIndex(photoIndex + 1);
    }
  };
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
        />
      </>
    );
  });
  const addReviews = () => {
    return <AddReviews star={star} yellowStar={yellowStar} />;
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
            <img src={menu} alt="menuLogo" />
            <a href="#">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className="header-RightSide">
            {savedSneakerAmount ? <span>{savedSneakerAmount}</span> : null}
            <button onClick={openBasket}>
              <img src={shoppingcart} alt="shoppingCart" />
            </button>
            <img src={profilePicture} alt="profilePicture" />
          </div>
        </div>
        <div className="shoesCarousel">
          {basket ? (
            savedSneakerAmount ? (
              <div className="shopping-basket shopping-basket-ordered">
                <h2>Cart</h2>
                <hr />
                <div className="ordered-basket-info">
                  <img src={thumbnailImages} alt="basket-photo" />
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
          <img
            className="sneakersPhoto"
            src={originalImages}
            alt={originalImages}
          />

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
          <div className="sneakers-info">
            <p>SNEAKER COMPANY</p>
            <h2>Fall Limited Edition Sneakers</h2>
            <p>
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they’ll withstand
              everything the weather can offer.
            </p>
          </div>
          <div className="price-div">
            <span>$125.00</span>
            <span>50%</span>
            <span>$250.00</span>
          </div>
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
        {addedReview ? (
          <div className="customer-button">
            <p>Customer reviews</p>
            <button onClick={() => addReview()}>Add</button>
          </div>
        ) : null}
        {reviewsDivShown()}
      </div>
    </>
  );
}

export default App;
