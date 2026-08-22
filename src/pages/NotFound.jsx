import { Link } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  return (
    <section className="not-found">

      <div className="not-found-content">

        <div className="not-found-icon">
          🔍
        </div>

        <span>404 ERROR</span>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you're looking for doesn't
          exist or may have been moved.
        </p>

        <div className="not-found-actions">

          <Link
            to="/"
            className="home-404-btn"
          >
            ← Back to Home
          </Link>

          <Link
            to="/products"
            className="shop-404-btn"
          >
            Browse Products →
          </Link>

        </div>

      </div>

    </section>
  )
}

export default NotFound