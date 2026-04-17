module.exports = (err, req, res, next) => {
    console.error('Errore:', err.message);

    res.status(500).json({
        error: 'Errore interno del server',
        message: err.message
    })
}