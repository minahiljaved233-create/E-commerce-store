import { Link } from "react-router-dom"
import "./Collections.css"

import runningShoes from "../Products/running-shoes.jpg"
import smartWatch from "../Products/smart-watch.jpg"
import headphones from "../Products/headphones.jpg"
import bags from "../Products/bags.jpg"

function Collections() {
 const collections = [
  {
    name: "Fashion",
    title: "Style for Every Moment",
    text: "Discover modern pieces designed to make every outfit stand out.",
    image: runningShoes,
    link: "/products?category=Fashion",
  },
  {
    name: "Electronics",
    title: "Smart Living",
    text: "Explore technology that makes your everyday life easier.",
    image: smartWatch,
    link: "/products?category=Electronics",
  },
  {
    name: "Audio",
    title: "Sound That Moves You",
    text: "Experience immersive sound with modern audio essentials.",
    image: headphones,
    link: "/products?category=Audio",
  },
]
  return (
    <main className="collections">

      {/* HERO */}

      <section className="collections-hero">

        <div className="collections-hero-content">

          <span>CURATED COLLECTIONS</span>

          <h1>
            Discover Your
            <br />
            Style
          </h1>

          <p>
            Explore carefully selected products,
            timeless designs and everyday essentials
            made for modern living.
          </p>

          <Link
            to="/products"
            className="collections-shop-btn"
          >
            Shop Now →
          </Link>

        </div>

        <div className="collections-hero-visual">

          <div className="hero-main-product">
            <img
              src={runningShoes}
              alt="Featured Collection"
            />
          </div>

          <div className="floating-collection-card card-watch">
            <img
              src={smartWatch}
              alt="Smart Watch"
            />
          </div>

          <div className="floating-collection-card card-bag">
            <img
              src={bags}
              alt="Bag"
            />
          </div>

        </div>

      </section>


      {/* BENEFITS */}

      <section className="collection-benefits">

        <div className="benefit-item">
          <span className="benefit-icon">🚚</span>

          <div>
            <h3>Free Shipping</h3>
            <p>On orders over $100</p>
          </div>
        </div>


        <div className="benefit-item">
          <span className="benefit-icon">🛡️</span>

          <div>
            <h3>Secure Checkout</h3>
            <p>Safe & secure payments</p>
          </div>
        </div>


        <div className="benefit-item">
          <span className="benefit-icon">◯</span>

          <div>
            <h3>24/7 Support</h3>
            <p>We're here to help</p>
          </div>
        </div>

      </section>


      {/* FEATURED COLLECTIONS */}

      <section className="featured-collections">

        <div className="collections-heading">

          <span>EXPLORE</span>

          <h2>Featured Collections</h2>

          <p>
            Find something that fits your lifestyle.
          </p>

        </div>


        <div className="collections-grid">

          {collections.map((collection) => (

            <Link
              to={collection.link}
              className="collection-card"
              key={collection.name}
            >

              <div className="collection-image">

                <img
                  src={collection.image}
                  alt={collection.name}
                />

              </div>

              <div className="collection-info">

                <span>
                  {collection.name}
                </span>

                <h3>
                  {collection.title}
                </h3>

                <p>
                  {collection.text}
                </p>

                <strong>
                  Explore Collection →
                </strong>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section className="collections-cta">

        <div>

          <span>FIND YOUR FAVORITES</span>

          <h2>
            Something for
            <br />
            Everyone.
          </h2>

          <p>
            Browse our complete collection
            and discover your next favorite product.
          </p>

          <Link to="/products">
            View All Products →
          </Link>

        </div>

      </section>

    </main>
  )
}

export default Collections