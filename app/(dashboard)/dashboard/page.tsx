'use client'

import { Card, Row, Col, Typography, Statistic } from 'antd'

const { Title } = Typography

export default function DashboardPage() {
  return (
    <div className="p-6">
      <Title level={2} className="mb-6">Welcome to Your Dashboard</Title>
      
      {/* Stats Overview */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Challenges"
              value={42}
              suffix="/ 150"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Current Streak"
              value={7}
              suffix="days"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Points"
              value={1250}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Global Rank"
              value={156}
              suffix="/ 10k"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity & Recommendations */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Activity" className="mb-6">
            <p>You completed "SQL Injection Prevention" challenge</p>
            <p>You earned the "Week Streak" badge</p>
            <p>You started "React Performance" challenge</p>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Recommended Challenges">
            <p>Advanced API Security</p>
            <p>Docker Containerization</p>
            <p>GraphQL Fundamentals</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
} 