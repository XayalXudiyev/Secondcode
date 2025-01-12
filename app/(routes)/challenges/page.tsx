'use client'

import { useState } from 'react'
import { Card, Row, Col, Input, Select, Progress, Tag, Typography, Button, Tabs, Badge } from 'antd'
import { 
  SearchOutlined,
  TrophyOutlined,
  StarOutlined,
  UserOutlined,
  FireOutlined,
  LockOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Option } = Select

// Mock data
const challenges = [
  {
    id: 1,
    title: 'Build a Secure API',
    category: 'Backend',
    difficulty: 'Hard',
    points: 150,
    estimatedTime: '2 hours',
    completionRate: 68,
    participants: 1234,
    tags: ['Node.js', 'Security', 'REST API'],
    status: 'locked',
    prerequisites: ['Basic API Challenge', 'Authentication Basics'],
    description: 'Create a secure REST API with authentication, rate limiting, and input validation.',
  },
  {
    id: 2,
    title: 'React State Management',
    category: 'Frontend',
    difficulty: 'Medium',
    points: 100,
    estimatedTime: '1.5 hours',
    completionRate: 75,
    participants: 2156,
    tags: ['React', 'Redux', 'State Management'],
    status: 'available',
    description: 'Learn advanced state management techniques in React applications.',
  },
  {
    id: 3,
    title: 'SQL Injection Prevention',
    category: 'Security',
    difficulty: 'Medium',
    points: 120,
    estimatedTime: '1 hour',
    completionRate: 82,
    participants: 1876,
    tags: ['SQL', 'Security', 'Database'],
    status: 'completed',
    description: 'Master techniques to prevent SQL injection attacks in your applications.',
  },
  // Add more challenges...
]

const categories = ['All', 'Frontend', 'Backend', 'Security', 'DevOps', 'Database', 'Mobile']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']
const sortOptions = ['Newest', 'Most Popular', 'Highest Points', 'Completion Rate']

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState('available')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [searchQuery, setSearchQuery] = useState('')

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'green'
      case 'Medium':
        return 'orange'
      case 'Hard':
        return 'red'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'locked':
        return <LockOutlined className="text-gray-400" />
      case 'completed':
        return <CheckCircleOutlined className="text-emerald-500" />
      default:
        return null
    }
  }

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'All' || challenge.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || challenge.status === activeTab
    
    return matchesCategory && matchesDifficulty && matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="text-white mb-2">
            Challenges
          </Title>
          <Text className="text-gray-400">
            Test your skills with real-world coding challenges
          </Text>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={6}>
              <Input
                placeholder="Search challenges..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </Col>
            <Col xs={12} md={4}>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: '100%' }}
                className="bg-gray-700"
              >
                {categories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={12} md={4}>
              <Select
                value={selectedDifficulty}
                onChange={setSelectedDifficulty}
                style={{ width: '100%' }}
                className="bg-gray-700"
              >
                {difficulties.map(difficulty => (
                  <Option key={difficulty} value={difficulty}>{difficulty}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: '100%' }}
                className="bg-gray-700"
              >
                {sortOptions.map(option => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Tabs */}
        <Tabs 
          activeKey={activeTab}
          onChange={setActiveTab}
          className="text-white"
        >
          <TabPane tab="All Challenges" key="all" />
          <TabPane tab="Available" key="available" />
          <TabPane tab="In Progress" key="in-progress" />
          <TabPane tab="Completed" key="completed" />
          <TabPane tab="Locked" key="locked" />
        </Tabs>

        {/* Challenges Grid */}
        <Row gutter={[16, 16]}>
          {filteredChallenges.map(challenge => (
            <Col xs={24} md={12} lg={8} key={challenge.id}>
              <Card 
                className="h-full bg-gray-800 border-gray-700 hover:border-emerald-500 transition-all"
                title={
                  <div className="flex items-center justify-between">
                    <span className="text-white">{challenge.title}</span>
                    {getStatusIcon(challenge.status)}
                  </div>
                }
              >
                <div>
                  <p className="text-gray-400 mb-4">{challenge.description}</p>
                  
                  <div className="mb-4">
                    {challenge.tags.map(tag => (
                      <Tag key={tag} className="mr-1 mb-1">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <Tag color={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Tag>
                    <div className="flex items-center space-x-2">
                      <StarOutlined />
                      <span className="text-emerald-500">{challenge.points} pts</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-gray-400 text-sm mb-1">
                      <span>Completion Rate</span>
                      <span>{challenge.completionRate}%</span>
                    </div>
                    <Progress 
                      percent={challenge.completionRate} 
                      showInfo={false}
                      strokeColor="#10b981"
                      trailColor="#374151"
                    />
                  </div>

                  <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
                    <div>
                      {challenge.estimatedTime}
                    </div>
                    <div>
                      <UserOutlined className="mr-1" />
                      {challenge.participants} participants
                    </div>
                  </div>

                  <Button 
                    type="primary" 
                    className="w-full bg-emerald-500 hover:bg-emerald-600"
                    disabled={challenge.status === 'locked'}
                  >
                    {challenge.status === 'completed' ? 'View Solution' : 
                     challenge.status === 'locked' ? 'Complete Prerequisites' : 
                     'Start Challenge'}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
} 