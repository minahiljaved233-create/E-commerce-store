import { Link } from "react-router-dom"
import { useWishlist } from "../Context/WishlistContext"
import { useCart } from "../Context/CartContext"
import "./Wishlist.css"

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist()

  const { addToCart } = useCart()

  return (
    <section className="wishlist">

      <div className="wishlist-header">
        <span>YOUR SAVED ITEMS</span>
        <h1>My Wishlist ♡</h1>
        <p>
          Products you've saved for later.
        </p>
      </div>

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">
            ♡
          </div>

          <h2>Your wishlist is empty</h2>

          <p>
            Save products you love and find them here later.
          </p>

          <Link to="/products">
            Explore Products →
          </Link>
        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map((product) => (

            <div
              className="wishlist-card"
              key={product.id}
            >

              <div className="wishlist-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="wishlist-info">

                <h2>{product.name}</h2>

                <p>${product.price}</p>

                <div className="wishlist-actions">

                  <button
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/products/${product.id}`}
                  >
                    View →
                  </Link>

                </div>

                <button
                  className="remove-wishlist"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                >
                  Remove from Wishlist
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  )
}

export default Wishlist