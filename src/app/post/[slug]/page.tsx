import DarkModeButton from '@/components/Buttons/DarkMode';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import getPost from '@/utils/request/getPost';
import { getMarkdownFile } from '@/utils/s3';
import { Metadata } from 'next';
import { remark } from 'remark';
import html from 'remark-html';
import sanitizeHtml from 'sanitize-html';
import styles from './styles.module.css';

type Params = { slug: string };

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [post, id] = slug.split('*');

  const dataPost = await getPost(id);
  return {
    title: `${dataPost?.title}`,
    description: `Contenido del post ${
      dataPost?.title
    }, relacionados a ${dataPost?.tags.join(',')}`,
    openGraph: {
      title: `${dataPost?.title}`,
      description: `Contenido del post ${
        dataPost?.title
      }, relacionados a ${dataPost?.tags.join(' , ')}`,
      images: [dataPost?.image as string],
      type: 'article',
    },
  };
}

export default async function MarkdownPage({ params }: Props) {
  const slug = (await params).slug;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [postId, ...other] = slug.split('*');
  const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME as string;
  const key = `${postId}.md`;

  try {
    // Obtener contenido del archivo Markdown desde S3
    const markdownContent = await getMarkdownFile(bucketName, key);
    const processedContent = await remark().use(html).process(markdownContent);
    let contentHtml = processedContent.toString();

    // Sanitizar el HTML generado para evitar XSS
    contentHtml = sanitizeHtml(contentHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        a: ['href', 'target'],
        img: ['src', 'alt', 'width', 'height'],
      },
    });

    // Devolver la estructura de la página con el contenido HTML procesado
    return (
      <>
        <Header />
        <div className="w-[90%] sm:w-[96%] mx-auto flex justify-end mt-2">
          <DarkModeButton />
        </div>
        <div
          className={`${styles.img} w-[90%] md:w-[50%] font-sans mx-auto dark:text-[#fff]`}
        >
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    // Manejo de errores al obtener el archivo Markdown
    console.error(
      `Error fetching Markdown file from bucket ${bucketName} with key ${key}:`,
      error
    );
    return <div>Markdown file not found</div>;
  }
}
