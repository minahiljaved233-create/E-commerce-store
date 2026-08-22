import { createContext, useContext, useState } from "react"
import "./Toast.css"

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    })

    setTimeout(() => {
      setToast(null)
    }, 2500)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>
            {toast.type === "success" ? "✓" : "♡"}
          </span>

          <p>{toast.message}</p>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}