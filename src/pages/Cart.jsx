import { Link } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import "./Cart.css"

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  const subtotal = cart.reduce(
    (sum, product) =>
      sum + product.price * product.quantity,
    0
  )

  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 10

  const total = subtotal + shipping

  return (
    <section className="cart">

      <div className="cart-header">
        <span>SHOPPING BAG</span>
        <h1>Your Cart</h1>
        <p>
          Review your items before checkout.
        </p>
      </div>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Looks like you haven't added
            anything to your cart yet.
          </p>

          <Link
            to="/products"
            className="continue-shopping-btn"
          >
            Start Shopping →
          </Link>

        </div>

      ) : (

        <div className="cart-layout">

          {/* Cart Items */}

          <div className="cart-items">

            {cart.map((product) => (

              <div
                className="cart-item"
                key={product.id}
              >

                <div className="cart-product-info">

                  {product.image && (
                    <div className="cart-product-image-box">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="cart-product-image"
                      />
                    </div>
                  )}

                  <div>
                    <h2>{product.name}</h2>

                    <p className="cart-price">
                      ${product.price}
                    </p>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(product.id)
                      }
                    >
                      Remove
                    </button>
                  </div>

                </div>


                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(product.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(product.id)
                    }
                  >
                    +
                  </button>

                </div>


                <div className="item-total">
                  $
                  {product.price *
                    product.quantity}
                </div>

              </div>

            ))}

          </div>


          {/* Order Summary */}

          <aside className="cart-summary">

            <span>ORDER SUMMARY</span>

            <h2>Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <span>
                {shipping === 0
                  ? "FREE"
                  : `$${shipping}`}
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>${total}</strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout →
            </Link>

            <Link
              to="/products"
              className="continue-cart"
            >
              ← Continue Shopping
            </Link>

            {subtotal < 100 && (
              <p className="shipping-note">
                Add ${100 - subtotal} more
                for FREE shipping.
              </p>
            )}

          </aside>

        </div>

      )}

    </section>
  )
}

export default Cart