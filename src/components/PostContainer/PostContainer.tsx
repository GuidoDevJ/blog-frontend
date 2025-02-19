import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PostContainerProps {
  imageUrl: string;
  tags: string[];
  title: string;
  date: string;
  postId?: string;
  id:string
}

const PostContainer = ({ imageUrl, tags, title, date,postId,id}: PostContainerProps) => {
  const nagigate = useRouter();
  const navigateToPost = () => {
    nagigate.push(`/post/${postId}*${id}`);
  }
  return (
    <div className="sm:h-[360px] bg-[#FFFFFF] border-[1px] rounded-md shadow-custom p-2 w-full dark:bg-secondary dark:border-transparent cursor-pointer"  onClick={navigateToPost}>
      <div className="w-full sm:h-[60%] rounded-md overflow-hidden">
        <Image
          width={1000}
          height={500}
          className="w-full h-full object-cover"
          alt={title}
          src={imageUrl}
        />
      </div>
      <div className="mt-2 mb-2 w-full flex flex-wrap gap-1 items-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-[10px] sm:text-[12px] font-serif border border-[#000] dark:border-[#fff] rounded-md p-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div>
        <h2 className="font-serif text-[20px]">{title}</h2>
        <span className="font-serif text-[12px]">{date}</span>
      </div>
    </div>
  );
};

export default PostContainer;
