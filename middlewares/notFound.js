module.exports = (req, res) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not Found',
        data: null
    });
};
