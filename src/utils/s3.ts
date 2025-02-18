import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const streamToString = async (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    stream.on('error', reject);
  });
};

export const getMarkdownFile = async (bucketName: string, key: string) => {
  if (!bucketName || !key) {
    throw new Error('Bucket name and key are required');
  }

  const params = { Bucket: bucketName, Key: key };

  try {
    const { Body } = await s3.send(new GetObjectCommand(params));
    if (!Body) throw new Error('Empty response body from S3');

    return await streamToString(Body as Readable);
  } catch (error) {
    console.error('Error fetching Markdown file from S3:', error);
    throw error;
  }
};
