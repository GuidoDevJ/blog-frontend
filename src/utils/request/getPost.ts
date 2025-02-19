import { BlogPost } from '@/interface';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseAdmin';

const getPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, 'Blogs', id); // Referencia al documento específico
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log(`No se encontró el post con ID: ${id}`);
      return null;
    }

    const post = docSnap.data();
    return {
      id: docSnap.id,
      image: post.image,
      postId: post.postId,
      tags: post.tags ? post.tags.map((tag: string) => tag.toUpperCase()) : [],
      title: post.title,
      date: post.date?.seconds
        ? new Date(post.date.seconds * 1000).toLocaleDateString()
        : 'Fecha no disponible',
    } as BlogPost;
  } catch (error) {
    console.error("Error obteniendo el post:", error);
    return null;
  }
};

export default getPost;
