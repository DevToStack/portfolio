'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
        animation = 'fade-up'
    } = options

    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (triggerOnce) {
                        observer.unobserve(element)
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false)
                }
            },
            {
                threshold,
                rootMargin,
            }
        )

        observer.observe(element)

        return () => {
            observer.unobserve(element)
        }
    }, [threshold, rootMargin, triggerOnce])

    const animations = {
        'fade-up': {
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
        },
        'fade-in': {
            opacity: isVisible ? 1 : 0,
        },
        'slide-left': {
            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
            opacity: isVisible ? 1 : 0,
        },
        'slide-right': {
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            opacity: isVisible ? 1 : 0,
        },
        'scale': {
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            opacity: isVisible ? 1 : 0,
        }
    }

    const style = {
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        ...animations[animation],
    }

    return { ref, isVisible, style }
}