"use client";

import { motion } from "framer-motion"

export default function DashboardLoadingState() {
    const skeletonCards = Array.from({ length: 8 }, (_, i) => i)
    return (
      <div>
        <div className="mb-8">
          <h2 className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text font-medium text-2xl mb-2">Recent Posts</h2>
          <p className="text-zinc-400">Loading your latest content...</p>
        </div>

        {/* Grid of Skeleton Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skeletonCards.map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="relative overflow-hidden rounded-lg border border-zinc-900 bg-gradient-to-r from-zinc-900 to-zinc-950"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent"
                animate={{
                  x: ["100%", "100%", "-100%", "-100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: index * 0.1,
                }}
              />

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Image Placeholder */}
                <motion.div
                  className="w-full h-48 bg-zinc-800 rounded-md"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                {/* Title Placeholder */}
                <div className="space-y-2">
                  <motion.div
                    className="h-4 bg-zinc-800 rounded w-3/4"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.div
                    className="h-4 bg-zinc-800 rounded w-1/2"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
                  />
                </div>

                <div className="space-y-2">
                  <motion.div
                    className="h-3 bg-zinc-800 rounded w-full"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
                  />
                  <motion.div
                    className="h-3 bg-zinc-800 rounded w-4/5"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
                  />
                  <motion.div
                    className="h-3 bg-zinc-800 rounded w-2/3"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.0 }}
                  />
                </div>

                {/* Footer Placeholder */}
                <div className="flex items-center justify-between pt-4">
                  <motion.div
                    className="h-3 bg-zinc-800 rounded w-20"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 }}
                  />
                  <motion.div
                    className="h-6 w-6 bg-zinc-800 rounded-full"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.4 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading Indicator */}
        <motion.div
          className="flex items-center justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center space-x-2 text-zinc-400">
            <motion.div
              className="w-2 h-2 bg-zinc-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-zinc-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-zinc-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
            />
            <span className="ml-2 text-sm">Loading posts...</span>
          </div>
        </motion.div>
      </div>
    );
};