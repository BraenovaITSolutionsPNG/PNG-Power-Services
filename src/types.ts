export type AdminRole = 'operations' | 'field' | 'admin'

export interface PublicReport {
  caseNumber: string
  issueType: string
  province: string
  location: string
  description: string
  phone?: string
  contactPreference: string
  status: 'Under review' | 'Crew assigned' | 'In progress' | 'Resolved'
  createdAt: string
  updatedAt: string
}

export interface Incident {
  id: string
  title: string
  meta: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: string
  time: string
  province?: string
}

export interface WorkOrder {
  id: string
  title: string
  place: string
  priority: 'Urgent' | 'High' | 'Normal'
  time: string
  status: string
}

