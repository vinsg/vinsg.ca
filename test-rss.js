#!/usr/bin/env node

/**
 * RSS Feed Validation Script
 * Tests the generated RSS feed for compliance and best practices
 */

import { parseStringPromise } from 'xml2js';
import { readFile } from 'fs/promises';
import { join } from 'path';

const RSS_PATH = './dist/rss.xml';

async function testRSSFeed() {
  console.log('🧪 Testing RSS Feed...\n');

  try {
    // Read the RSS file
    const rssContent = await readFile(RSS_PATH, 'utf-8');

    // Parse XML
    const result = await parseStringPromise(rssContent);
    const channel = result.rss.channel[0];
    const items = channel.item || [];

    console.log('✅ RSS XML is valid and parseable\n');

    // Test Channel Metadata
    console.log('📋 Channel Metadata:');
    console.log(`   Title: ${channel.title?.[0] || 'MISSING'}`);
    console.log(`   Description: ${channel.description?.[0] || 'MISSING'}`);
    console.log(`   Link: ${channel.link?.[0] || 'MISSING'}`);
    console.log(`   Language: ${channel.language?.[0] || 'MISSING'}`);
    console.log(`   Last Build: ${channel.lastBuildDate?.[0] || 'MISSING'}`);

    // Check for atom:link self-reference
    const atomLink = channel['atom:link']?.[0];
    if (atomLink && atomLink.$.rel === 'self') {
      console.log(`   Self-reference: ${atomLink.$.href}`);
    } else {
      console.log('   ❌ Missing atom:link with rel="self"');
    }

    console.log(`\n📰 Found ${items.length} items\n`);

    if (items.length === 0) {
      console.log('⚠️  No items found in feed (this might be expected if all posts are drafts)');
      return;
    }

    // Test each item
    let allGood = true;
    const issues = [];

    items.forEach((item, index) => {
      const itemTitle = item.title?.[0] || `Item ${index + 1}`;
      console.log(`📄 Testing: ${itemTitle}`);

      // Check required fields
      const checks = {
        'Title': !!item.title?.[0],
        'Link': !!item.link?.[0],
        'Description': !!item.description?.[0],
        'PubDate': !!item.pubDate?.[0],
        'GUID': !!item.guid?.[0],
        'Content': !!item['content:encoded']?.[0],
        'Author': !!item['dc:creator']?.[0]
      };

      Object.entries(checks).forEach(([field, present]) => {
        if (present) {
          console.log(`   ✅ ${field}`);
        } else {
          console.log(`   ❌ Missing ${field}`);
          issues.push(`${itemTitle}: Missing ${field}`);
          allGood = false;
        }
      });

      // Validate GUID format
      if (item.guid?.[0]) {
        const guid = typeof item.guid[0] === 'string' ? item.guid[0] : item.guid[0]._;
        console.log(`   📌 GUID: ${guid}`);

        // Check if GUID is an absolute URL
        if (!guid.startsWith('http://') && !guid.startsWith('https://')) {
          console.log(`   ⚠️  GUID is not an absolute URL`);
          issues.push(`${itemTitle}: GUID should be absolute URL`);
        }

        // Check if GUID matches expected pattern
        if (guid.includes('vinsg.ca/posts/')) {
          console.log(`   ✅ GUID format looks correct`);
        }
      }

      // Validate link is absolute
      if (item.link?.[0]) {
        const link = item.link[0];
        if (!link.startsWith('http://') && !link.startsWith('https://')) {
          console.log(`   ⚠️  Link is relative, should be absolute`);
          issues.push(`${itemTitle}: Link should be absolute URL`);
        } else {
          console.log(`   ✅ Link is absolute URL`);
        }
      }

      console.log('');
    });

    // Summary
    console.log('━'.repeat(60));
    console.log('📊 SUMMARY\n');

    if (allGood && issues.length === 0) {
      console.log('✅ All tests passed!');
      console.log('🎉 Your RSS feed is compliant with best practices!');
      return 0;
    } else {
      console.log(`❌ Found ${issues.length} issue(s):\n`);
      issues.forEach(issue => console.log(`   • ${issue}`));
      return 1;
    }

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ RSS file not found at ${RSS_PATH}`);
      console.error('   Run "npm run build" first to generate the RSS feed');
    } else {
      console.error('❌ Error testing RSS feed:', error.message);
    }
    return 1;
  }
}

// Run tests
testRSSFeed().then(exitCode => {
  process.exit(exitCode || 0);
});
