import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master Your IT Skills with Real Challenges
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Join thousands of IT professionals improving their skills through practical challenges, 
                real-world scenarios, and interactive learning.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/register" 
                  className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/explore" 
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800/70 transition"
                >
                  Explore Challenges
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-[400px]">
                <Image
                  src="/hero-illustration.svg"
                  alt="Coding illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Seconcode?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index.toString()}
                className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-200"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Explore IT Domains</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index.toString()}
                href={`/challenges?category=${category.slug}`}
                className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-200"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold group-hover:text-emerald-600 text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index.toString()} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join our community of IT professionals and start improving your skills today.
          </p>
          <Link 
            href="/register" 
            className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: '🎯',
    title: 'Real-World Challenges',
    description: 'Practice with challenges based on actual industry scenarios and problems.'
  },
  {
    icon: '🚀',
    title: 'Learn by Doing',
    description: 'Interactive coding environment with immediate feedback and testing.'
  },
  {
    icon: '🏆',
    title: 'Track Progress',
    description: 'Monitor your improvement with detailed statistics and achievements.'
  },
  {
    icon: '👥',
    title: 'Community Support',
    description: 'Connect with other learners and share knowledge through our forum.'
  },
  {
    icon: '📈',
    title: 'Career Growth',
    description: 'Follow structured learning paths designed for career advancement.'
  },
  {
    icon: '🎮',
    title: 'Gamified Learning',
    description: 'Earn badges and climb the leaderboard as you solve challenges.'
  }
]

const categories = [
  { name: 'Development', icon: '💻', slug: 'development' },
  { name: 'Cyber Security', icon: '🔒', slug: 'security' },
  { name: 'QA Testing', icon: '🔍', slug: 'qa' },
  { name: 'Database', icon: '🗄️', slug: 'database' },
  { name: 'Cloud', icon: '☁️', slug: 'cloud' },
  { name: 'DevOps', icon: '⚙️', slug: 'devops' },
  { name: 'UI/UX', icon: '🎨', slug: 'ui-ux' },
  { name: 'Data Science', icon: '📊', slug: 'data-science' }
]

const stats = [
  { value: '10,000+', label: 'Active Users' },
  { value: '500+', label: 'Challenges' },
  { value: '8', label: 'IT Domains' },
  { value: '95%', label: 'Success Rate' }
]