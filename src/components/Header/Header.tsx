import Image from 'next/image';
import Search from '../../../public/search.svg';

const Header = () => {
  return (
    <header className="flex justify-end bg-primary text-white p-4">
      <Image src={Search} alt="Search icon" width={50} height={50} />
    </header>
  );
};

export default Header;
