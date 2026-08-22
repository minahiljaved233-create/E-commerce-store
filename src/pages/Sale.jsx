import { Link } from "react-router-dom"
import "./Sale.css"

import smartWatch from "../Products/smart-watch.jpg"
import headphones from "../Products/headphones.jpg"
import runningShoes from "../Products/running-shoes.jpg"
import wirelessEarbuds from "../Products/wireless-earbuds.jpg"
import bags from "../Products/bags.jpg"

function Sale() {
  const saleProducts = [
    {
      id: 1,
      name: "Smart Watch",
      price: 50,
      oldPrice: 65,
      image: smartWatch,
      discount: "23% OFF",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 80,
      oldPrice: 100,
      image: headphones,
      discount: "20% OFF",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 60,
      oldPrice: 75,
      image: runningShoes,
      discount: "20% OFF",
    },
    {
      id: 6,
      name: "Wireless Earbuds",
      price: 45,
      oldPrice: 60,
      image: wirelessEarbuds,
      discount: "25% OFF",
    },
    {
      id: 9,
      name: "Bags",
      price: 40,
      oldPrice: 50,
      image: bags,
      discount: "20% OFF",
    },
  ]

  return (
    <main className="sale-page">

      <section className="sale-hero">

        <div>
          <span>LIMITED TIME OFFERS</span>

          <h1>
            Big Deals.
            <br />
            Better Prices.
          </h1>

          <p>
            Discover selected products at special prices
            while the sale lasts.
          </p>

          <Link to="/products" className="sale-shop-btn">
            Shop All Products →
          </Link>
        </div>

      </section>


      <section className="sale-products">

        <div className="sale-heading">
          <span>SALE COLLECTION</span>
          <h2>Special Offers</h2>
          <p>
            Grab your favorites before the deals are gone.
          </p>
        </div>

        <div className="sale-grid">

          {saleProducts.map((product) => (

            <div className="sale-card" key={product.id}>

              <div className="sale-image">

                <span className="sale-badge">
                  {product.discount}
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="sale-info">

                <h3>{product.name}</h3>

                <div className="sale-price">
                  <strong>${product.price}</strong>

                  <span>
                    ${product.oldPrice}
                  </span>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="sale-view-btn"
                >
                  View Product →
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  )
}

export default Sale
