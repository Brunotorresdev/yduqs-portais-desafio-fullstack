import { useMutation } from '@tanstack/react-query';
import { api } from '@services/api';

interface ClientPayload {
  name: string;
  identifier: string;
  birth_date: string; 
  email: string;
  phone: string;
  high_school_completion_year: number;
}

interface PurchasePayload {
  course_option_id?: string | null;
  client: {
    name: string;
    identifier: string;
    birth_date: string;
    email: string;
    phone: string;
    high_school_completion_year: number;
  };
  accepted_terms: boolean;
  accepted_whatsapp_updates: boolean;
  total_installments?: number;
  installment_value?: number;
  total_value?: number;
}


export function useCreatePurchase() {
  return useMutation({
    mutationFn: async (data: PurchasePayload) => {
      const response = await api.post('/purchase', data);
      return response;
    },
  });
}
