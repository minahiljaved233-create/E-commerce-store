import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Wishlist from "./pages/Wishlist"
import Orders from "./pages/Orders"
import OrderDetails from "./pages/OrderDetails"
import AdminOrders from "./pages/AdminOrders"
import Account from "./pages/Account"
import AdminDashboard from "./pages/AdminDashboard"
import NotFound from "./pages/NotFound"
import { ToastProvider } from "./Context/ToastContext"
import Collections from "./pages/Collections"
import Sale from "./pages/Sale"

function App() {
  return (
    <BrowserRouter>

      <ToastProvider>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/account"
            element={<Account />}
          />
 <Route path="/collections" element={<Collections />} />
          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />
<Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/>
          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/admin-orders"
            element={<AdminOrders />}
          />
<Route path="/sale" element={<Sale />} />
<Route
  path="*"
  element={<NotFound />}
/>
        </Routes>

      </ToastProvider>

    </BrowserRouter>
  )
}

export default App