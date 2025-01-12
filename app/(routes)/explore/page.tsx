'use client'

import { useState } from 'react'
import { Card, Row, Col, Input, Select, Tag, Typography, Button, Tooltip, Badge } from 'antd'
import { 
  SearchOutlined, 
  FilterOutlined, 
  StarOutlined,
  TrophyOutlined,
  UserAddOutlined,
  UserOutlined,
  FireOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

// Mock data for challenges
const challenges = [
  {
    id: 1,
    title: 'SQL Injection Prevention',
    category: 'Security',
    difficulty: 'Medium',
    points: 100,
    completions: 1234,
    timeEstimate: '30 min',
    tags: ['SQL', 'Web Security', 'Backend'],
    description: 'Learn how to prevent SQL injection attacks in your applications.',
    isHot: true,
  },
  {
    id: 2,
    title: 'React Performance Optimization',
    category: 'Development',
    difficulty: 'Hard',
    points: 150,
    completions: 856,
    timeEstimate: '45 min',
    tags: ['React', 'Frontend', 'Performance'],
    description: 'Master advanced techniques for optimizing React applications.',
    isNew: true,
  },
  {
    id: 3,
    title: 'Docker Containerization',
    category: 'DevOps',
    difficulty: 'Easy',
    points: 75,
    completions: 2341,
    timeEstimate: '25 min',
    tags: ['Docker', 'DevOps', 'Containers'],
    description: 'Get started with Docker and learn container basics.',
    isPopular: true,
  },
  // Add more challenges...
]

const categories = [
  'All',
  'Development',
  'Security',
  'DevOps',
  'Database',
  'Cloud',
  'UI/UX',
  'QA Testing',
  'Data Science',
]

const difficulties = ['All', 'Easy', 'Medium', 'Hard']

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
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

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'All' || challenge.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <Title level={2} className="text-white mb-2">
          Explore Challenges
        </Title>
        <Text className="text-gray-400">
          Discover challenges across different domains and difficulty levels
        </Text>
      </div>

      {/* Filters */}
      <Card className="mb-8 bg-gray-800 border-gray-700">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Input
              placeholder="Search challenges..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Col>
          <Col xs={12} md={6}>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: '100%' }}
              className="bg-gray-700"
            >
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} md={6}>
            <Select
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
              style={{ width: '100%' }}
              className="bg-gray-700"
            >
              {difficulties.map(difficulty => (
                <Option key={difficulty} value={difficulty}>
                  {difficulty}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Challenges Grid */}
      <Row gutter={[16, 16]}>
        {filteredChallenges.map(challenge => (
          <Col xs={24} md={12} lg={8} key={challenge.id}>
            <Card 
              className="h-full bg-gray-800 border-gray-700 hover:border-emerald-500 transition-all"
              actions={[
                <Tooltip title="Points" key="points">
                  <div>
                    <StarOutlined /> {challenge.points}
                  </div>
                </Tooltip>,
                <Tooltip title="Completions" key="completions">
                  <div>
                    <TrophyOutlined /> {challenge.completions}
                  </div>
                </Tooltip>,
                <Tooltip title="Estimated Time" key="time">
                  <div>
                    <UserAddOutlined /> {challenge.timeEstimate}
                  </div>
                </Tooltip>,
              ]}
            >
              <div className="relative">
                {challenge.isHot && (
                  <Badge 
                    count={<FireOutlined style={{ color: '#fff' }} />}
                    style={{ backgroundColor: '#ff4d4f' }}
                    className="absolute -top-2 -right-2"
                  />
                )}
                {challenge.isNew && (
                  <Badge 
                    count="NEW"
                    style={{ backgroundColor: '#52c41a' }}
                    className="absolute -top-2 -right-2"
                  />
                )}
                <Title level={4} className="text-white mb-2">
                  {challenge.title}
                </Title>
                <Text className="text-gray-400 block mb-3">
                  {challenge.description}
                </Text>
                <div className="mb-4">
                  {challenge.tags.map(tag => (
                    <Tag key={tag} className="mr-1 mb-1">
                      {tag}
                    </Tag>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Tag color={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Tag>
                  <Button type="primary" className="bg-emerald-500 hover:bg-emerald-600">
                    Start Challenge
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
} 