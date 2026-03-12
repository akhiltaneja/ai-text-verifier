
"use client"

import * as React from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"
import { useState, useEffect } from "react"
import confetti from 'canvas-confetti'
import { Clock } from 'lucide-react'

interface PricingSectionProps {
  title: string
  subtitle: string
  tiers: PricingTier[]
  frequencies: string[]
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0])
  const [showDiscount, setShowDiscount] = useState(false)
  const [countdown, setCountdown] = useState({ minutes: 60, seconds: 0 })
  
  // Handle confetti effect when yearly option is selected
  const handleSelectFrequency = (frequency: string) => {
    if (frequency === "yearly" && selectedFrequency !== "yearly") {
      triggerConfetti()
      setShowDiscount(true)
    }
    setSelectedFrequency(frequency)
  }
  
  // Trigger confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#4299E1', '#63B3ED', '#90CDF4', '#2B6CB0']
    })
  }
  
  // Countdown timer for limited time offer
  useEffect(() => {
    if (selectedFrequency !== "yearly") return
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(timer)
            return prev
          }
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return { ...prev, seconds: prev.seconds - 1 }
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [selectedFrequency])

  return (
    <section className="flex flex-col items-center gap-6 py-6">
      <div className="space-y-5 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-medium md:text-4xl">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mx-auto flex w-fit rounded-full bg-muted p-1">
          {frequencies.map((freq) => (
            <Tab
              key={freq}
              text={freq}
              selected={selectedFrequency === freq}
              setSelected={(value) => handleSelectFrequency(value)}
              discount={freq === "yearly"}
            />
          ))}
        </div>
        
        {selectedFrequency === "yearly" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 max-w-md mx-auto flex items-center justify-center gap-2 animate-fade-in">
            <Clock className="h-4 w-4 text-green-600" />
            <p className="text-green-600 text-sm font-medium">
              Limited time offer: {countdown.minutes.toString().padStart(2, '0')}:{countdown.seconds.toString().padStart(2, '0')} remaining!
            </p>
          </div>
        )}
      </div>

      <div className="grid w-full max-w-6xl gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            paymentFrequency={selectedFrequency}
            showDiscount={showDiscount && selectedFrequency === "yearly"}
          />
        ))}
      </div>
    </section>
  )
}
