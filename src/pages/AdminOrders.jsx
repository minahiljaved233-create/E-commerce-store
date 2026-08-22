import { useState } from "react"
import { Link } from "react-router-dom"
import "./AdminOrders.css"

function AdminOrders() {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  )

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
          }
        : order
    )

    setOrders(updatedOrders)

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    )
  }

  return (
    <section className="admin-orders">

      <div className="admin-orders-header">
        <span>ADMIN PANEL</span>

        <h1>Manage Orders</h1>

        <p>
          View and update customer order statuses.
        </p>
      </div>


      {orders.length === 0 ? (

        <div className="admin-empty">
          <div>📦</div>

          <h2>No Orders Found</h2>

          <p>
            There are currently no customer orders.
          </p>

          <Link to="/products">
            Go to Products →
          </Link>
        </div>

      ) : (

        <div className="admin-orders-list">

          {orders
            .slice()
            .reverse()
            .map((order) => (

              <div
                className="admin-order-card"
                key={order.id}
              >

                <div className="admin-order-top">

                  <div>
                    <span>ORDER #{order.id}</span>

                    <p>{order.date}</p>
                  </div>

                  <strong>
                    {order.status}
                  </strong>

                </div>


                <div className="admin-order-info">

                  <div>
                    <span>Customer</span>

                    <strong>
                      {order.customer.name}
                    </strong>
                  </div>

                  <div>
                    <span>Total</span>

                    <strong>
                      ${order.total}
                    </strong>
                  </div>

                  <div>
                    <span>Payment</span>

                    <strong>
                      {order.payment}
                    </strong>
                  </div>

                </div>


                <div className="admin-status-control">

                  <label>
                    Update Status
                  </label>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Order Placed">
                      Order Placed
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>

                </div>

              </div>

            ))}

        </div>

      )}

    </section>
  )
}

export default AdminOrders