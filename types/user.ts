export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  role: 'USER' | 'ADMIN'
}

export interface UserProfile extends User {
  bio?: string
  avatar?: string
  solvedChallenges: number
  totalPoints: number
  badges: Badge[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
} 