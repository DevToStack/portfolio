// lib/data.js
export const portfolioData = {
    hero: {
        headline: "I help ambitious startups design products that users",
        highlightedWord: "love",
        subheadline: "Transforming complex problems into intuitive, delightful experiences. Product Designer & Creative Technologist based in San Francisco.",
        cta: {
            primary: "Book a Free Strategy Call",
            secondary: "View My Work"
        },
        stats: [
            { value: "5+", label: "Products Created" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "1+", label: "Years Experience" }
        ]
    },

    caseStudies: [
        {
            id: 1,
            slug: "sakeenaplaza",
            title: "Sakeena Plaza",
            category: "Full Stack Apartment Booking Platform",
            nightmare: "Building a complete apartment booking ecosystem required solving multiple challenges including secure authentication, real-time availability tracking, payment integration, and preventing overlapping bookings.",
            insight: "The project was designed around user convenience and scalability. Features like OTP authentication, live room availability, booking validation, Razorpay integration, and personalized dashboards were implemented to create a smooth booking experience.",
            result: "Developed a production-ready booking platform with secure transactions, dynamic apartment management, and an optimized user experience across devices.",
            metrics: [
                { label: "Core Features", value: "15+", icon: "⚡" },
                { label: "API Endpoints", value: "20+", icon: "🔗" },
                { label: "Authentication", value: "OTP + JWT", icon: "🔐" }
            ],
            testimonial: {
                quote: "This project demonstrates my ability to design and build a complete full-stack application from architecture planning to frontend experience and backend implementation.",
                author: "Mohammed Rabi",
                role: "Full Stack Developer",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=100"
            },
            image: "/images/sakeenaplaza.png",
            colors: ["#2563eb", "#60a5fa", "#bfdbfe"]
        },
        {
            id: 2,
            slug: "product-flipbook",
            title: "Interactive Product Flipbook",
            category: "Product Marketing Platform",
            nightmare: "Traditional PDF catalogs felt static and outdated, causing users to lose interest and making it difficult for businesses to showcase products in an engaging way.",
            insight: "Instead of treating a catalog as a simple document, the platform was designed as an interactive experience with realistic page flipping, smooth animations, responsive layouts, and dynamic content rendering.",
            result: "Delivered a custom product marketing solution that transformed product catalogs into an immersive browsing experience across desktop and mobile devices.",
            metrics: [
                { label: "Interactive Pages", value: "100+", icon: "📖" },
                { label: "Performance Gain", value: "+70%", icon: "⚡" },
                { label: "Device Support", value: "100%", icon: "📱" }
            ],
            testimonial: {
                quote: "The flipbook completely changed how we present our products. Instead of static catalogs, our customers now experience an interactive showcase that feels modern and engaging.",
                author: "Asif",
                role: "Business Owner",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=100"
            },
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
            colors: ["#f59e0b", "#fbbf24", "#fde68a"]
        },
        // {
        //     id: 3,
        //     slug: "eduspark-learning-platform",
        //     title: "EduSpark",
        //     category: "EdTech Gamification",
        //     nightmare: "Course completion rates were stuck at 12% despite high-quality content and expensive marketing",
        //     insight: "We implemented a 'knowledge tree' gamification system that made learning feel like unlocking achievements in a game",
        //     result: "Course completion skyrocketed to 78% and referral signups increased 5x",
        //     metrics: [
        //         { label: "Completion Rate", value: "+550%", icon: "🎓" },
        //         { label: "Referrals", value: "5x", icon: "🔄" },
        //         { label: "NPS Score", value: "72", icon: "💚" }
        //     ],
        //     testimonial: {
        //         quote: "Alex understood something our previous designers didn't - learning should be addictive. The gamification strategy was brilliant in its execution.",
        //         author: "Maya Patel",
        //         role: "Founder, EduSpark",
        //         avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
        //     },
        //     image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
        //     colors: ["#f59e0b", "#fbbf24", "#fde68a"]
        // }
    ],

    process: [
        {
            step: "01",
            title: "Deep Discovery",
            description: "We dive into your users' minds through shadow sessions and empathy mapping. No assumptions, only insights.",
            icon: "🔍",
            duration: "Week 1-2"
        },
        {
            step: "02",
            title: "Rapid Prototyping",
            description: "Within 5 days, you'll see an interactive prototype. Real pixels, real flows, real fast. Iteration starts here.",
            icon: "⚡",
            duration: "Week 3"
        },
        {
            step: "03",
            title: "Refine Together",
            description: "Weekly sprints with your team. We polish, test, and perfect until it's not just good, but unforgettable.",
            icon: "✨",
            duration: "Week 4-8"
        }
    ],

    faq: [
        {
            question: "How much does a typical project cost?",
            answer: "Projects typically range from $15K-$50K depending on scope. However, my clients see an average 5x ROI within 6 months. I offer flexible payment plans and milestone-based billing."
        },
        {
            question: "What if you haven't worked in our industry before?",
            answer: "Actually, that's often an advantage. I bring fresh patterns from adjacent industries that your competitors haven't discovered yet. My best innovations come from cross-pollinating ideas."
        },
        {
            question: "How quickly can we launch?",
            answer: "For urgent needs, I offer a 2-week 'MVP Sprint' package where we go from concept to launched product. For full-scale projects, typical timeline is 8-12 weeks."
        },
        {
            question: "Do you work solo or with a team?",
            answer: "I lead every project personally, but have a network of specialized developers, illustrators, and copywriters I bring in as needed. You get senior attention without the agency overhead."
        }
    ],

    authority: [
        {
            title: "Building a Full-Stack Apartment Booking Platform from Scratch",
            description: "How I designed secure authentication, real-time availability checks, booking validation, and payment integration for a scalable booking experience.",
            readTime: "7 min read",
            link: "#"
        },
        {
            title: "Creating an Interactive Product Flipbook for Modern Marketing",
            description: "Turning traditional catalogs into immersive digital experiences using smooth animations, page transitions, and responsive design principles.",
            readTime: "6 min read",
            link: "#"
        },
        {
            title: "Designing Fast and Scalable User Experiences in Next.js",
            description: "Techniques I used to improve performance, optimize rendering, and build highly responsive interfaces for modern web applications.",
            readTime: "9 min read",
            link: "#"
        }
    ],

    personalWork: [
        {
            title: "Cyberpunk UI Experiments",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600",
            description: "Exploring neon-drenched interfaces for futuristic applications"
        },
        {
            title: "Minimalist Icon Set",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600",
            description: "A personal project: 100 icons in 100 days"
        },
        {
            title: "3D Dashboard Concept",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
            description: "Pushing boundaries of data visualization"
        }
    ],

    cta: {
        headline: "Let's Build Something People Love",
        subheadline: "Stop losing users to poor design. Start creating experiences they can't stop talking about.",
        buttonText: "Start Your Project Today",
        secondaryText: "Or download my free guide: '10 Questions to Ask Before Hiring a Designer'"
    }
}

export const navigationLinks = [
    { label: 'Work', href: '#case-studies' },
    { label: 'Process', href: '#process' },
    { label: 'Insights', href: '#authority' },
    { label: 'Projects', href: '#personal-work' },
    { label: 'FAQ', href: '#faq' },
]