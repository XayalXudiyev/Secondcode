'use client'

import { useState } from 'react'
import { Card, Row, Col, Table, Avatar, Tag, Typography, Select, Button, Tabs, Progress } from 'antd'
import { 
  TrophyOutlined,
  StarOutlined,
  FireOutlined,
  UserOutlined,
  RiseOutlined,
  GlobalOutlined,
  TeamOutlined,
  
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text } = Typography
const { Option } = Select
const { TabPane } = Tabs

interface UserRank {
  rank: number
  name: string
  avatar?: string
  points: number
  solved: number
  streak: number
  badges: number
  level: number
  progress: number
  change: 'up' | 'down' | 'same'
  changeAmount?: number
  tags: string[]
}

// Mock data
const users: UserRank[] = [
  {
    rank: 1,
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    points: 15420,
    solved: 142,
    streak: 23,
    badges: 15,
    level: 42,
    progress: 75,
    change: 'same',
    tags: ['Full Stack', 'Security Expert'],
  },
  {
    rank: 2,
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    points: 14850,
    solved: 136,
    streak: 45,
    badges: 12,
    level: 38,
    progress: 90,
    change: 'up',
    changeAmount: 2,
    tags: ['Frontend Master', 'UI/UX'],
  },
  {
    rank: 3,
    name: 'Mike Williams',
    avatar: 'https://i.pravatar.cc/150?img=3',
    points: 14200,
    solved: 128,
    streak: 15,
    badges: 10,
    level: 35,
    progress: 60,
    change: 'down',
    changeAmount: 1,
    tags: ['Backend Dev', 'Database'],
  },
  // Add more users...
]

const timeRanges = ['All Time', 'This Month', 'This Week', 'Today']
const categories = ['Overall', 'Frontend', 'Backend', 'Security', 'DevOps']

export default function LeaderboardPage() {
  const [timeRange, setTimeRange] = useState('All Time')
  const [category, setCategory] = useState('Overall')

  const columns: ColumnsType<UserRank> = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      width: 80,
      render: (rank: number) => (
        <div className="flex items-center">
          {rank <= 3 ? (
            <TrophyOutlined className={`text-xl ${
              rank === 1 ? 'text-yellow-500' :
              rank === 2 ? 'text-gray-400' :
              'text-amber-700'
            }`} />
          ) : rank}
        </div>
      ),
    },
    {
      title: 'User',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar 
            src={record.avatar}
            icon={!record.avatar && <UserOutlined />}
            className="bg-emerald-500"
          />
          <div>
            <div className="font-medium text-white">{record.name}</div>
            <div className="text-xs text-gray-400">
              Level {record.level} • {record.progress}% to next level
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Points',
      dataIndex: 'points',
      sorter: (a, b) => a.points - b.points,
      render: (points: number, record) => (
        <div>
          <div className="text-emerald-500 font-medium">{points.toLocaleString()}</div>
          <div className="text-xs text-gray-400 flex items-center">
            {record.change === 'up' && <RiseOutlined className="text-green-500 mr-1" />}
            {record.change === 'down' && <RiseOutlined className="text-red-500 mr-1 rotate-180" />}
            {record.changeAmount && (
              <span className={record.change === 'up' ? 'text-green-500' : 'text-red-500'}>
                {record.change === 'up' ? '+' : '-'}{record.changeAmount} positions
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Challenges',
      dataIndex: 'solved',
      sorter: (a, b) => a.solved - b.solved,
      render: (solved: number) => (
        <div className="text-gray-300">{solved}</div>
      ),
    },
    {
      title: 'Streak',
      dataIndex: 'streak',
      render: (streak: number) => (
        <div className="flex items-center text-orange-500">
          <FireOutlined className="mr-1" />
          {streak} days
        </div>
      ),
    },
    {
      title: 'Badges',
      dataIndex: 'badges',
      render: (badges: number) => (
        <div className="flex items-center text-yellow-500">
          <StarOutlined className="mr-1" />
          {badges}
        </div>
      ),
    },
    {
      title: 'Expertise',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <Tag key={tag} className="text-xs">
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="text-white mb-2">
            Leaderboard
          </Title>
          <Text className="text-gray-400">
            See how you rank among other developers
          </Text>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-400 block">Your Rank</Text>
                  <Title level={3} className="text-white m-0">
                    #156
                  </Title>
                </div>
                <GlobalOutlined className="text-2xl text-emerald-500" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-400 block">Total Points</Text>
                  <Title level={3} className="text-white m-0">
                    8,542
                  </Title>
                </div>
                <StarOutlined className="text-2xl text-yellow-500" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-400 block">Current Streak</Text>
                  <Title level={3} className="text-white m-0">
                    7 days
                  </Title>
                </div>
                <FireOutlined className="text-2xl text-orange-500" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-800 border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-400 block">Your Level</Text>
                  <Title level={3} className="text-white m-0">
                    25
                  </Title>
                </div>
                <TeamOutlined className="text-2xl text-blue-500" />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <div className="flex flex-wrap gap-4">
            <Select
              value={timeRange}
              onChange={setTimeRange}
              style={{ width: 200 }}
              className="bg-gray-700"
            >
              {timeRanges.map(range => (
                <Option key={range} value={range}>{range}</Option>
              ))}
            </Select>
            <Select
              value={category}
              onChange={setCategory}
              style={{ width: 200 }}
              className="bg-gray-700"
            >
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </div>
        </Card>

        {/* Leaderboard Table */}
        <Card className="bg-gray-800 border-gray-700">
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ pageSize: 10 }}
            className="leaderboard-table"
            rowClassName="bg-gray-800 hover:bg-gray-700"
          />
        </Card>
      </div>

      <style jsx global>{`
        .leaderboard-table .ant-table {
          background: transparent;
          color: white;
        }
        .leaderboard-table .ant-table-thead > tr > th {
          background: #374151;
          color: white;
          border-bottom: 1px solid #4B5563;
        }
        .leaderboard-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #4B5563;
        }
        .leaderboard-table .ant-table-tbody > tr:hover > td {
          background: #374151 !important;
        }
        .leaderboard-table .ant-pagination-item {
          background: #374151;
          border-color: #4B5563;
        }
        .leaderboard-table .ant-pagination-item a {
          color: white;
        }
        .leaderboard-table .ant-pagination-item-active {
          border-color: #10b981;
        }
      `}</style>
    </div>
  )
} 