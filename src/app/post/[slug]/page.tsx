import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { getMarkdownFile } from '@/utils/s3';
import { remark } from 'remark';
import html from 'remark-html';
import sanitizeHtml from 'sanitize-html';
import styles from './styles.module.css';

type Params = Promise<{ slug: string }>

export default async function MarkdownPage(props: {
  params: Params
}) {
  const params = await props.params

  const slug = params.slug;

  const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME as string;
  const key = `${slug}.md`;

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
        <div className={`${styles.img} w-[90%] md:w-[50%] font-sans mx-auto dark:text-[#fff]`}>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    // Manejo de errores al obtener el archivo Markdown
    console.error(`Error fetching Markdown file from bucket ${bucketName} with key ${key}:`, error);
    return <div>Markdown file not found</div>;
  }
}
