import { Link, useParams } from "react-router-dom"
import "./OrderDetails.css"

function OrderDetails() {
  const { id } = useParams()

  const orders =
    JSON.parse(localStorage.getItem("orders")) || []

  const order = orders.find(
    (item) => item.id.toString() === id
  )

  if (!order) {
    return (
      <section className="order-details-page">

        <div className="order-not-found">
          <div>📦</div>

          <h1>Order Not Found</h1>

          <p>
            Sorry, we couldn't find this order.
          </p>

          <Link to="/orders">
            ← Back to My Orders
          </Link>
        </div>

      </section>
    )
  }

  return (
    <section className="order-details-page">

      <div className="order-details-header">

        <span>ORDER DETAILS</span>

        <h1>Order #{order.id}</h1>

        <p>{order.date}</p>

        <strong className="order-detail-status">
          {order.status}
        </strong>
<div className="order-timeline">

  {order.status === "Cancelled" ? (

    <>
      <div className="timeline-step active">
        <span>✓</span>
        <p>Order Placed</p>
      </div>

      <div className="timeline-step cancelled">
        <span>✕</span>
        <p>Cancelled</p>
      </div>
    </>

  ) : (

    <>
      <div
        className={`timeline-step ${
          [
            "Order Placed",
            "Processing",
            "Shipped",
            "Delivered",
          ].includes(order.status)
            ? "active"
            : ""
        }`}
      >
        <span>✓</span>
        <p>Order Placed</p>
      </div>


      <div
        className={`timeline-step ${
          [
            "Processing",
            "Shipped",
            "Delivered",
          ].includes(order.status)
            ? "active"
            : ""
        }`}
      >
        <span>2</span>
        <p>Processing</p>
      </div>


      <div
        className={`timeline-step ${
          [
            "Shipped",
            "Delivered",
          ].includes(order.status)
            ? "active"
            : ""
        }`}
      >
        <span>3</span>
        <p>Shipped</p>
      </div>


      <div
        className={`timeline-step ${
          order.status === "Delivered"
            ? "active"
            : ""
        }`}
      >
        <span>4</span>
        <p>Delivered</p>
      </div>
    </>

  )}

</div>
</div>

      <div className="order-details-container">

        {/* Customer Information */}

        <div className="details-card">

          <h2>Customer Information</h2>

          <div className="customer-info">

            <div>
              <span>Name</span>
              <strong>{order.customer.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{order.customer.email}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{order.customer.phone}</strong>
            </div>

          </div>

        </div>


        {/* Delivery Information */}

        <div className="details-card">

          <h2>Delivery Address</h2>

          <div className="address-info">

            <p>{order.customer.address}</p>

            <p>
              {order.customer.city},{" "}
              {order.customer.country}
            </p>

          </div>

        </div>


        {/* Products */}

        <div className="details-card">

          <h2>Ordered Products</h2>

          <div className="detail-products">

            {order.products.map((product) => (

              <div
                className="detail-product"
                key={product.id}
              >

                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                )}

                <div>
                  <h3>{product.name}</h3>

                  <p>
                    ${product.price} ×{" "}
                    {product.quantity}
                  </p>
                </div>

                <strong>
                  $
                  {product.price *
                    product.quantity}
                </strong>

              </div>

            ))}

          </div>

        </div>


        {/* Payment */}

        <div className="details-card">

          <h2>Payment Method</h2>

          <p className="payment-method">
            💳 {order.payment}
          </p>

        </div>


        {/* Price Summary */}

        <div className="details-card price-card">

          <h2>Order Summary</h2>

          <div className="price-row">
            <span>Subtotal</span>
            <span>${order.subtotal}</span>
          </div>

          <div className="price-row">
            <span>Shipping</span>

            <span>
              {order.shipping === 0
                ? "FREE"
                : `$${order.shipping}`}
            </span>
          </div>

          <div className="price-divider"></div>

          <div className="price-total">
            <span>Total</span>
            <strong>${order.total}</strong>
          </div>

        </div>


        <Link
          to="/orders"
          className="back-orders-btn"
        >
          ← Back to My Orders
        </Link>

      </div>

    </section>
  )
}

export default OrderDetails