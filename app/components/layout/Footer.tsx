'use client'

import Link from 'next/link'
import { Typography, Divider } from 'antd'
import { 
  GithubOutlined, 
  TwitterOutlined, 
  LinkedinOutlined 
} from '@ant-design/icons'

const { Title, Text } = Typography

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <h4 className="text-white text-lg font-bold mb-4">
              Seconcode
            </h4>
            <p className="text-gray-400">
              Interactive platform for IT professionals and students to improve their technical skills through challenges and real-world scenarios.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white text-lg font-bold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-white text-lg font-bold mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/documentation" className="text-gray-400 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/roadmaps" className="text-gray-400 hover:text-white">
                  Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="text-gray-400 hover:text-white">
                  Challenges
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-gray-400 hover:text-white">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="text-white text-lg font-bold mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {currentYear} Seconcode. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="https://github.com" target="_blank" className="text-gray-400 hover:text-white">
              <GithubOutlined className="text-xl" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white">
              <TwitterOutlined className="text-xl" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white">
              <LinkedinOutlined className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 