import { post } from '@/utils'

export const login = params => post('/login', params)

export const logout = params => post('/logout', params)
