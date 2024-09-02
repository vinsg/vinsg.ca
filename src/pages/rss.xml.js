import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SOCIAL } from '../consts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
	const posts = await getCollection('posts', ({ data }) => { return data.draft !== true; }
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
		// stylesheet: '/rss/styles.xsl',
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			// todo probably should automate this as it may break in the future.
			link: `/blog/posts/${post.slug}/`,
			content: sanitizeHtml(parser.render(post.body)),
			customData: "<dc:creator><![CDATA[Vincent S.-G.]]></dc:creator>"
		})),
		// todo add post language
	});
}
