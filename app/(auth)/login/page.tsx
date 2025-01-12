'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button, Card, Typography, message, Checkbox } from 'antd'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { loginSchema, type LoginFormData } from '@/types/auth'

const { Title, Text } = Typography

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: searchParams.get('email') || '',
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', data.email)
      }
      
      message.success('Login successful!')
      router.push('/profile')
    } catch (error) {
      message.error('Login failed. Please try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return null // veya loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Welcome back</Title>
          <Text className="text-gray-600">
            Sign in to continue your learning journey
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

          <Form.Item
            label="Password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Input.Password
              {...register('password')}
              size="large"
              placeholder="Enter your password"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link 
              href="/forgot-password"
              className="text-emerald-600 hover:text-emerald-700 text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              Sign in
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/register"
                className="text-emerald-600 hover:text-emerald-700"
              >
                Register
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  )
} 