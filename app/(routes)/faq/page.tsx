'use client'

import { useState } from 'react'
import { Typography, Collapse, Input, Card, Tag } from 'antd'
import { 
  SearchOutlined,
  QuestionCircleOutlined,
  BookOutlined,
  SecurityScanOutlined,
  DollarOutlined,
  TeamOutlined,
  ToolOutlined,
  TrophyOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Panel } = Collapse
const { Search } = Input

interface FAQCategory {
  name: string
  icon: React.ReactNode
  color: string
  questions: {
    question: string
    answer: string | React.ReactNode
    tags?: string[]
  }[]
}

const faqCategories: FAQCategory[] = [
  {
    name: 'Getting Started',
    icon: <BookOutlined />,
    color: '#3B82F6', // blue-500
    questions: [
      {
        question: 'What is Seconcode?',
        answer: 'Seconcode is an interactive learning platform designed for IT professionals and students to improve their technical skills through practical challenges and real-world scenarios.',
        tags: ['Basics', 'Platform']
      },
      {
        question: 'How do I get started?',
        answer: 'Sign up for a free account, complete your profile, and start with beginner-friendly challenges. Follow the recommended learning paths based on your interests and skill level.',
        tags: ['Account', 'Beginners']
      },
      {
        question: 'Is Seconcode suitable for beginners?',
        answer: 'Yes! We offer content for all skill levels, from beginner to advanced. Start with our fundamentals section and progress at your own pace.',
        tags: ['Beginners', 'Learning Path']
      }
    ]
  },
  {
    name: 'Security & Privacy',
    icon: <SecurityScanOutlined />,
    color: '#DC2626', // red-600
    questions: [
      {
        question: 'How is my data protected?',
        answer: 'We use industry-standard encryption and security measures to protect your data. Your personal information is never shared without your consent.',
        tags: ['Privacy', 'Security']
      },
      {
        question: 'Are the challenges safe to practice?',
        answer: 'Yes, all security challenges are conducted in isolated environments. You can practice safely without risk to your system.',
        tags: ['Challenges', 'Safety']
      }
    ]
  },
  {
    name: 'Pricing & Plans',
    icon: <DollarOutlined />,
    color: '#059669', // emerald-600
    questions: [
      {
        question: 'Is Seconcode free to use?',
        answer: 'We offer both free and premium content. Many challenges and resources are available for free, while premium features provide additional benefits.',
        tags: ['Pricing', 'Features']
      },
      {
        question: 'What\'s included in premium membership?',
        answer: (
          <div>
            Premium members get access to:
            <ul className="list-disc pl-5 mt-2">
              <li>Advanced challenges</li>
              <li>Exclusive learning paths</li>
              <li>Priority support</li>
              <li>Certificate of completion</li>
              <li>Team collaboration features</li>
            </ul>
          </div>
        ),
        tags: ['Premium', 'Features']
      }
    ]
  },
  {
    name: 'Community & Support',
    icon: <TeamOutlined />,
    color: '#7C3AED', // purple-600
    questions: [
      {
        question: "How can I get help if I'm stuck?",
        answer: 'You can ask questions in our community forum, join discussion groups, or contact our support team. Premium members also get access to priority support.',
        tags: ['Support', 'Community']
      },
      {
        question: 'Can I contribute to the platform?',
        answer: 'Yes! We welcome community contributions. You can create challenges, write tutorials, or help other learners in the forum.',
        tags: ['Contribution', 'Community']
      }
    ]
  },
  {
    name: 'Technical Issues',
    icon: <ToolOutlined />,
    color: '#F59E0B', // amber-500
    questions: [
      {
        question: 'What browsers are supported?',
        answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome.',
        tags: ['Technical', 'Browser']
      },
      {
        question: "Why isn't my code submission working?",
        answer: "Check that your code meets all requirements and test cases. Make sure you're using supported language versions and following the challenge guidelines.",
        tags: ['Challenges', 'Troubleshooting']
      }
    ]
  },
  {
    name: 'Achievements & Certification',
    icon: <TrophyOutlined />,
    color: '#EC4899', // pink-500
    questions: [
      {
        question: 'How do I earn badges and certificates?',
        answer: 'Complete challenges, maintain streaks, and achieve learning milestones to earn badges. Certificates are awarded upon completing specific learning paths.',
        tags: ['Achievements', 'Certification']
      },
      {
        question: 'Are certificates recognized by employers?',
        answer: 'Our certificates demonstrate practical skills and are recognized by many employers. They showcase your ability to solve real-world problems.',
        tags: ['Certification', 'Career']
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.answer?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Title level={2} className="text-white mb-2">
            Frequently Asked Questions
          </Title>
          <Text className="text-gray-400">
            Find answers to common questions about Seconcode
          </Text>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <Search
            placeholder="Search questions..."
            prefix={<SearchOutlined />}
            allowClear
            size="large"
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-gray-800"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredCategories.map(category => (
            <Card 
              key={category.name}
              className="bg-gray-800 border-gray-700"
              title={
                <div className="flex items-center space-x-2">
                  <div 
                    className="p-2 rounded"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <span style={{ color: category.color }}>{category.icon}</span>
                  </div>
                  <span className="text-white">{category.name}</span>
                </div>
              }
            >
              <Collapse 
                ghost
                className="faq-collapse"
              >
                {category.questions.map((q, index) => (
                  <Panel
                    key={index}
                    header={
                      <div className="text-white flex items-center">
                        <QuestionCircleOutlined className="mr-2" />
                        {q.question}
                      </div>
                    }
                  >
                    <div className="text-gray-300 mb-4">
                      {q.answer}
                    </div>
                    {q.tags && (
                      <div className="flex flex-wrap gap-2">
                        {q.tags.map(tag => (
                          <Tag key={tag} color="blue">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </Panel>
                ))}
              </Collapse>
            </Card>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .faq-collapse .ant-collapse-header {
          padding: 12px 0 !important;
        }
        .faq-collapse .ant-collapse-content-box {
          padding: 0 16px 16px 32px !important;
        }
        .faq-collapse .ant-collapse-arrow {
          color: #6B7280 !important;
        }
      `}</style>
    </div>
  )
} 