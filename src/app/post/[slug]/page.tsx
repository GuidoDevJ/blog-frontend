import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { getMarkdownFile } from '@/utils/s3';
import { remark } from 'remark';
import html from 'remark-html';
import sanitizeHtml from 'sanitize-html';
import styles from './styles.module.css';

export default async function MarkdownPage({
  params,
}: {
  params: { slug: string };
}) {
  const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME;
  const key = `${params.slug}.md`;

  try {
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
    console.error('Error fetching Markdown file:', error);
    return <div>Markdown file not found</div>;
  }
}
