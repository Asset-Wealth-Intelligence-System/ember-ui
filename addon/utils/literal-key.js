/**
 * Builds a deterministic translation key for a hardcoded English UI string.
 *
 * Menu items, shortcuts and other registry-driven UI are defined with plain English
 * strings in `extension.js` files (their slugs/ids are derived from the English title,
 * so the source text must stay stable). The `t-literal` helper translates those strings
 * at render time by looking up `literal.<namespace>.<slug>`; this util produces the slug.
 *
 * @param {String} text
 * @param {String} namespace
 * @return {String}
 */
export default function literalKey(text, namespace = 'registry') {
    const slug = String(text)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    return `literal.${namespace}.${/^[a-z]/.test(slug) ? slug : `s-${slug}`}`;
}
