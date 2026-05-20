// components/layout/MobileMenu.js
'use client'

import { useEffect } from 'react'
import { X, ArrowRight, Menu, Rocket, Sparkles } from 'lucide-react'

export default function MobileMenu({ isOpen, onClose, links, onLinkClick }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Menu */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-[#0A0A0A] border-l border-[#222222] z-50 transform transition-transform duration-300 ease-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Header with Close Button */}
                    <div className="flex items-center justify-between p-6 border-b border-[#222222]">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#5B8C5A] to-[#3B82F6] rounded-lg" />
                            <span className="font-semibold text-white text-lg">Menu</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1A1A1A] hover:bg-[#222222] transition-all duration-300 hover:scale-105"
                        >
                            <X className="w-5 h-5 text-[#888888] hover:text-white transition-colors" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 flex flex-col px-6 py-8">
                        {links.map((link, index) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => onLinkClick(e, link.href)}
                                className="group flex items-center gap-4 py-4 border-b border-[#222222] transition-all duration-300 hover:pl-2"
                            >
                                <span className="text-sm font-mono text-[#5B8C5A] w-8">
                                    0{index + 1}
                                </span>
                                <span className="text-lg font-medium text-[#888888] group-hover:text-white transition-colors">
                                    {link.label}
                                </span>
                                <ArrowRight className="w-4 h-4 text-[#5B8C5A] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ml-auto" />
                            </a>
                        ))}
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="p-6 border-t border-[#222222] bg-gradient-to-t from-[#0A0A0A] to-transparent">
                        {/* Social/Contact Info */}
                        <div className="mb-6 space-y-3">
                            <p className="text-xs text-[#888888] uppercase tracking-wider mb-3">
                                Connect
                            </p>
                            <div className="flex gap-3">
                                {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="text-xs text-[#888888] hover:text-[#5B8C5A] transition-colors"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Main CTA Button */}
                        <a
                            href="#cta"
                            onClick={(e) => onLinkClick(e, '#cta')}
                            className="group flex items-center justify-center gap-2 w-full py-3.5 bg-[#5B8C5A] hover:bg-[#4A7349] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#5B8C5A]/25"
                        >
                            <Sparkles className="w-4 h-4" />
                            Start Your Project
                            <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        {/* Trust Badge */}
                        <div className="mt-4 text-center">
                            <p className="text-xs text-[#888888]">
                                Free consultation • No obligation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}