'use client'
import DarkModeButton from '@/components/Buttons/DarkMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import PostContainer from '@/components/PostContainer/PostContainer';
import { useState } from 'react';

const initialPosts = [
  {
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/de8c/1850/dd7369da5dc5e54aacb63281634e2739?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HCJkB5mwVTZlDrLjw1cXec406ZHdaHDw4Fhfn~9HPa2Sy2JotSxIfDprLb~Q3rK8AsUGX~Yx~M-lRF1kRY73BIfusc24Lrv6jbloY3-47ZjYCvw3yU2jx6dm2W0qj1dAiKeZMjIaa~NsArjVF8caNOvDhfXu3zh0vd5JSx9TXnIR3yskjvD1mHm2B20G~1xa2ejlfQnwPOysJTEahPJWUARbT-fK1DcgNrpjxC2ckPWx~RYxyWhBoSVa3EDSw0a~rxsYfXuQTzcd0vEuePURzoKZMcyTYfZ5tEOCJnk9xy1eo2PTpnTv6-ZC4Mqeb-GoYmE5LtsTzdROzbc8axs3QQ__',
    tags: ['Etiqueta', 'Etiqueta', 'Etiqueta', 'Etiqueta'],
    title: 'Este es el título del post',
    date: '09 oct 2024',
  },
];

export default function Home() {
  const [posts, setPosts] = useState(initialPosts);

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
            {posts.map((post, index) => (
              <PostContainer
                key={index}
                imageUrl={post.imageUrl}
                tags={post.tags}
                title={post.title}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </main>
      <hr className="w-[80%] sm:w-[90%] mx-auto" />
      <Footer />
    </div>
  );
}
