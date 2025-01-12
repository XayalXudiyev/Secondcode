'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, Dropdown, Avatar, Badge } from 'antd'
import type { MenuProps } from 'antd'
import { 
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  TrophyOutlined,
  BookOutlined
} from '@ant-design/icons'

const Navbar = () => {
  const pathname = usePathname()
  const [isLoggedIn] = useState(true) // Bu değeri auth state'inden alacağız

  const navigationItems = [
    { label: 'Explore', href: '/explore' },
    { label: 'Challenges', href: '/challenges' },
    { label: 'Roadmaps', href: '/roadmaps' },
    { label: 'Resources', href: '/resources' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'FAQ', href: '/faq' },
  ]

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link href="/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'achievements',
      label: <Link href="/achievements">Achievements</Link>,
      icon: <TrophyOutlined />,
    },
    {
      key: 'settings',
      label: <Link href="/settings">Settings</Link>,
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  const notificationItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'New badge earned!',
      icon: <TrophyOutlined />,
    },
    {
      key: '2',
      label: 'Challenge completed',
      icon: <BookOutlined />,
    },
  ]

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Seconcode</span>
          </Link>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'text-white bg-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Dropdown 
                  menu={{ items: notificationItems }} 
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <Badge count={2} className="cursor-pointer">
                    <BellOutlined className="text-xl text-gray-300 hover:text-white" />
                  </Badge>
                </Dropdown>

                {/* User Menu */}
                <Dropdown 
                  menu={{ items: userMenuItems }} 
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <div className="flex items-center cursor-pointer">
                    <Avatar icon={<UserOutlined />} className="bg-emerald-500" />
                  </div>
                </Dropdown>
              </>
            ) : (
              <div className="space-x-2">
                <Link href="/login">
                  <Button type="link" className="text-gray-300 hover:text-white">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button type="primary" className="bg-emerald-500 hover:bg-emerald-600">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                type="text"
                icon={<MenuOutlined className="text-gray-300" />}
                className="hover:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 