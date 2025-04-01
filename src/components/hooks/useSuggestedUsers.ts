import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

const fetchSuggestedUsers = async (loggedInUserId: string) => {
  console.log('Fetching suggested users for:', loggedInUserId);

  const { data } = await api.get(`/users/suggested?userId=${loggedInUserId}`);
  return data;
};

export function useSuggestedUsers(loggedInUserId: string) {
  return useQuery({
    queryKey: ['suggestedUsers', loggedInUserId],
    queryFn: () => fetchSuggestedUsers(loggedInUserId),
    enabled: !!loggedInUserId,
  });
}
