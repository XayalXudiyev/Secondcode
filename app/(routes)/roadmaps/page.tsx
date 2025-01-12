'use client'

import { useState } from 'react'
import { Card, Row, Col, Typography, Tag, Progress, Steps, Button, Tooltip, Select } from 'antd'
import { 
  CodeOutlined,
  SecurityScanOutlined,
  BugOutlined,
  DatabaseOutlined,
  CloudOutlined,
  ToolOutlined,
  LayoutOutlined,
  CheckCircleOutlined,
  LockOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  TrophyOutlined
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Step } = Steps
const { Option } = Select

interface RoadmapStep {
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'locked' | 'available'
  duration: string
  resources: number
  challenges: number
  skills: string[]
}

interface Roadmap {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  description: string
  totalSteps: number
  completedSteps: number
  difficulty: string
  estimatedTime: string
  prerequisites?: string[]
  steps: RoadmapStep[]
}

const roadmaps: Roadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: <CodeOutlined />,
    color: '#3B82F6', // blue-500
    description: 'Master modern frontend development from basics to advanced concepts',
    totalSteps: 8,
    completedSteps: 3,
    difficulty: 'Beginner to Advanced',
    estimatedTime: '6-8 months',
    steps: [
      {
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the building blocks of web development',
        status: 'completed',
        duration: '2 weeks',
        resources: 12,
        challenges: 8,
        skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid']
      },
      {
        title: 'JavaScript Essentials',
        description: 'Master core JavaScript concepts and DOM manipulation',
        status: 'completed',
        duration: '4 weeks',
        resources: 15,
        challenges: 12,
        skills: ['JavaScript', 'ES6+', 'DOM', 'Async Programming']
      },
      {
        title: 'React Fundamentals',
        description: 'Build modern UIs with React',
        status: 'in-progress',
        duration: '6 weeks',
        resources: 20,
        challenges: 15,
        skills: ['React', 'Hooks', 'State Management', 'Router']
      },
      // More steps...
    ]
  },
  {
    id: 'security',
    title: 'Cyber Security',
    icon: <SecurityScanOutlined />,
    color: '#DC2626', // red-600
    description: 'Learn to protect systems and networks from cyber threats',
    totalSteps: 7,
    completedSteps: 0,
    difficulty: 'Intermediate to Advanced',
    estimatedTime: '8-10 months',
    prerequisites: ['Networking Basics', 'Linux Fundamentals'],
    steps: [
      {
        title: 'Security Fundamentals',
        description: 'Understanding basic security concepts and principles',
        status: 'available',
        duration: '3 weeks',
        resources: 10,
        challenges: 5,
        skills: ['Security Concepts', 'Cryptography Basics', 'Security Policies']
      },
      // More steps...
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    icon: <ToolOutlined />,
    color: '#7C3AED', // purple-600
    description: 'Master the art of DevOps and cloud infrastructure',
    totalSteps: 9,
    completedSteps: 0,
    difficulty: 'Intermediate to Expert',
    estimatedTime: '10-12 months',
    prerequisites: ['Linux Administration', 'Basic Programming'],
    steps: [
      {
        title: 'CI/CD Fundamentals',
        description: 'Learn continuous integration and deployment',
        status: 'locked',
        duration: '4 weeks',
        resources: 8,
        challenges: 6,
        skills: ['Git', 'Jenkins', 'Docker', 'Pipeline Design']
      },
      // More steps...
    ]
  },
  // Add more roadmaps...
]

export default function RoadmapsPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState(roadmaps[0])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined className="text-emerald-500" />
      case 'in-progress':
        return <ThunderboltOutlined className="text-blue-500" />
      case 'locked':
        return <LockOutlined className="text-gray-400" />
      default:
        return <RocketOutlined className="text-purple-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="text-white mb-2">
            Learning Roadmaps
          </Title>
          <Text className="text-gray-400">
            Follow structured learning paths to master different IT domains
          </Text>
        </div>

        {/* Roadmap Selection */}
        <Row gutter={[16, 16]} className="mb-8">
          {roadmaps.map(roadmap => (
            <Col xs={24} sm={12} md={8} lg={6} key={roadmap.id}>
              <Card 
                className={`bg-gray-800 border-gray-700 cursor-pointer transition-all ${
                  selectedRoadmap.id === roadmap.id ? 'border-2 border-emerald-500' : 'hover:border-gray-600'
                }`}
                onClick={() => setSelectedRoadmap(roadmap)}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${roadmap.color}20` }}
                  >
                    <span style={{ color: roadmap.color }}>{roadmap.icon}</span>
                  </div>
                  <div>
                    <Text className="text-white font-medium block">
                      {roadmap.title}
                    </Text>
                    <div className="flex items-center mt-1">
                      <Progress 
                        percent={Math.round((roadmap.completedSteps / roadmap.totalSteps) * 100)}
                        size="small"
                        showInfo={false}
                        strokeColor={roadmap.color}
                        trailColor="#374151"
                      />
                      <span className="text-gray-400 text-sm ml-2">
                        {roadmap.completedSteps}/{roadmap.totalSteps}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Selected Roadmap Details */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Title level={3} className="text-white mb-2">
                {selectedRoadmap.title}
              </Title>
              <Paragraph className="text-gray-400 mb-4">
                {selectedRoadmap.description}
              </Paragraph>
              <div className="flex flex-wrap gap-4">
                <Tag icon={<TrophyOutlined />} color="blue">
                  {selectedRoadmap.difficulty}
                </Tag>
                <Tag icon={<TrophyOutlined />} color="purple">
                  {selectedRoadmap.estimatedTime}
                </Tag>
                {selectedRoadmap.prerequisites?.map(prereq => (
                  <Tag key={prereq} color="orange">
                    Requires: {prereq}
                  </Tag>
                ))}
              </div>
            </div>
            <Button type="primary" className="bg-emerald-500 hover:bg-emerald-600">
              Start Learning
            </Button>
          </div>

          {/* Steps Timeline */}
          <Steps 
            direction="vertical" 
            current={selectedRoadmap.completedSteps}
            className="custom-steps"
          >
            {selectedRoadmap.steps.map((step, index) => (
              <Step
                key={index.toString()}
                title={
                  <div className="flex items-center justify-between">
                    <Text className="text-white">{step.title}</Text>
                    {getStatusIcon(step.status)}
                  </div>
                }
                description={
                  <div className="text-gray-400">
                    <p className="mb-2">{step.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {step.skills.map(skill => (
                        <Tag key={skill} className="mr-1 mb-1">
                          {skill}
                        </Tag>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span>🕒 {step.duration}</span>
                      <span>📚 {step.resources} resources</span>
                      <span>🎯 {step.challenges} challenges</span>
                    </div>
                  </div>
                }
              />
            ))}
          </Steps>
        </Card>
      </div>

      <style jsx global>{`
        .custom-steps .ant-steps-item-title {
          width: 100%;
        }
        .custom-steps .ant-steps-item-description {
          color: #9CA3AF !important;
        }
        .custom-steps .ant-steps-item-tail {
          background-color: #374151 !important;
        }
        .custom-steps .ant-steps-item-icon {
          background-color: #374151;
          border-color: #4B5563;
        }
        .custom-steps .ant-steps-item-finish .ant-steps-item-icon {
          background-color: #059669;
          border-color: #059669;
        }
        .custom-steps .ant-steps-item-process .ant-steps-item-icon {
          background-color: #3B82F6;
          border-color: #3B82F6;
        }
      `}</style>
    </div>
  )
} 