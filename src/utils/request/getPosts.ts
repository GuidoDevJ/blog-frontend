import { BlogPost } from '@/interface';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseAdmin';

const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'Blogs'));
  const data = querySnapshot.docs.map((doc) => {
    const post = doc.data();
    return {
      id: doc.id,
      image: post.image,
      postId: post.postId,
      tags: post.tags.map((tag: string) => tag.toUpperCase()),
      title: post.title,
      date: post.date?.seconds
        ? new Date(post.date.seconds * 1000).toLocaleDateString()
        : 'Fecha no disponible',
    } as BlogPost;
  });
  return data;
};

export default getPosts;
