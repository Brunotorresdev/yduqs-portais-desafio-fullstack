import { useQuery } from '@tanstack/react-query';
import { api } from '@services/api';

export function usePageOptions() {
  return useQuery({
    queryKey: ['course-options'],
    queryFn: async () => {
      const response = await api.get('/course-options');
      return response.data;
    },
  });
}
