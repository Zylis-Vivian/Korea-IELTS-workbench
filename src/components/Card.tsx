import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className = '', onClick }: Props) {
  return (
    <motion.div
      whileHover={onClick ? { y: -3 } : undefined}
      onClick={onClick}
      className={`bg-white rounded-card shadow-card p-5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
