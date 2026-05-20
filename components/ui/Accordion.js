'use client'

import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'

export default function Accordion({ items, className = '' }) {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <div className={`space-y-4 ${className}`}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-lg font-semibold pr-8">{item.question}</span>
                        <HiChevronDown
                            className={`transform transition-transform duration-300 flex-shrink-0 text-gray-400 ${openIndex === index ? 'rotate-180' : ''
                                }`}
                            size={24}
                        />
                    </button>

                    <div
                        className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            } overflow-hidden`}
                    >
                        <div className="px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}