import { useState } from 'react'

export const useToast = () => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showToast = (msg: string) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), 2500)
  }

  return { visible, message, showToast }
}