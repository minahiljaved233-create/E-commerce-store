import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import { useWishlist } from "../Context/WishlistContext"
import "./Navbar.css"

function Navbar() {
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const navigate = useNavigate()

  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  const wishlistCount = wishlist.length

  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const handleSearch = (e) => {
    e.preventDefault()

    if (search.trim() !== "") {
      navigate(
        `/products?search=${encodeURIComponent(
          search.trim()
        )}`
      )

      setSearchOpen(false)
      setMenuOpen(false)
    }
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      {/* ANNOUNCEMENT */}

      <div className="announcement-bar">
        FREE SHIPPING ON ORDERS OVER $100
        <span> • </span>
        SHOP NOW →
      </div>


      {/* NAVBAR */}

      <nav className="navbar">

        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          ShopEase
        </Link>


        {/* MOBILE MENU BUTTON */}

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>


        {/* NAV LINKS */}

        <div
          className={`nav-links ${
            menuOpen ? "open" : ""
          }`}
        >

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={closeMenu}
          >
            Shop
          </Link>

          <Link
            to="/wishlist"
            onClick={closeMenu}
          >
            Wishlist ♡

            {wishlistCount > 0 && (
              <span className="wishlist-count">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/orders"
            onClick={closeMenu}
          >
            My Orders
          </Link>

          <Link to="/collections">Collections</Link>
           
          <Link to="/sale">Sale</Link>

          <Link
            to="/admin-dashboard"
            onClick={closeMenu}
          >
            Admin
          </Link>

        </div>


        {/* ACTIONS */}

        <div className="nav-actions">

          <button
            className="search-btn"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
          >
            🔍
          </button>

          <Link
            to="/account"
            className="account-btn"
            onClick={closeMenu}
          >
            👤
          </Link>

          <Link
            to="/cart"
            className="cart-link"
            onClick={closeMenu}
          >
            🛒

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

      </nav>


      {/* SEARCH */}

      {searchOpen && (
        <form
          className="search-bar"
          onSubmit={handleSearch}
        >
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            autoFocus
          />

          <button type="submit">
            Search
          </button>
        </form>
      )}

    </>
  )
}

export default Navbar