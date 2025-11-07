import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SOCIAL } from '../consts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

/*
RSS specs : https://www.rssboard.org/rss-profile
*/

export async function GET(context) {
	const posts = await getCollection('posts', ({ data }) => { return data.draft !== true; }
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		xmlns: {
			dc: "http://purl.org/dc/elements/1.1/",
			atom: "http://www.w3.org/2005/Atom"
		},
		stylesheet: '/rss/styles.xsl',
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/posts/${post.id}/`,
			guid: new URL(`/posts/${post.id}/`, context.site).href,
			content: sanitizeHtml(parser.render(post.body)),
			customData: "<dc:creator><![CDATA[Vincent S.-G.]]></dc:creator>"
		})),
		customData: `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<atom:link href="${new URL("rss.xml", context.site)}" rel="self" type="application/rss+xml" />
		<language>en</language>`
	});
}
