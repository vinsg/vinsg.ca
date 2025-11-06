import { getCollection } from "astro:content";
import { generateOG } from "@components/generate-og";

interface Props {
  params: { slug: string };
  props: { title: string; subtitle: string };
}

export const GET = ({ props: { title, subtitle } }: Props) => {
  return generateOG({ title, subtitle });
};

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((entry) => ({
    params: { slug: entry.id },
    props: {
      title: entry.data.title,
      subtitle: entry.data.description,
    },
  }));
}
