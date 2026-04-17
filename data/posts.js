// Shared posts data for the exercise
const posts = [
    {
        id: 1,
        title: 'Benvenuto al mio blog',
        content: 'Questo è il primo post del blog. Qui iniziamo il progetto.',
        image: '/images/post1.svg',
        tags: ['intro', 'benvenuto', 'tutorial', 'general']
    },
    {
        id: 2,
        title: 'Node & Express',
        content: 'Parliamo di come creare server con Express e strutturare le rotte.',
        image: '/images/post2.svg',
        tags: ['node', 'express', 'backend', 'tutorial']
    },
    {
        id: 3,
        title: 'Static Assets',
        content: 'Configurare immagini e file statici è semplice con express.static.',
        image: '/images/post3.svg',
        tags: ['static', 'assets', 'frontend', 'tutorial']
    },
    {
        id: 4,
        title: 'Routing',
        content: 'Creiamo rotte dedicate per la bacheca e per i dettagli dei post.',
        image: '/images/post4.svg',
        tags: ['routing', 'api', 'express', 'backend']
    },
    {
        id: 5,
        title: 'Tagging',
        content: 'Esempio di tags come array di stringhe per ogni post.',
        image: '/images/post5.svg',
        tags: ['tags', 'metadata', 'tutorial', 'general']
    }
];

module.exports = posts;
