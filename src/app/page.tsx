// src/app/page.tsx
// import Image from "next/image";

export default function CollectionHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 font-sans">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          {/*  <Image
            src="/logo.svg"
            alt="Collection Home Logo"
            width={40}
            height={40}
          /> */}
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Collection Home
          </span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="#features" className="hover:text-gray-900 dark:hover:text-white">
            Features
          </a>
          <a href="#api" className="hover:text-gray-900 dark:hover:text-white">
            API Docs
          </a>
          <a href="#contact" className="hover:text-gray-900 dark:hover:text-white">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Welcome to <span className="text-blue-600 dark:text-blue-400">Collection Home API</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Manage, track, and analyze your collections easily.
          Secure and developer-friendly endpoints for seamless integration.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            /*   href="/api/unpaid" */
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            View Unpaid Members
          </a>
          <a
            href="#api"
            className="px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Explore API Docs
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-8 py-16 grid gap-12 md:grid-cols-3 text-center">
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🔒 Secure API
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            All endpoints protected by authentication and role-based access.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            ⚡ Fast & Scalable
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Designed with performance and scalability for enterprise-grade use.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            📊 Insights Ready
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Get actionable insights from your collection data with analytics endpoints.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="w-full border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} Collection Home API — Built with Next.js
        </p>
        <p className="mt-2">
          <a href="mailto:mail@legozia.com" className="hover:underline">
            support@legozia.com
          </a>
        </p>
      </footer>
    </div>
  );
}
