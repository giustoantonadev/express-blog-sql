const posts = require('../data/posts')

exports.index = (req, res) => {
    let result = posts;

    if (req.query.tag) {
        result = posts.filter(post => {
            return Array.isArray(post.tags) && post.tags.includes(req.query.tag)
        })
    }
    res.json(result)
};

exports.show = async (req, res, next) => {
    const id = Number(req.params.id);
    const { query } = require('../database/db');
    try {
        const rows = await query('SELECT id, title, content, image FROM posts WHERE id = ?', [id]);
        if (!rows || rows.length === 0) return next();
        const post = rows[0];

        // fetch tags for this post and return only labels for readability
        const tagRows = await query(
            'SELECT tags.label FROM tags JOIN post_tag ON post_tag.tag_id = tags.id WHERE post_tag.post_id = ?',
            [id]
        );
        post.tags = Array.isArray(tagRows) ? tagRows.map(r => r.label) : [];
        return res.json(post);
    } catch (err) {
        console.error('Error fetching post:', err.message || err);
        return next(err);
    }
};

exports.store = (req, res) => {
    const data = req.body || {}
    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1
    const newPost = {
        id: newId,
        ...data
    }
    posts.push(newPost)
    return res.status(201).json(newPost)
}

exports.update = (req, res, next) => {
    const id = Number(req.params.id)
    const post = posts.find(p => p.id === id)

    if (!post) return next();

    const { title, content, image, tags } = req.body || {}
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (image !== undefined) post.image = image;
    if (tags !== undefined) post.tags = tags;

    return res.json(post)
}

exports.destroy = async (req, res, next) => {
    const id = Number(req.params.id);
    const { query } = require('../database/db');
    try {
        const result = await query('DELETE FROM posts WHERE id = ?', [id]);
        // result.affectedRows is available for DELETE queries
        if (!result || result.affectedRows === 0) return next();
        return res.status(204).end();
    } catch (err) {
        console.error('Error deleting post:', err.message || err);
        return next(err);
    }
};