'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerSchema, type RegisterFormData } from '@/types/auth'

const { Title, Text } = Typography

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const checkExistingUser = async (email: string) => {
    try {
      // Here you would make your API call to check if user exists
      // const response = await checkUser(email)
      // For now, let's simulate an API call
      const userExists = false // This would come from your API
      return userExists
    } catch (error) {
      console.error('Error checking user:', error)
      return false
    }
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true)
      
      // Check if user already exists
      const userExists = await checkExistingUser(data.email)
      
      // if (userExists) {
      //   message.info('An account with this email already exists. Please sign in.')
      //   router.push(`/login?email=${encodeURIComponent(data.email)}`)
      //   return
      // }

      // Here you would make your API call to register
      // const response = await registerUser(data)
      console.log('Registration data:', data)
      
      message.success('Registration successful! Please log in.')
      // router.push('/login')
    } catch (error) {
      message.error('Registration failed. Please try again.')
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Check email as user types
  const handleEmailBlur = async () => {
    const email = getValues('email')
    if (email && !errors.email) {
      const userExists = await checkExistingUser(email)
      if (userExists) {
        message.info(
          <span>
            An account with this email already exists.{' '}
            {/* <Link href={`/login?email=${encodeURIComponent(email)}`} className="text-emerald-600 hover:text-emerald-700">
              Sign in instead
            </Link> */}
          </span>
        )
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Create your account</Title>
          <Text className="text-gray-600">
            Join Seconcode and start your learning journey
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item 
            label="Full Name"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
          >
            <Input
              {...register('name')}
              size="large"
              placeholder="Enter your full name"
            />
          </Form.Item>

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
              onBlur={handleEmailBlur}
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
              placeholder="Create a password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirmPassword ? 'error' : ''}
            help={errors.confirmPassword?.message}
          >
            <Input.Password
              {...register('confirmPassword')}
              size="large"
              placeholder="Confirm your password"
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
              Register
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text className="text-gray-600">
              Already have an account?{' '}
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