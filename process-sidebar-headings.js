const groupBy = require('lodash.groupby');
const { parseHeadings, formatSlug } = require('./node-helpers');

const SECTION_HEADINGS = {
    'docs/v7': 'Documentation (v7)',
    'docs/vanilla': 'Vanilla JavaScript',
    'docs/react': 'TypeIt for React',
    'docs/wordpress': 'TypeIt for WordPress'
}

const createHeading = (headingData) => {
    const defaults = {
        depth: 1,
        path: "",
        value: "",
        subHeadings: []
    };

    return { ...defaults, ...headingData };
}

module.exports = (edges) => {
    const headings = edges.map(edge => {
        const path = formatSlug(edge);
        const subHeadings = parseHeadings(edge.node.headings, path);
        const isIndexPage = edge.node.fileAbsolutePath.endsWith('index.md');
        let pageSlug = "";

        for (const [key] of Object.entries(SECTION_HEADINGS)) {
            if (path.startsWith(key)) {
                pageSlug = key;
                break;
            }
        }

        return {
            order: edge.node.fileAbsolutePath.split('/').reverse()[0].match(/^([0-9]+)-/)?.[1],
            page: pageSlug,
            heading: createHeading({
                depth: isIndexPage ? 0 : 1,
                value: edge.node.frontmatter.title,
                path: `/${path}`,
                subHeadings
            })
        }
    });

    // Group by documentation page, so that we can later combine them.
    const groupedPageHeadings = groupBy(headings, 'page');
    const sortedHeadings = { ...SECTION_HEADINGS };

    // Order the groups of headings correctly.
    for (const pageKey in SECTION_HEADINGS) {
        if (!groupedPageHeadings[pageKey]) {
            sortedHeadings[pageKey] = [];
            continue;
        }

        // Sort each Markdown file under each primary heading.
        groupedPageHeadings[pageKey] = groupedPageHeadings[pageKey].sort((a, _b) => {
            if(a.heading.depth === 0) {
              return -1;
            }

            return 0;
        });
''
        sortedHeadings[pageKey] = groupedPageHeadings[pageKey];
    }

    return Object.values(sortedHeadings).map(headingObj => {
        return headingObj.map(h => h.heading);
    }).flat();
}
