import { createContext, useContext, useState } from "react"

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => item.id === product.id
      )

      if (alreadyExists) {
        return currentWishlist
      }

      return [...currentWishlist, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (product) => product.id !== productId
      )
    )
  }

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => item.id === product.id
      )

      if (alreadyExists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        )
      }

      return [...currentWishlist, product]
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}