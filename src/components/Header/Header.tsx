'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import usePostState from '@/store/posts.state';
import { useRouter } from 'next/navigation';
import Logo from '../../../public/logo.svg';
import Search from '../../../public/search.svg';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  const posts = usePostState((state) => state.posts);
  const [showSearch, setShowSearch] = useState(false);
    const navigate = useRouter();
    const navigateToPost = () => {
      navigate.push(`/`);
    }

  return (
    <header className="min-w-[488px] flex justify-end bg-primary text-white p-4 items-center">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: showSearch ? 1 : 0, x: showSearch ? 0 : 50 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`relative ${showSearch ? 'block' : 'hidden'}`}
      >
        <SearchBar posts={posts} />
      </motion.div>
      <Image
        src={Search}
        alt="Search icon"
        width={50}
        height={50}
        className="cursor-pointer"
        onClick={() => setShowSearch((prev) => !prev)}
      />
      <div className='absolute left-1 ml-1 z-10'>
        <Image
          src={Logo}
          alt="Search icon"
          width={50}
          height={50}
          className="cursor-pointer"
          onClick={() => navigateToPost()}
        />
      </div>
    </header>
  );
};

export default Header;
