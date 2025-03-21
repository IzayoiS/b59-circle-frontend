import { SearchUser } from '@/features/search-users/types/search-user';
import { api } from '@/libs/api';

export async function fetchSuggestedUsers(
  loggedInUserId: string
): Promise<SearchUser[]> {
  try {
    const response = await api.get(`/users/suggested/${loggedInUserId}`);
    const users: SearchUser[] = response.data;

    return users
      .filter((user) => !user.isFollowed) // Hanya yang belum di-follow oleh User A
      .sort((a, b) => {
        const aFollowsUserA =
          a.followers?.some((f) => f.id === loggedInUserId) ?? false;
        const bFollowsUserA =
          b.followers?.some((f) => f.id === loggedInUserId) ?? false;

        if (bFollowsUserA !== aFollowsUserA) {
          return bFollowsUserA ? 1 : -1;
        }
        return (b.followersCount ?? 0) - (a.followersCount ?? 0); // Urutkan berdasarkan followers terbanyak
      })
      .slice(0, 5); // Ambil 5 user teratas
  } catch (error) {
    console.error('Error fetching suggested users:', error);
    return [];
  }
}
