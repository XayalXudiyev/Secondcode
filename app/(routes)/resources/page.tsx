'use client'

import { useState } from 'react'
import { Card, Row, Col, Input, Select, Tag, Typography, Button, Tabs, List, Avatar } from 'antd'
import { 
  SearchOutlined,
  BookOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  LinkOutlined,
  StarOutlined,
  DownloadOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TabPane } = Tabs

interface Resource {
  id: number
  title: string
  type: 'article' | 'video' | 'document' | 'link'
  category: string
  description: string
  author: string
  authorAvatar?: string
  publishDate: string
  tags: string[]
  likes: number
  views: number
  comments: number
  url: string
  duration?: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'Complete Guide to Web Security',
    type: 'article',
    category: 'Security',
    description: 'Learn about common web vulnerabilities and how to prevent them in your applications.',
    author: 'Sarah Chen',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    publishDate: '2024-02-01',
    tags: ['Security', 'Web Development', 'Best Practices'],
    likes: 245,
    views: 1520,
    comments: 32,
    url: '/resources/web-security-guide',
    difficulty: 'Intermediate'
  },
  {
    id: 2,
    title: 'React Performance Optimization',
    type: 'video',
    category: 'Frontend',
    description: 'Deep dive into React performance optimization techniques with practical examples.',
    author: 'Mike Wilson',
    authorAvatar: 'https://i.pravatar.cc/150?img=2',
    publishDate: '2024-01-28',
    tags: ['React', 'Performance', 'Frontend'],
    likes: 189,
    views: 890,
    comments: 24,
    url: '/resources/react-performance',
    duration: '45:20',
    difficulty: 'Advanced'
  },
  {
    id: 3,
    title: 'Docker for Beginners',
    type: 'document',
    category: 'DevOps',
    description: 'A comprehensive guide to getting started with Docker containerization.',
    author: 'Alex Johnson',
    authorAvatar: 'https://i.pravatar.cc/150?img=3',
    publishDate: '2024-01-25',
    tags: ['Docker', 'DevOps', 'Containers'],
    likes: 312,
    views: 2150,
    comments: 45,
    url: '/resources/docker-guide',
    difficulty: 'Beginner'
  },
]

const categories = ['All', 'Frontend', 'Backend', 'Security', 'DevOps', 'Database', 'Mobile']
const types = ['All Types', 'Articles', 'Videos', 'Documents', 'Links']
const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels')
  const [searchQuery, setSearchQuery] = useState('')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileTextOutlined className="text-blue-500" />
      case 'video':
        return <VideoCameraOutlined className="text-red-500" />
      case 'document':
        return <BookOutlined className="text-green-500" />
      case 'link':
        return <LinkOutlined className="text-purple-500" />
      default:
        return null
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'green'
      case 'Intermediate':
        return 'blue'
      case 'Advanced':
        return 'red'
      default:
        return 'default'
    }
  }

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
    const matchesType = selectedType === 'All Types' || resource.type === selectedType.toLowerCase().slice(0, -1)
    const matchesDifficulty = selectedDifficulty === 'All Levels' || resource.difficulty === selectedDifficulty
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesType && matchesDifficulty && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="text-white mb-2">
            Learning Resources
          </Title>
          <Text className="text-gray-400">
            Explore our curated collection of learning materials and documentation
          </Text>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <Input
                placeholder="Search resources..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </Col>
            <Col xs={24} md={16}>
              <div className="flex flex-wrap gap-4">
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  style={{ width: 150 }}
                  className="bg-gray-700"
                >
                  {categories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
                <Select
                  value={selectedType}
                  onChange={setSelectedType}
                  style={{ width: 150 }}
                  className="bg-gray-700"
                >
                  {types.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
                <Select
                  value={selectedDifficulty}
                  onChange={setSelectedDifficulty}
                  style={{ width: 150 }}
                  className="bg-gray-700"
                >
                  {difficulties.map(difficulty => (
                    <Option key={difficulty} value={difficulty}>{difficulty}</Option>
                  ))}
                </Select>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Resources List */}
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={filteredResources}
          renderItem={item => (
            <List.Item>
              <Card 
                className="bg-gray-800 border-gray-700 hover:border-emerald-500 transition-all h-full"
                actions={[
                  <div key="likes" className="text-gray-400">
                    <LikeOutlined /> {item.likes}
                  </div>,
                  <div key="views" className="text-gray-400">
                    <EyeOutlined /> {item.views}
                  </div>,
                  <div key="comments" className="text-gray-400">
                    <MessageOutlined /> {item.comments}
                  </div>,
                ]}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {getTypeIcon(item.type)}
                      <Text className="text-white ml-2 text-lg font-medium">
                        {item.title}
                      </Text>
                    </div>
                    {item.type === 'document' && (
                      <Button 
                        type="text" 
                        icon={<DownloadOutlined />}
                        className="text-gray-400 hover:text-white"
                      />
                    )}
                  </div>

                  <Paragraph className="text-gray-400 mb-4" ellipsis={{ rows: 2 }}>
                    {item.description}
                  </Paragraph>

                  <div className="mb-4">
                    {item.tags.map(tag => (
                      <Tag key={tag} className="mr-1 mb-1">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar src={item.authorAvatar} size="small" />
                        <Text className="text-gray-400 ml-2">{item.author}</Text>
                      </div>
                      <Tag color={getDifficultyColor(item.difficulty)}>
                        {item.difficulty}
                      </Tag>
                    </div>

                    <div className="flex justify-between items-center text-gray-500 text-sm">
                      <span>{item.publishDate}</span>
                      {item.duration && (
                        <span>{item.duration}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
} 