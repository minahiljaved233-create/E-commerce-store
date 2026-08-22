import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { CartProvider } from "./Context/CartContext"
import { WishlistProvider } from "./Context/WishlistContext"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </CartProvider>
  </StrictMode>
)