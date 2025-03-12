import { BlogPost } from '@/interface';
import { create } from 'zustand';

type Store = {
  posts: BlogPost[];
  setPosts: (posts: BlogPost[]) => void;
};

const usePostState = create<Store>((set) => ({
  posts: [],
  setPosts: (posts) => {
    const mapPosts = posts.map((post: BlogPost) => {
      return {
        ...post,
        title: post.title.toLowerCase(),
      };
    });
    set({ posts: mapPosts });
  },
}));

export default usePostState;
