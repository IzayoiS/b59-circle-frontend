export type RepliesResponse = {
  message: string;
  data: {
    id: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
