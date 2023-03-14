
export interface IPostInfo {
  slug: string;
  liked: number;

  date: number;
  read: number;
  comment: number;
}


export interface ICommentInfo {
  slug: string;
  id?: number;
  author?: string;
  content: string;
  liked?: number;
  disliked?: number;
  createdAt?: string;
}
