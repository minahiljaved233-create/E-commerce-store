import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import { useWishlist } from "../Context/WishlistContext"
import "./ProductDetails.css"

import smartWatch from "../Products/smart-watch.jpg"
import headphones from "../Products/headphones.jpg"
import runningShoes from "../Products/running-shoes.jpg"
import bluetoothSpeaker from "../Products/bluetooth-speaker.jpg"
import laptop from "../Products/laptop.jpg"
import wirelessEarbuds from "../Products/wireless-earbuds.jpg"
import smartPhone from "../Products/smart-phone.jpg"
import heels from "../Products/heals.jpg"
import bags from "../Products/bags.jpg"

function ProductDetails() {
  const { id } = useParams()

  const { addToCart } = useCart()
  const { wishlist, toggleWishlist } = useWishlist()

  const [quantity, setQuantity] = useState(1)
const [reviewText, setReviewText] = useState("")
const [reviewRating, setReviewRating] = useState(5)

const reviewKey = `reviews-${id}`

const [reviewsList, setReviewsList] = useState(() => {
  return JSON.parse(localStorage.getItem(reviewKey)) || []
})

const submitReview = (e) => {
  e.preventDefault()

  if (reviewText.trim() === "") {
    return
  }

  const newReview = {
    id: Date.now(),
    rating: reviewRating,
    text: reviewText.trim(),
    date: new Date().toLocaleDateString(),
  }

  const updatedReviews = [
    ...reviewsList,
    newReview,
  ]

  setReviewsList(updatedReviews)

  localStorage.setItem(
    reviewKey,
    JSON.stringify(updatedReviews)
  )

  setReviewText("")
  setReviewRating(5)
}

const deleteReview = (reviewId) => {
  const updatedReviews = reviewsList.filter(
    (review) => review.id !== reviewId
  )

  setReviewsList(updatedReviews)

  localStorage.setItem(
    reviewKey,
    JSON.stringify(updatedReviews)
  )
}
  const products = {
    1: {
      name: "Smart Watch",
      price: 50,
      image: smartWatch,
      rating: "4.8",
      reviews: 124,
      category: "Electronics",
      description:
        "A stylish smart watch designed for everyday life. Track your activity, stay connected and keep your day organized.",
    },

    2: {
      name: "Wireless Headphones",
      price: 80,
      image: headphones,
      rating: "4.7",
      reviews: 98,
      category: "Audio",
      description:
        "Comfortable wireless headphones with clear sound, modern design and an immersive listening experience.",
    },

    3: {
      name: "Running Shoes",
      price: 60,
      image: runningShoes,
      rating: "4.9",
      reviews: 156,
      category: "Fashion",
      description:
        "Comfortable running shoes designed for everyday movement, walking and active lifestyles.",
    },

    4: {
      name: "Bluetooth Speaker",
      price: 70,
      image: bluetoothSpeaker,
      rating: "4.6",
      reviews: 87,
      category: "Audio",
      description:
        "A powerful Bluetooth speaker with clear audio, stylish design and portable performance for everyday entertainment.",
    },

    5: {
      name: "Laptop",
      price: 900,
      image: laptop,
      rating: "4.8",
      reviews: 76,
      category: "Electronics",
      description:
        "A modern laptop designed for work, study and entertainment with reliable performance and a sleek design.",
    },

    6: {
      name: "Wireless Earbuds",
      price: 45,
      image: wirelessEarbuds,
      rating: "4.7",
      reviews: 112,
      category: "Audio",
      description:
        "Compact wireless earbuds offering clear sound, comfortable fit and convenient everyday listening.",
    },

    7: {
      name: "Smart Phone",
      price: 500,
      image: smartPhone,
      rating: "4.8",
      reviews: 143,
      category: "Electronics",
      description:
        "A modern smartphone with a sleek design, bright display and powerful features for everyday use.",
    },

    8: {
      name: "Heels",
      price: 65,
      image: heels,
      rating: "4.6",
      reviews: 64,
      category: "Fashion",
      description:
        "Elegant and stylish heels designed to add a polished touch to both casual and special outfits.",
    },

    9: {
      name: "Bags",
      price: 40,
      image: bags,
      rating: "4.7",
      reviews: 91,
      category: "Fashion",
      description:
        "A stylish and practical bag designed for everyday use with enough space for your essential items.",
    },
  }

  const product = products[id]
const averageRating =
  reviewsList.length > 0
    ? (
        reviewsList.reduce(
          (total, review) => total + Number(review.rating),
          0
        ) / reviewsList.length
      ).toFixed(1)
    : product.rating

const totalReviews =
  Number(product.reviews) + reviewsList.length
  if (!product) {
    return (
      <section className="product-details">
        <h1>Product Not Found</h1>

        <Link to="/products">
          Back to Products
        </Link>
      </section>
    )
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === Number(id)
  )

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        id: Number(id),
      })
    }
  }

  return (
    <section className="product-details">

      <div className="product-details-card">

        {/* Product Image */}

        <div className="product-details-image">

          <span className="details-badge">
            BEST SELLER
          </span>

          <button
            className={`details-wishlist ${
              isWishlisted ? "active" : ""
            }`}
            onClick={() =>
              toggleWishlist({
                ...product,
                id: Number(id),
              })
            }
          >
            {isWishlisted ? "♥" : "♡"}
          </button>

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        {/* Product Information */}

        <div className="product-details-info">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="details-rating">

  <span className="stars">
    ★★★★★
  </span>

  <span>
    {averageRating} ({totalReviews} reviews)
  </span>



          </div>

          <h2>${product.price}</h2>

          <p>
            {product.description}
          </p>

          <div className="details-divider"></div>

          <div className="details-info-row">
            <span>✓ In Stock</span>
            <span>✓ Free Shipping</span>
          </div>

          {/* Quantity */}

          <div className="quantity-section">

            <span>Quantity</span>

            <div className="quantity-selector">

              <button
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((current) =>
                    current + 1
                  )
                }
              >
                +
              </button>

            </div>

          </div>

          {/* Add To Cart */}

          <button
            onClick={handleAddToCart}
            className="add-details-btn"
          >
            Add {quantity} to Cart 🛒
          </button>

          <Link
            to="/products"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>
{/* REVIEWS */}

