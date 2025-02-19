'use client';

import { useCallback, useEffect, useState } from 'react';

import DarkModeButton from '@/components/Buttons/DarkMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import PostContainer from '@/components/PostContainer/PostContainer';
import { BlogPost } from '@/interface';
import getPosts from '@/utils/request/getPosts';

// Definir el tipo de datos de un BlogPost

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const obtenerBlogs = useCallback(async () => {
    try {
      const data =  await getPosts()
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
                  id={post.id}
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
