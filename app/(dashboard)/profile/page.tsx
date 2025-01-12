'use client'

import { useState, useEffect } from 'react'
import { Card, Row, Col, Typography, Avatar, Tabs, Button, List, Tag, Progress, Statistic } from 'antd'
import { 
  UserOutlined, 
  TrophyOutlined, 
  HistoryOutlined, 
  CodeOutlined,
  FireOutlined,
  StarOutlined,
  BarChartOutlined,
  EditOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setUserEmail(localStorage.getItem('userEmail') || 'user@example.com')
    }
  }, [])

  // Mock user data
  const user = {
    name: 'John Doe',
    email: userEmail,
    joinDate: 'January 2024',
    bio: 'Full Stack Developer | Security Enthusiast',
    level: 25,
    xp: 2500,
    nextLevelXp: 3000,
    rank: '#156',
    totalPoints: 12500,
    challengesSolved: 42,
    currentStreak: 7,
    longestStreak: 15,
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      website: 'https://portfolio.com'
    },
    achievements: [
      { name: 'First Challenge', description: 'Completed your first challenge', date: '2024-01-15', icon: <CodeOutlined /> },
      { name: 'Week Streak', description: 'Maintained a 7-day streak', date: '2024-01-20', icon: <FireOutlined /> },
      { name: 'Problem Solver', description: 'Solved 10 challenges', date: '2024-01-25', icon: <StarOutlined /> },
    ],
    recentActivity: [
      { type: 'challenge', name: 'SQL Injection Prevention', status: 'Completed', date: '2024-02-01', points: 100 },
      { type: 'badge', name: 'Security Expert', status: 'Earned', date: '2024-01-28', points: 500 },
      { type: 'challenge', name: 'React Performance', status: 'In Progress', date: '2024-01-25', points: 0 },
    ],
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'Python', level: 75 },
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 80 },
      { name: 'SQL', level: 70 },
      { name: 'Security', level: 65 }
    ]
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Profile Header */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <Row gutter={24} align="middle">
          <Col>
            <div className="relative">
              <Avatar size={120} icon={<UserOutlined />} className="bg-emerald-600" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-sm">
                Lvl {user.level}
              </div>
            </div>
          </Col>
          <Col flex="1">
            <div className="flex justify-between items-start">
              <div>
                <Title level={2} className="mb-0 text-white">{user.name}</Title>
                <Text className="text-gray-400 block">{user.email}</Text>
                <Text className="text-gray-500">Member since {user.joinDate}</Text>
                <Paragraph className="text-gray-300 mt-2">{user.bio}</Paragraph>
              </div>
              <div className="flex gap-2">
                <Button type="link" icon={<GithubOutlined />} href={user.socialLinks.github} target="_blank" />
                <Button type="link" icon={<LinkedinOutlined />} href={user.socialLinks.linkedin} target="_blank" />
                <Button type="link" icon={<GlobalOutlined />} href={user.socialLinks.website} target="_blank" />
              </div>
            </div>
            <div className="mt-4">
              <Progress 
                percent={Math.round((user.xp / user.nextLevelXp) * 100)} 
                format={() => `${user.xp}/${user.nextLevelXp} XP`}
                strokeColor="#10b981"
              />
            </div>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Edit Profile
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card className="bg-gray-800 border-gray-700">
            <Statistic 
              title={<span className="text-gray-400">Rank</span>}
              value={user.rank}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="bg-gray-800 border-gray-700">
            <Statistic 
              title={<span className="text-gray-400">Total Points</span>}
              value={user.totalPoints}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="bg-gray-800 border-gray-700">
            <Statistic 
              title={<span className="text-gray-400">Challenges Solved</span>}
              value={user.challengesSolved}
              prefix={<CodeOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="bg-gray-800 border-gray-700">
            <Statistic 
              title={<span className="text-gray-400">Current Streak</span>}
              value={user.currentStreak}
              suffix={` / ${user.longestStreak}`}
              prefix={<FireOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card className="bg-gray-800 border-gray-700">
        <Tabs 
          defaultActiveKey="skills"
          className="text-gray-300"
        >
          <TabPane 
            tab={<span><BarChartOutlined /> Skills</span>}
            key="skills"
          >
            <Row gutter={[16, 16]}>
              {user.skills.map(skill => (
                <Col key={skill.name} xs={24} sm={12} md={8}>
                  <Card className="bg-gray-700 border-gray-600">
                    <div className="mb-2 flex justify-between">
                      <Text className="text-gray-200">{skill.name}</Text>
                      <Text className="text-emerald-500">{skill.level}%</Text>
                    </div>
                    <Progress 
                      percent={skill.level} 
                      showInfo={false}
                      strokeColor="#10b981"
                      trailColor="#374151"
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane 
            tab={<span><TrophyOutlined /> Achievements</span>}
            key="achievements"
          >
            <List
              itemLayout="horizontal"
              dataSource={user.achievements}
              renderItem={item => (
                <List.Item className="border-gray-700">
                  <List.Item.Meta
                    avatar={<div className="text-2xl text-emerald-500">{item.icon}</div>}
                    title={<Text className="text-gray-200">{item.name}</Text>}
                    description={<Text className="text-gray-400">{item.description}</Text>}
                  />
                  <Text className="text-gray-500">{item.date}</Text>
                </List.Item>
              )}
            />
          </TabPane>
          
          <TabPane 
            tab={<span><HistoryOutlined /> Recent Activity</span>}
            key="activity"
          >
            <List
              itemLayout="horizontal"
              dataSource={user.recentActivity}
              renderItem={item => (
                <List.Item className="border-gray-700">
                  <List.Item.Meta
                    title={<Text className="text-gray-200">{item.name}</Text>}
                    description={
                      <Text className="text-gray-400">
                        {`${item.type.charAt(0).toUpperCase() + item.type.slice(1)} - ${item.status}`}
                      </Text>
                    }
                  />
                  <div className="text-right">
                    <Text className="text-emerald-500 block">
                      {item.points > 0 ? `+${item.points} points` : ''}
                    </Text>
                    <Text className="text-gray-500">{item.date}</Text>
                  </div>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
} 