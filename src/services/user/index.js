import { post } from '@/utils'

export const login = params => post('/login', params)
