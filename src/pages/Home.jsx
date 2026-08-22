import { Link } from "react-router-dom"
import "./Home.css"
import smartWatch from "../Products/smart-watch.jpg"
import headphones from "../Products/headphones.jpg"
import runningShoes from "../Products/running-shoes.jpg"
function Home() {
  const categories = [
  {
    name: "Electronics",
    image: smartWatch,
    text: "Smart tech for everyday life",
  },
  {
    name: "Audio",
    image: headphones,
    text: "Sound that moves with you",
  },
  {
    name: "Fashion",
    image: runningShoes,
    text: "Style made for every step",
  },
]

  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            NEW COLLECTION 2026
          </span>

          <h1>
            Elevate Your
            <br />
            Everyday
          </h1>

          <p>
            Discover carefully selected products
            designed to make everyday life better.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="primary-btn">
              Shop Collection
            </Link>

            <Link to="/products" className="secondary-btn">
              Explore Products
            </Link>
          </div>
        </div>
<div className="hero-visual">

  <div className="hero-circle">
    <img
      src={smartWatch}
      alt="Smart Watch"
    />
  </div>

  <div className="hero-card hero-card-one">
    <img
      src={headphones}
      alt="Wireless Headphones"
    />
  </div>

  <div className="hero-card hero-card-two">
    <img
      src={runningShoes}
      alt="Running Shoes"
    />
  </div>

  <div className="hero-card hero-card-three">
    <span>NEW</span>
  </div>

</div>
      </section>


      {/* Categories */}
      <section className="categories-section">

        <div className="section-heading">
          <span>EXPLORE</span>
          <h2>Shop by Category</h2>
          <p>
            Find something perfect for your lifestyle.
          </p>
        </div>

        <div className="category-grid">

          {categories.map((category) => (
            <Link
              to="/products"
              className="category-card"
              key={category.name}
            >
             <div className="category-image">
  <img
    src={category.image}
    alt={category.name}
  />
</div>

              <div>
                <h3>{category.name}</h3>
                <p>{category.text}</p>
              </div>

              <span className="category-arrow">
                →
              </span>
            </Link>
          ))}

        </div>

      </section>

{/* Featured Products */}
<section className="featured-section">

  <div className="section-heading">
    <span>OUR PICKS</span>
    <h2>Trending Now</h2>
    <p>
      Popular products our customers love.
    </p>
  </div>

  <div className="featured-grid">

    <div className="featured-card">
      <span className="product-badge">
        TRENDING
      </span>

      <Link to="/products/1" className="featured-image">
        <img
  src={smartWatch}
  alt="Smart Watch"
  className="smart-watch-image"
/>
      </Link>

      <div className="featured-info">
        <h3>Smart Watch</h3>

        <div className="rating">
          ★★★★★ <span>4.8</span>
        </div>

        <p>$50</p>

        <Link to="/products/1">
          View Product →
        </Link>
      </div>
    </div>


    <div className="featured-card">
      <span className="product-badge">
        POPULAR
      </span>

      <Link to="/products/2" className="featured-image">
       <img
  src={headphones}
  alt="Wireless Headphones"
  className="headphones-image"
/>
      </Link>

      <div className="featured-info">
        <h3>Wireless Headphones</h3>

        <div className="rating">
          ★★★★★ <span>4.7</span>
        </div>

        <p>$80</p>

        <Link to="/products/2">
          View Product →
        </Link>
      </div>
    </div>


    <div className="featured-card">
      <span className="product-badge">
        BEST SELLER
      </span>

      <Link to="/products/3" className="featured-image">
       <img
  src={runningShoes}
  alt="Running Shoes"
  className="shoes-image"
/>
      </Link>

      <div className="featured-info">
        <h3>Running Shoes</h3>

        <div className="rating">
          ★★★★★ <span>4.9</span>
        </div>

        <p>$60</p>

        <Link to="/products/3">
          View Product →
        </Link>
      </div>
    </div>

  </div>

  <div className="view-all">
    <Link to="/products">
      View All Products →
    </Link>
  </div>

</section>

      {/* Promo Banner */}
      <section className="promo-section">

        <div className="promo-content">
          <span>LIMITED TIME OFFER</span>

          <h2>
            Make Your Everyday
            <br />
            A Little Better.
          </h2>

          <p>
            Discover our latest collection and
            find something you'll love.
          </p>

          <Link to="/products">
            Shop Now →
          </Link>
        </div>

      </section>

    </main>
  )
}

export default Home