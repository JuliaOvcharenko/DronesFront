import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { BASE_URL } from '../api/baseUrl'


interface User {
	id: number
	username: string
	lastname: string
	patronymic: string
	email: string
	birthDate: string
	phoneNumber: string
	addressId: number | null
}

interface AuthContextType {
	user: User | null
	token: string | null
	isAuthenticated: boolean
	isLoading: boolean
	login: (token: string) => Promise<void>
	logout: () => void
	refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const fetchUser = async (authToken: string) => {
		try {
			const response = await fetch(`${BASE_URL}/users/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			})

			if (!response.ok) throw new Error('Failed to fetch user')

			const userData = await response.json()
			setUser(userData)
			return userData
		} catch (error) {
			console.error('Error fetching user:', error)
			localStorage.removeItem('token')
			setToken(null)
			setUser(null)
			throw error
		}
	}

	const login = async (authToken: string) => {
		localStorage.setItem('token', authToken)
		setToken(authToken)
		try {
			await fetchUser(authToken)
		} catch (error) {
			localStorage.removeItem('token')
			setToken(null)
			throw error
		}
	}

	const logout = () => {
		localStorage.removeItem('token')
		setToken(null)
		setUser(null)
	}

	const refreshUser = async () => {
		if (token) await fetchUser(token)
	}

	useEffect(() => {
		const storedToken = localStorage.getItem('token')
		if (storedToken) {
			setToken(storedToken)
			fetchUser(storedToken)
				.catch(() => {
					setToken(null)
					setUser(null)
				})
				.finally(() => setIsLoading(false))
		} else {
			setIsLoading(false)
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated: !!user && !!token,
				isLoading,
				login,
				logout,
				refreshUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) throw new Error('useAuth must be used within an AuthProvider')
	return context
}