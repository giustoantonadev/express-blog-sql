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

exports.show = (req, res, next) => {
    const id = Number(req.params.id);
    const post = posts.find(p => p.id === id);
   // throw new Error('esempio di errore')
    if (!post) return next();

    return res.json(post)
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

exports.destroy = (req, res, next) => {
    const id = Number(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return next();

    posts.splice(index, 1);
    console.log('Posts aggiornati:', posts);
    return res.status(204).end()
};