'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button, Card, Typography, message, Result } from 'antd'
import Link from 'next/link'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/types/auth'

const { Title, Text } = Typography

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true)
      console.log('Reset email requested for:', data.email)
      
      setIsEmailSent(true)
    } catch (error) {
      message.error('Failed to send reset email. Please try again.')
      console.error('Reset email error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <Result
            status="success"
            title="Reset Email Sent!"
            subTitle={
              <div className="text-center">
                <p className="mb-4">
                  We've sent password reset instructions to your email address.
                  Please check your inbox and spam folder.
                </p>
                <p className="text-sm text-gray-600">
                  Didn't receive the email?{' '}
                  <Button 
                    type="link" 
                    onClick={() => setIsEmailSent(false)}
                    className="p-0 text-emerald-600 hover:text-emerald-700"
                  >
                    Try again
                  </Button>
                </p>
              </div>
            }
            extra={[
              <Link key="login" href="/login">
                <Button 
                  type="primary"
                  size="large"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Return to Login
                </Button>
              </Link>
            ]}
          />
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Reset Password</Title>
          <Text className="text-gray-600">
            Enter your email address and we'll send you instructions to reset your password
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email Address"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Input
              {...register('email')}
              type="email"
              size="large"
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              Send Reset Instructions
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text className="text-gray-600">
              Remember your password?{' '}
              <Link 
                href="/login"
                className="text-emerald-600 hover:text-emerald-700"
              >
                Sign in
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  )
} 