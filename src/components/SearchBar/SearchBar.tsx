import { BlogPost } from '@/interface';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

type SearchBarBlog = {
  posts: BlogPost[];
};

const SearchBar = ({ posts }: SearchBarBlog) => {
  const navigate = useRouter();

  const [query, setQuery] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<BlogPost[]>(
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    if (userInput) {
      const filtered = posts.filter((post: BlogPost) =>
        post.title.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string, post: BlogPost) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    navigate.push(`/post/${post.postId}*${post.id}`);
  };

  return (
    <div className="relative w-64 text-black">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search..."
      />
      {query && filteredSuggestions.length === 0 ? (
        <ul className="absolute w-full bg-white border border-t-0 rounded-b-md shadow-lg z-10">
          <li className="p-2 text-gray-500">No hay resultados</li>
        </ul>
      ) : (
        filteredSuggestions.length > 0 && (
          <ul className="absolute w-full bg-white border border-t-0 rounded-b-md shadow-lg z-10">
            {filteredSuggestions.map((post, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(post.title, post)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {post.title}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default SearchBar;
