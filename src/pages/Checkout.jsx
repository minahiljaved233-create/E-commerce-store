import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import "./Checkout.css"

function Checkout() {
  const { cart, clearCart } = useCart()

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  const savedProfile =
    JSON.parse(localStorage.getItem("profile")) || {}

  const [formData, setFormData] = useState({
    name: savedProfile.name || "",
    email: savedProfile.email || "",
    phone: savedProfile.phone || "",
    address: savedProfile.address || "",
    city: savedProfile.city || "",
    country: savedProfile.country || "",
    payment: "Cash on Delivery",
  })

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, product) =>
      sum + product.price * product.quantity,
    0
  )

  // Shipping
  const shipping = subtotal >= 100 ? 0 : 10

  // Final total
  const total = subtotal + shipping

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Place order
  const handlePlaceOrder = (e) => {
    e.preventDefault()

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.country
    ) {
      alert("Please fill all required fields.")
      return
    }

    // Create new order
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      status: "Order Placed",

      products: cart.map((product) => ({
        ...product,
      })),

      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
      },

      payment: formData.payment,

      subtotal: subtotal,
      shipping: shipping,
      total: total,
    }

    // Get existing orders
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || []

    // Save new order
    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...existingOrders,
        newOrder,
      ])
    )

    // Show success screen
    setPlacedOrder(newOrder)

    // Clear cart
    clearCart()

    // Change screen
    setOrderPlaced(true)
  }

  // =========================
  // ORDER SUCCESS SCREEN
  // =========================

  if (orderPlaced) {
    return (
      <section className="checkout-success">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <span>ORDER CONFIRMED</span>

          <h1>
            Thank You For Your Order!
          </h1>

          <p>
            Your order has been successfully placed.
          </p>

          {placedOrder && (
            <p>
              Order ID: #{placedOrder.id}
            </p>
          )}

          <div className="success-buttons">

            <Link
              to="/orders"
              className="view-orders-btn"
            >
              View My Orders →
            </Link>

            <Link
              to="/products"
              className="continue-shopping-btn"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </section>
    )
  }

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <section className="checkout">

        <div className="empty-checkout">

          <div className="empty-checkout-icon">
            🛒
          </div>

          <h1>
            Your cart is empty
          </h1>

          <p>
            Add some products before proceeding
            to checkout.
          </p>

          <Link to="/products">
            Start Shopping →
          </Link>

        </div>

      </section>
    )
  }

  // =========================
  // CHECKOUT PAGE
  // =========================

  return (
    <section className="checkout">

      {/* HEADER */}

      <div className="checkout-header">

        <span>
          SECURE CHECKOUT
        </span>

        <h1>
          Complete Your Order
        </h1>

        <p>
          Enter your details below to complete
          your purchase.
        </p>

      </div>


      <div className="checkout-container">

        {/* =========================
            LEFT - CHECKOUT FORM
        ========================= */}

        <div className="checkout-form-section">

          <form onSubmit={handlePlaceOrder}>

            {/* CUSTOMER INFORMATION */}

            <div className="checkout-block">

              <h2>
                Customer Information
              </h2>

              <div className="form-group">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* DELIVERY ADDRESS */}

            <div className="checkout-block">

              <h2>
                Delivery Address
              </h2>

              <div className="form-group">

                <label>
                  Address *
                </label>

                <textarea
                  name="address"
                  placeholder="House number, street, area"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    Country *
                  </label>

                  <input
                    type="text"
                    name="country"
                    placeholder="Your country"
                    value={formData.country}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>


            {/* PAYMENT */}

            <div className="checkout-block">

              <h2>
                Payment Method
              </h2>


              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    formData.payment ===
                    "Cash on Delivery"
                  }
                  onChange={handleChange}
                />

                <span>

                  <strong>
                    Cash on Delivery
                  </strong>

                  <small>
                    Pay when your order arrives
                  </small>

                </span>

              </label>


              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Credit / Debit Card"
                  checked={
                    formData.payment ===
                    "Credit / Debit Card"
                  }
                  onChange={handleChange}
                />

                <span>

                  <strong>
                    Credit / Debit Card
                  </strong>

                  <small>
                    Demo payment option
                  </small>

                </span>

              </label>

            </div>


            {/* PLACE ORDER BUTTON */}

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order — ${total}
            </button>

          </form>

        </div>


        {/* =========================
            RIGHT - ORDER SUMMARY
        ========================= */}

        <aside className="order-summary">

          <span>
            YOUR ORDER
          </span>

          <h2>
            Order Summary
          </h2>


          <div className="checkout-products">

            {cart.map((product) => (

              <div
                className="order-item"
                key={product.id}
              >

                {/* PRODUCT IMAGE */}

                {product.image && (
                  <div className="checkout-product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>
                )}


                {/* PRODUCT INFO */}

                <div className="checkout-product-info">

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    ${product.price} ×{" "}
                    {product.quantity}
                  </p>

                </div>


                {/* PRODUCT TOTAL */}

                <strong>
                  $
                  {product.price *
                    product.quantity}
                </strong>

              </div>

            ))}

          </div>


          <div className="checkout-divider"></div>


          {/* SUBTOTAL */}

          <div className="checkout-row">

            <span>
              Subtotal
            </span>

            <span>
              ${subtotal}
            </span>

          </div>


          {/* SHIPPING */}

          <div className="checkout-row">

            <span>
              Shipping
            </span>

            <span>
              {shipping === 0
                ? "FREE"
                : `$${shipping}`}
            </span>

          </div>


          <div className="checkout-divider"></div>


          {/* FINAL TOTAL */}

          <div className="checkout-final-total">

            <span>
              Total
            </span>

            <strong>
              ${total}
            </strong>

          </div>


          {/* SECURITY MESSAGE */}

          <div className="secure-note">

            🔒 Your information is secure
            and protected.

          </div>

        </aside>

      </div>

    </section>
  )
}

export default Checkout