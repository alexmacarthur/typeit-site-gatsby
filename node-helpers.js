/**
 * Format headings for the sidebar.
 *
 * @param {array} headings
 * @param {integer} level
 */
function organizeHeadings(headings, level = 2) {
    const withSubHeadings = headings.map((heading, index) => {

        if (heading.depth > level) return heading;
        let subHeadings = [];

        let i = index + 1;
        while (headings[i] && headings[i].depth !== heading.depth) {
            subHeadings.push(headings[i]);
            i++;
        }

        // Only include the subHeadings one later deeper.
        heading.subHeadings = subHeadings.filter(h => h.depth === heading.depth + 1);

        return heading;
    });

    return withSubHeadings.filter(heading => {
        return heading.depth === level;
    });
}

// Ideally, this would be done before it gets to the component level.
function generateHashes(headings, pathToPrepend) {
    return headings.map(heading => {
        // Convert to lowercase, make spaces hyphens.
        let hash = heading.value.toLowerCase().replace(/[^\w]/g, "-");
        // Remove leading & trailing hypens.
        hash = hash.replace(/^(-)+|(-)+$/g, "");
        // Prepend the hash so Gatsby doesn't take us to the home page.
        heading.hash = `/${pathToPrepend}#${hash}`;
        
        // Recursively do the same thing to any subheadings attached.
        if (heading.subHeadings) {
            heading.subHeadings = generateHashes(heading.subHeadings, pathToPrepend);
        }

        return heading;
    });
}

const parseHeadings = function (headings, pathToPrepend = "", level = 2) {
    let organizedHeadings = organizeHeadings(headings, level);
    return generateHashes(organizedHeadings, pathToPrepend);
}

module.exports = { parseHeadings };
