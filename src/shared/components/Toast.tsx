interface ToastProps {
  message: string
  visible: boolean
}

export const Toast = ({ message, visible }: ToastProps) => {
  if (!visible) return null

  return (
    <div className="fixed bottom-68 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-lg">
      {message}
    </div>
  )
}