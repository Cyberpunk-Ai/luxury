
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Heart, Share2, Filter, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingActionButtonProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "accent"
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(({ className, size = "md", variant = "primary", children, onClick, disabled, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-14 w-14", 
    lg: "h-16 w-16"
  }

  const variantClasses = {
    primary: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground shadow-md hover:shadow-lg",
    accent: "bg-accent text-accent-foreground shadow-md hover:shadow-lg"
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        "fixed bottom-6 right-6 rounded-full flex items-center justify-center z-50 transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ 
        scale: 0.9,
        rotate: -5,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        transition: { 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.1
        }
      }}
      exit={{ 
        scale: 0, 
        rotate: 180,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      <motion.div
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
      >
        {children || <Plus className="h-6 w-6" />}
      </motion.div>
    </motion.button>
  )
})
FloatingActionButton.displayName = "FloatingActionButton"

interface SpeedDialAction {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: "primary" | "secondary" | "accent"
}

interface SpeedDialProps {
  actions: SpeedDialAction[]
  className?: string
  mainButtonVariant?: "primary" | "secondary" | "accent"
  direction?: "up" | "left" | "up-left"
}

const SpeedDial = React.forwardRef<HTMLDivElement, SpeedDialProps>(
  ({ actions, className, mainButtonVariant = "primary", direction = "up" }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const getActionPosition = (index: number) => {
      const spacing = 70
      switch (direction) {
        case "up":
          return { x: 0, y: -(spacing * (index + 1)) }
        case "left":
          return { x: -(spacing * (index + 1)), y: 0 }
        case "up-left":
          return { 
            x: -(spacing * (index + 1)) * 0.7, 
            y: -(spacing * (index + 1)) * 0.7 
          }
        default:
          return { x: 0, y: -(spacing * (index + 1)) }
      }
    }

    return (
      <div ref={ref} className={cn("fixed bottom-6 right-6 z-50", className)}>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                style={{ zIndex: -1 }}
              />
              
              {/* Action Buttons */}
              {actions.map((action, index) => {
                const position = getActionPosition(index)
                return (
                  <motion.button
                    key={index}
                    className={cn(
                      "absolute h-12 w-12 rounded-full flex items-center justify-center shadow-lg",
                      action.variant === "secondary" 
                        ? "bg-secondary text-secondary-foreground" 
                        : action.variant === "accent"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                    style={{
                      bottom: 0,
                      right: 0,
                    }}
                    initial={{ 
                      scale: 0, 
                      x: 0, 
                      y: 0,
                      opacity: 0 
                    }}
                    animate={{ 
                      scale: 1, 
                      x: position.x, 
                      y: position.y,
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1, 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20 
                      }
                    }}
                    exit={{ 
                      scale: 0, 
                      x: 0, 
                      y: 0,
                      opacity: 0,
                      transition: { 
                        delay: (actions.length - index - 1) * 0.05,
                        duration: 0.1
                      }
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={action.onClick}
                  >
                    {action.icon}
                  </motion.button>
                )
              })}
            </>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <FloatingActionButton
          variant={mainButtonVariant}
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="h-6 w-6" />
          </motion.div>
        </FloatingActionButton>
      </div>
    )
  }
)
SpeedDial.displayName = "SpeedDial"

export { FloatingActionButton, SpeedDial, type SpeedDialAction }
