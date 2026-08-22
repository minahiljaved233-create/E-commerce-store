import { Link } from "react-router-dom"
import "./Orders.css"

function Orders() {
const cancelOrder = (orderId) => {
  const orders =
    JSON.parse(localStorage.getItem("orders")) || []

  const updatedOrders = orders.map((order) =>
    order.id === orderId
      ? {
          ...order,
          status: "Cancelled",
        }
      : order
  )

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  )

  window.location.reload()
}
    const orders =
    JSON.parse(localStorage.getItem("orders")) || []

  return (
    <section className="orders">

      <div className="orders-header">
        <span>ORDER HISTORY</span>
        <h1>My Orders</h1>
        <p>
          View your previous orders and their details.
        </p>
      </div>

      {orders.length === 0 ? (

        <div className="empty-orders">

          <div className="empty-orders-icon">
            📦
          </div>

          <h2>No Orders Yet</h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="shop-orders-btn"
          >
            Start Shopping →
          </Link>

        </div>

      ) : (

        <div className="orders-list">

          {orders
            .slice()
            .reverse()
            .map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-card-header">

                  <div>
                    <span>ORDER #{order.id}</span>
                    <p>{order.date}</p>
                  </div>

                  <strong className="order-status">
                    {order.status}
                  </strong>

                </div>


                <div className="order-products">

                  {order.products.map((product) => (

                    <div
                      className="order-product"
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
                          Quantity: {product.quantity}
                        </p>

                        <p>
                          ${product.price} × {product.quantity}
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


              <div className="order-details">

  <div>
    <span>Payment</span>
    <strong>
      {order.payment}
    </strong>
  </div>

  <div>
    <span>Delivery</span>
    <strong>
      {order.customer.city},{" "}
      {order.customer.country}
    </strong>
  </div>

  <div>
    <span>Total</span>
    <strong>
      ${order.total}
    </strong>
  </div>

  <Link
    to={`/orders/${order.id}`}
    className="view-order-btn"
  >
    View Details →
  </Link>
{order.status !== "Cancelled" && (
  <button
    className="cancel-order-btn"
    onClick={() => cancelOrder(order.id)}
  >
    Cancel Order
  </button>
)}
</div>

              </div>

            ))}

        </div>

      )}

    </section>
  )
}

export default Orders