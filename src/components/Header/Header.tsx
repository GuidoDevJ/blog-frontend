'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import usePostState from "@/store/posts.state";
import Search from '../../../public/search.svg';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  const posts = usePostState((state) => state.posts);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="flex justify-end bg-primary text-white p-4 items-center">
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: showSearch ? 1 : 0, x: showSearch ? 0 : 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative ${showSearch ? "block" : "hidden"}`}
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
    </header>
  );
};

export default Header;

