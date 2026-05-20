// app/case-studies/[slug]/page.js
import { portfolioData } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateMetadata({ params }) {
    const resolvedParams = await params  // Await params first
    const slug = resolvedParams.slug
    const study = portfolioData.caseStudies.find(s => s.slug === slug)
    if (!study) return { title: 'Case Study Not Found' }

    return {
        title: `${study.title} - ${study.category} | Case Study`,
        description: study.result,
    }
}

export default async function CaseStudyPage({ params }) {
    const resolvedParams = await params  // Await params first
    const slug = resolvedParams.slug
    const study = portfolioData.caseStudies.find(s => s.slug === slug)

    if (!study) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 lg:px-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container-max">
                    <Link
                        href="/#case-studies"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
                    >
                        ← Back to Portfolio
                    </Link>

                    <div className="max-w-4xl">
                        <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">
                            {study.category}
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold mt-4 mb-6">{study.title}</h1>
                        <p className="text-xl text-gray-600 mb-12">{study.result}</p>

                        <div className="grid grid-cols-3 gap-8">
                            {study.metrics.map((metric) => (
                                <div key={metric.label}>
                                    <div className="text-4xl font-bold gradient-text">{metric.value}</div>
                                    <div className="text-sm text-gray-500 mt-2">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Image */}
            <section className="px-6 lg:px-20 py-12">
                <div className="container-max">
                    <img
                        src={study.image}
                        alt={study.title}
                        className="w-full rounded-3xl shadow-2xl"
                    />
                </div>
            </section>

            {/* The Story */}
            <section className="section-padding">
                <div className="container-max max-w-4xl">
                    <div className="grid gap-12">
                        <div className="bg-red-50 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-red-900 mb-4">The Nightmare Before</h2>
                            <p className="text-lg text-red-800">{study.nightmare}</p>
                        </div>

                        <div className="bg-yellow-50 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-yellow-900 mb-4">The Heroic Insight</h2>
                            <p className="text-lg text-yellow-800">{study.insight}</p>
                        </div>

                        <div className="bg-green-50 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-green-900 mb-4">The Unblocked After</h2>
                            <p className="text-lg text-green-800">{study.result}</p>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="mt-16 bg-gray-50 p-8 rounded-2xl">
                        <p className="text-xl text-gray-700 italic mb-6">
                            "{study.testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                            <img
                                src={study.testimonial.avatar}
                                alt={study.testimonial.author}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="font-semibold">{study.testimonial.author}</p>
                                <p className="text-sm text-gray-500">{study.testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-indigo-600">
                <div className="container-max text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Want similar results?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Let's discuss how we can transform your product
                    </p>
                    <Link
                        href="/#cta"
                        className="inline-block px-8 py-4 bg-white text-indigo-700 font-semibold rounded-full hover:bg-gray-100 transition-all"
                    >
                        Start Your Project
                    </Link>
                </div>
            </section>
        </div>
    )
}