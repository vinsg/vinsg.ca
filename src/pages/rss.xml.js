import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SOCIAL } from '../consts';

export async function GET(context) {
	const posts = await getCollection('posts', ({ data }) => {return data.draft !== true;}
    );
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
      		pubDate: post.data.pubDate,
      		description: post.data.description,
			author: SOCIAL.EMAIL,
			link: `/blog/${post.slug}/`,
		})),
	});
}
