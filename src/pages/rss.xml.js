import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

/*
RSS specs : https://www.rssboard.org/rss-profile
*/

export async function GET(context) {
	const posts = await getCollection('posts', ({ data }) => data.draft !== true);
	const notes = await getCollection('notes', ({ data }) => data.draft !== true);

	const postItems = posts.map((post) => ({
		title: post.data.title,
		pubDate: post.data.pubDate,
		description: post.data.description,
		link: `/posts/${post.id}/`,
		content: sanitizeHtml(parser.render(post.body ?? '')),
		customData: "<dc:creator><![CDATA[Vincent S.-G.]]></dc:creator>"
	}));

	const noteItems = notes.map((note) => {
		const body = note.body ?? '';
		let title = '';
		let description = '';

		if (note.data.type === 'link') {
			title = `→ ${note.data.source ?? note.data.url ?? 'Link'}`;
			description = body.trim();
		} else if (note.data.type === 'quote') {
			title = `"${(note.data.quote ?? body).slice(0, 60)}…"`;
			description = note.data.source ? `— ${note.data.source}` : '';
		} else {
			title = body.trim().split('\n')[0].slice(0, 80);
			description = body.trim();
		}

		return {
			title,
			pubDate: note.data.pubDate,
			description,
			link: `/notes/${note.id}/`,
			content: sanitizeHtml(parser.render(body)),
			customData: "<dc:creator><![CDATA[Vincent S.-G.]]></dc:creator>"
		};
	});

	const allItems = [...postItems, ...noteItems].sort(
		(a, b) => b.pubDate.getTime() - a.pubDate.getTime()
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
		items: allItems,
		customData: `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<atom:link href="${new URL("rss.xml", context.site)}" rel="self" type="application/rss+xml" />
		<language>en</language>`
	});
}
