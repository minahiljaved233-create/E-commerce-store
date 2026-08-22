import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import { useWishlist } from "../Context/WishlistContext"
import "./Products.css"

import smartWatch from "../Products/smart-watch.jpg"
import headphones from "../Products/headphones.jpg"
import runningShoes from "../Products/running-shoes.jpg"
import bluetoothSpeaker from "../Products/bluetooth-speaker.jpg"
import laptop from "../Products/laptop.jpg"
import wirelessEarbuds from "../Products/wireless-earbuds.jpg"
import smartPhone from "../Products/smart-phone.jpg"
import heels from "../Products/heals.jpg"
import bags from "../Products/bags.jpg"
import { useToast } from "../Context/ToastContext"

function Products() {
  const { addToCart } = useCart()
  const { toggleWishlist, wishlist } = useWishlist()
const { showToast } = useToast()
 const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get("search") || ""
const urlCategory = searchParams.get("category") || ""
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("featured")

  const products = [
    {
      id: 1,
      name: "Smart Watch",
      price: 50,
      category: "Electronics",
      image: smartWatch,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 80,
      category: "Audio",
      image: headphones,
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 60,
      category: "Fashion",
      image: runningShoes,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 70,
      category: "Audio",
      image: bluetoothSpeaker,
    },
    {
      id: 5,
      name: "Laptop",
      price: 900,
      category: "Electronics",
      image: laptop,
    },
    {
      id: 6,
      name: "Wireless Earbuds",
      price: 45,
      category: "Audio",
      image: wirelessEarbuds,
    },
    {
      id: 7,
      name: "Smart Phone",
      price: 500,
      category: "Electronics",
      image: smartPhone,
    },
    {
      id: 8,
      name: "Heels",
      price: 65,
      category: "Fashion",
      image: heels,
    },
    {
      id: 9,
      name: "Bags",
      price: 40,
      category: "Fashion",
      image: bags,
    },
  ]

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
  urlCategory
    ? product.category === urlCategory
    : category === "All" || product.category === category

    return matchesSearch && matchesCategory
  })

  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    )
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    )
  }

  return (
    <section className="products">

      <div className="products-header">

        <span>SHOP COLLECTION</span>

        <h1>
          {search
            ? `Search results for "${search}"`
            : "Our Products"}
        </h1>

        <p>
          Discover products designed for your everyday life.
        </p>

      </div>

      {/* FILTER BAR */}

      <div className="filter-bar">

        <div className="category-filters">

          {[
            "All",
            "Electronics",
            "Audio",
            "Fashion",
          ].map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>

          ))}

        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >

          <option value="featured">
            Sort: Featured
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>

        </select>

      </div>

      {/* RESULTS */}

  
    {(search || urlCategory || category !== "All" || sort !== "featured") && (
  <button
    className="clear-filters-btn"
    onClick={() => {
      setCategory("All")
      setSort("featured")
      setSearchParams({})
    }}
  
  >
    Clear Filters
  </button>
)}

      {filteredProducts.length === 0 && (
        <p className="no-results">
          No products found.
        </p>
      )}

      <div className="product-list">

        {filteredProducts.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

         <button
  className={`wishlist-btn ${
    wishlist.some((item) => item.id === product.id)
      ? "active"
      : ""
  }`}
  onClick={() => {
    const alreadyWishlisted = wishlist.some(
      (item) => item.id === product.id
    )

    toggleWishlist(product)

    if (alreadyWishlisted) {
      showToast(`${product.name} removed from wishlist`, "error")
    } else {
      showToast(`${product.name} added to wishlist`)
    }
  }}
>
  {wishlist.some((item) => item.id === product.id) ? "♥" : "♡"}
</button>

            <div className="product-image-wrapper">

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <span className="product-category">
                {product.category}
              </span>

            </div>

            <div className="product-info">

              <h2>{product.name}</h2>

              <p className="product-price">
                ${product.price}
              </p>

              <div className="product-actions">
<button
  onClick={() => {
    addToCart(product)
    showToast(`${product.name} added to cart`)
  }}
>
  Add to Cart
</button>

                <Link
                  to={`/products/${product.id}`}
                >
                  View Details →
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Products