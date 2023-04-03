const fillTableWithParameters = async (req, res, next) => {
    console.table(Object.entries(req.query));
    next();
};

module.exports = fillTableWithParameters;