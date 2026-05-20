import AdminClientLayout from "./AdminClientLayout"

// app/admin/layout.js (Server Component)
export const metadata = {
    title: 'Admin Dashboard - Portfolio Tracker',
    robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }) {
    return <AdminClientLayout>{children}</AdminClientLayout>
}