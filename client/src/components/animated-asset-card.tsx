` tags.

```
<replit_final_file>
"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { Heart, Share2, Eye, Star } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Asset } from "@/lib/types"

interface AnimatedAssetCardProps {
  asset: Asset
  onWishlistToggle?: (assetId: number) => void
  onShare?: (asset: Asset) => void
  onView?: (asset: Asset) => void
  isInWishlist?: boolean
  className?: string
}

export function AnimatedAssetCard({ 
  asset, 
  onWishlistToggle, 
  onShare, 
  onView,
  isInWishlist = false,
  className 
}: AnimatedAssetCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(isInWishlist)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    onWishlistToggle?.(asset.id)
  }

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShare?.(asset)
  }

  const handleCardClick = () => {
    onView?.(asset)
  }

  return (
    <motion.div
      className={cn("group cursor-pointer", className)}
      style={{ x, y, rotateX, rotateY, z: 100 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) / 5)
        y.set((e.clientY - centerY) / 5)
      }}
      onClick={handleCardClick}
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
        <motion.div 
          className="relative aspect-[4/3] overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={asset.imageUrl}
            alt={asset.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Overlay with gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Action buttons */}
          <motion.div 
            className="absolute top-4 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={handleWishlistClick}
              >
                <motion.div
                  animate={{ 
                    scale: isLiked ? [1, 1.3, 1] : 1,
                    rotate: isLiked ? [0, -10, 10, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart 
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                    )} 
                  />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={handleShareClick}
              >
                <Share2 className="h-4 w-4 text-gray-600" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Premium badge */}
          {asset.isPremium && (
            <motion.div
              className="absolute top-4 left-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            >
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </motion.div>
          )}

          {/* View count */}
          <motion.div
            className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Eye className="w-4 h-4" />
            <span>{asset.viewCount || 0}</span>
          </motion.div>
        </motion.div>

        <CardContent className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.h3 
              className="font-semibold text-lg mb-2 line-clamp-1"
              whileHover={{ color: "hsl(var(--primary))" }}
              transition={{ duration: 0.2 }}
            >
              {asset.title}
            </motion.h3>

            <motion.p 
              className="text-muted-foreground text-sm mb-3 line-clamp-2"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {asset.description}
            </motion.p>

            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span 
                className="text-lg font-bold text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                ${asset.price?.toLocaleString()}
              </motion.span>

              {asset.category && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Badge variant="outline">{asset.category}</Badge>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}