<div className="product-reviews">

  <div className="reviews-header">
    <span>REVIEWS & RATINGS</span>
    <h2>Customer Reviews</h2>
  </div>

  {/* Add Review */}

  <form
    className="review-form"
    onSubmit={submitReview}
  >

    <h3>Write a Review</h3>

    <div className="review-stars">

      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          className={
            star <= reviewRating
              ? "selected"
              : ""
          }
          onClick={() =>
            setReviewRating(star)
          }
        >
          ★
        </button>
      ))}

    </div>

    <textarea
      placeholder="Share your experience with this product..."
      value={reviewText}
      onChange={(e) =>
        setReviewText(e.target.value)
      }
    />

    <button
      type="submit"
      className="submit-review-btn"
    >
      Submit Review
    </button>

  </form>


  {/* Reviews List */}

  <div className="reviews-list">

    {reviewsList.length === 0 ? (

      <div className="no-reviews">
        <span>⭐</span>

        <h3>No Reviews Yet</h3>

        <p>
          Be the first to review this product.
        </p>
      </div>

    ) : (

      reviewsList
        .slice()
        .reverse()
        .map((review) => (

          <div
            className="review-card"
            key={review.id}
          >

            <div className="review-card-top">

              <div className="review-stars-display">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <span>
                {review.date}
              </span>

            </div>

            <p>{review.text}</p>

            <button
              className="delete-review-btn"
              onClick={() =>
                deleteReview(review.id)
              }
            >
              Delete Review
            </button>

          </div>

        ))

    )}

  </div>

</div>
        </div>

      </div>

    </section>
  )
}

export default ProductDetails