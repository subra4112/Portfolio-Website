import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WebsitePreloaderProps {
  onComplete: () => void
}

const WebsitePreloader: React.FC<WebsitePreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)

  const welcomeLines = [
    "Loading profile: Subramanian Raj Narayanan",
    "Role: Gen AI & Agentic AI Developer  | Data Scientist | ML Engineer",
    "Skills: Python, SQL, R, AI, Visualization",
    "Status: Ready to innovate.",
    "Welcome to my portfolio — exploring intelligence through data and automation.",
    "Site accessed successfully. Redirecting to portfolio..."
  ]

  useEffect(() => {
    const totalDuration = 3900 // Reduced to 3.9 seconds total
    const progressInterval = 39 // Update progress every 39ms
    
    let progressTimer: number
    
    const startProgress = () => {
      progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            // Wait for "site accessed" message to show and blink before redirecting
            setTimeout(() => {
              setIsVisible(false)
              setTimeout(onComplete, 200)
            }, 800) // Shorter delay for faster transition
            return 100
          }
          return prev + (100 / (totalDuration / progressInterval))
        })
      }, progressInterval)
    }
    
    // Show welcome message after 0.4 seconds
    setTimeout(() => setShowWelcome(true), 400)
    
    // Cycle through welcome lines
    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        const next = prev + 1
        if (next >= welcomeLines.length) {
          // All lines shown, stop cycling
          clearInterval(lineInterval)
          return prev
        }
        return next
      })
    }, 500) // Faster cycling to match 3.9 second duration
    
    startProgress()
    
    return () => {
      clearInterval(progressTimer)
      clearInterval(lineInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-dark-900 flex items-center justify-center"
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-full filter blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 90, 180]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl"
              animate={{ 
                scale: [1.1, 1, 1.1],
                opacity: [0.3, 0.1, 0.3],
                rotate: [180, 90, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
              
              {/* Left Side - Branding */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-1 text-center lg:text-left"
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="gradient-text">Subramanian</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-2 mb-6"
                >
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-200">
                    Gen AI & Agentic AI Developer
                  </p>
                  <p className="text-base sm:text-lg text-gray-400">
                    Data Scientist | ML Engineer
                  </p>
                </motion.div>

                {/* Loading Progress */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="max-w-sm mx-auto lg:mx-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Loading Portfolio</span>
                    <span className="text-sm text-primary-400 font-mono">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <motion.div
                      className="h-1.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Terminal */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 max-w-md mx-auto lg:mx-0"
              >
                <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
                  
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-300 font-mono">
                      portfolio-terminal
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-4 min-h-[280px] max-h-[320px] overflow-hidden">
                    {showWelcome && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-2"
                      >
                        {welcomeLines.slice(0, currentLine + 1).map((line, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="text-sm font-mono leading-relaxed"
                          >
                            <span className="text-green-400">$</span>
                            <span className="ml-2 text-gray-300 break-words">
                              {index === welcomeLines.length - 1 ? (
                                <motion.span
                                  animate={{ 
                                    opacity: [1, 0.3, 1],
                                    color: ["#10b981", "#f59e0b", "#10b981"]
                                  }}
                                  transition={{ 
                                    duration: 0.8, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className="font-bold"
                                >
                                  {line}
                                </motion.span>
                              ) : (
                                line
                              )}
                            </span>
                          </motion.div>
                        ))}
                        
                        {currentLine < welcomeLines.length - 1 && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="text-primary-400 text-sm"
                          >
                            _
                          </motion.span>
                        )}
                      </motion.div>
                    )}

                    {/* Terminal Prompt */}
                    <div className="mt-6 text-xs text-gray-500 font-mono">
                      <span className="text-green-400">subra@portfolio</span>
                      <span className="text-blue-400">:</span>
                      <span className="text-yellow-400">~</span>
                      <span className="text-blue-400">$</span>
                      <span className="ml-2 text-gray-300">
                        {currentLine < welcomeLines.length - 1 ? (
                          'loading...'
                        ) : (
                          <motion.span
                            animate={{ 
                              opacity: [1, 0.4, 1],
                              color: ["#10b981", "#f59e0b", "#10b981"]
                            }}
                            transition={{ 
                              duration: 0.6, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="font-bold"
                          >
                            ACCESSING...
                          </motion.span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WebsitePreloader