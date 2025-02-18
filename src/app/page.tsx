'use client';

import { db } from '@/utils/firebaseAdmin';
import { collection, getDocs } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

import DarkModeButton from '@/components/Buttons/DarkMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import PostContainer from '@/components/PostContainer/PostContainer';

// Definir el tipo de datos de un BlogPost
interface BlogPost {
  id: string;
  image: string;
  tags: string[];
  title: string;
  date: string;
  postId?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const obtenerBlogs = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Blogs'));
      const data = querySnapshot.docs.map((doc) => {
        const post = doc.data();
        return {
          id: doc.id,
          image: post.image,
          postId: post.postId,
          tags: post.tags.map((tag:string)=>tag.toUpperCase()),
          title: post.title,
          date: post.date?.seconds ? new Date(post.date.seconds * 1000).toLocaleDateString() : "Fecha no disponible"
        } as BlogPost;
      });
      setPosts(data);
    } catch (error) {
      console.error('Error obteniendo blogs:', error);
    }
  }, []);
  

  useEffect(() => {
    obtenerBlogs();
  }, [obtenerBlogs]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-[90%] sm:w-[96%] mx-auto flex justify-end mt-2">
        <DarkModeButton />
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start dark:text-[#fff] flex-grow">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl sm:text-4xl lg:text-4xl xl:text-5xl mt-2 mb-2">
            Código y mate
          </h1>

          <div className="w-[80%] sm:w-[90%] grid items-center grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostContainer
                  key={post.id}
                  postId={post.postId}  
                  imageUrl={post.image}
                  tags={post.tags}
                  title={post.title}
                  date={post.date}
                />
              ))
            ) : (
              <p className="text-gray-500">No hay publicaciones disponibles.</p>
            )}
          </div>
        </div>
      </main>

      <hr className="w-[80%] sm:w-[90%] mx-auto" />
      <Footer />
    </div>
  );
}
