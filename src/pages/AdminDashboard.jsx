import { Link } from "react-router-dom"
import "./AdminDashboard.css"

function AdminDashboard() {
  const orders =
    JSON.parse(localStorage.getItem("orders")) || []

  const totalOrders = orders.length

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) => total + Number(order.total || 0),
      0
    )

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Order Placed" ||
      order.status === "Processing"
  ).length

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length

  const recentOrders = orders
    .slice()
    .reverse()
    .slice(0, 5)

  return (
    <section className="admin-dashboard">

      <div className="admin-dashboard-header">

        <span>ADMIN PANEL</span>

        <h1>Dashboard</h1>

        <p>
          Overview of your store orders and sales.
        </p>

      </div>


      {/* STAT CARDS */}

      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon">📦</div>

          <span>Total Orders</span>

          <h2>{totalOrders}</h2>
        </div>


        <div className="stat-card">
          <div className="stat-icon">💰</div>

          <span>Total Revenue</span>

          <h2>${totalRevenue}</h2>
        </div>


        <div className="stat-card">
          <div className="stat-icon">⏳</div>

          <span>Pending Orders</span>

          <h2>{pendingOrders}</h2>
        </div>


        <div className="stat-card">
          <div className="stat-icon">🚚</div>

          <span>Shipped Orders</span>

          <h2>{shippedOrders}</h2>
        </div>


        <div className="stat-card">
          <div className="stat-icon">✅</div>

          <span>Delivered</span>

          <h2>{deliveredOrders}</h2>
        </div>


        <div className="stat-card">
          <div className="stat-icon">❌</div>

          <span>Cancelled</span>

          <h2>{cancelledOrders}</h2>
        </div>

      </div>


      {/* RECENT ORDERS */}

      <div className="recent-orders">

        <div className="recent-orders-header">

          <div>
            <span>OVERVIEW</span>

            <h2>Recent Orders</h2>
          </div>

          <Link to="/admin-orders">
            Manage Orders →
          </Link>

        </div>


        {recentOrders.length === 0 ? (

          <div className="dashboard-empty">

            <div>📦</div>

            <h3>No Orders Yet</h3>

            <p>
              Orders will appear here after customers
              place them.
            </p>

          </div>

        ) : (

          <div className="recent-orders-list">

            {recentOrders.map((order) => (

              <div
                className="recent-order"
                key={order.id}
              >

                <div>

                  <strong>
                    Order #{order.id}
                  </strong>

                  <p>
                    {order.customer.name}
                  </p>

                </div>


                <div>

                  <span>
                    {order.status}
                  </span>

                  <strong>
                    ${order.total}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* QUICK ACTIONS */}

      <div className="dashboard-actions">

        <Link to="/admin-orders">
          📦 Manage Orders
        </Link>

        <Link to="/products">
          🛍️ View Products
        </Link>

        <Link to="/orders">
          🧾 View Customer Orders
        </Link>

      </div>

    </section>
  )
}

export default AdminDashboard