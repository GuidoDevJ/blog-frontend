"use client"
import usePostState from '@/store/posts.state';
import Image from 'next/image';
import Search from '../../../public/search.svg';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  const posts = usePostState((state)=>state.posts);
  return (
    <header className="flex justify-end bg-primary text-white p-4">
      <Image src={Search} alt="Search icon" width={50} height={50} />
    <SearchBar posts={posts}/>
    </header>
  );
};

export default Header;
