export interface Tour {
  id: string;
  name: string;
}

export interface CourseOption {
  id: string;
  name: string;
  value?: number;
  cash_value?: number;
  city: string;
  street: string;
  street_number: string;
  street_neighborhood: string;
  tourns: Tour[];
  installments?: { parcels: number; installment: number; total: number }[];
}
