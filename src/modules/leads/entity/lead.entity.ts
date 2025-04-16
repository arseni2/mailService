import { LeadStatus } from '../enum/lead.enum';

export interface Lead {
  id: number;
  buyer_id: number;
  seller_id: number;
  status: LeadStatus;
  phone: string;
  email: string;
  comment?: string;
  created_at: string;
  updated_at: string;
} 