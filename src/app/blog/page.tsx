import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - PCCS',
  description: 'Stay updated with the latest news, events, and stories from Punta Cana Christian School. Read about our community, achievements, and educational insights.',
  keywords: ['blog', 'news', 'events', 'stories', 'PCCS', 'updates'],
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-indigo-100 max-w-4xl mx-auto">
            Stay connected with the latest news, events, and stories from our PCCS community.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <svg
              className="w-24 h-24 mx-auto mb-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're working on bringing you inspiring stories, educational insights,
              and updates from our school community. Check back soon!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#1E1E8C' }}
              >
                Return Home
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                style={{ borderColor: '#1E1E8C', color: '#1E1E8C' }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter to be the first to know when we publish new content.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
                style={{ backgroundColor: '#1E1E8C' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
