function roleMiddleware(requiredRole) {
    return (req, res, next) => {

        if (req.user.role !== requiredRole) {
            return res.status(403).send('Você não tem permissão para acessar esta página.');
        }

        next();
    };
}

module.exports = roleMiddleware;