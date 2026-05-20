// components/layout/Navbar.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { navigationLinks } from '@/lib/data'
import MobileMenu from './MobileMenu'
import { ArrowRight, Sparkles, Menu, X, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)

            // Define sections in order from top to bottom
            const sections = ['hero', 'case-studies', 'process', 'personal-work', 'authority', 'faq', 'cta']

            // Check which section is currently in view
            let currentSection = ''
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i]
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // If the section's top is within 150px from the top of viewport
                    if (rect.top <= 150 && rect.bottom >= 50) {
                        currentSection = section
                        break
                    }
                }
            }

            setActiveSection(currentSection)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (e, href) => {
        e.preventDefault()
        const targetId = href.replace('#', '')
        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setActiveSection(targetId)
            setMobileMenuOpen(false)
        }
    }

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'py-3 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#222222] shadow-lg'
                        : 'py-5 bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="group relative">
                            <div className="flex items-center gap-2.5">
                                <div className="relative">
                                    <div className="w-8 h-8 flex justify-center items-center bg-gradient-to-br from-[#5B8C5A] to-[#3B82F6] rounded-lg rotate-0 group-hover:rotate-12 transition-transform duration-500" >MR</div>
                                    <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#5B8C5A] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" ></div>
                                </div>
                                <div>
                                    <span className="text-xl font-bold text-white tracking-tight">
                                        Mohammed Rabi<span className="text-[#5B8C5A]">.</span>
                                    </span>
                                    <span className="text-xs text-[#888888] block -mt-1">FullStack Developer</span>
                                </div>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navigationLinks.map((link) => {
                                const linkId = link.href.replace('#', '')
                                const isActive = activeSection === linkId
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                                                ? 'bg-[#1A1A1A] text-white'
                                                : 'text-[#888888] hover:text-white hover:bg-[#1A1A1A]'
                                            }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-[#5B8C5A] to-[#3B82F6] rounded-full" />
                                        )}
                                    </a>
                                )
                            })}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">

                            {/* CTA Button */}
                            <a
                                href="#cta"
                                onClick={(e) => scrollToSection(e, '#cta')}
                                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#5B8C5A] hover:bg-[#4A7349] text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#5B8C5A]/25 group"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Start Project</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                            </a>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#1A1A1A] border border-[#222222] hover:border-[#333333] transition-colors duration-200"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-5 h-5 text-white" />
                                ) : (
                                    <Menu className="w-5 h-5 text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                links={navigationLinks}
                onLinkClick={scrollToSection}
            />
        </>
    )
}