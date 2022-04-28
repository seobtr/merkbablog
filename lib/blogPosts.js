const apiUrl = process.env.FLOTIQ_API_URL;
const apiKey = process.env.FLOTIQ_API_KEY;
const blogPostApi = `${apiUrl}/api/v1/content/blogpost`;

export function getBlogPostsUrl(page, limit, filters, direction = 'desc', orderBy = 'internal.createdAt') {
    let url = `${blogPostApi
    }?page=${page}&limit=${limit}`
        + `&order_by=${orderBy}&order_direction=${direction}`
        + `&auth_token=${apiKey}`;

    if (filters !== undefined) {
        url += `&filters=${filters}`;
    }

    return url;
}

export async function getBlogPosts(page = 1, limit = 10) {
    const url = getBlogPostsUrl(page, limit);
    const res = await fetch(
        url,
    );
    return res.json();
}
export async function getBlogPostBySlug(slug) {
    const filters = `{"slug":{"type":"contains","filter":"${slug}"}}`;
    const url = getBlogPostsUrl(1, 1, filters);
    const res = await fetch(
        url,
    );
    return res.json();
}

export async function getPreviousBlogPost(date) {
    const filters = `{"internal.createdAt":{"type":"lessThan", "filter": "${date}"}}`;
    const url = getBlogPostsUrl(1, 1, filters, 'desc');
    const res = await fetch(
        url,
    );
    return res.json();
}

export async function getNextBlogPost(date) {
    const filters = `{"internal.createdAt":{"type":"greaterThanOrEqual","filter":"${date}"}}`;
    const url = getBlogPostsUrl(1, 4, filters, 'asc');
    const res = await fetch(
        url,
    );
    return res.json();
}