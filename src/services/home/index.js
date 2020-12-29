import { get } from '@/utils'

export const getStatistics = params => get('/statistics', params)

export const getSelfPanelData = params => get('/self-panel', params)
