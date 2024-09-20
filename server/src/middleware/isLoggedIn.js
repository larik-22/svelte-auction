export const isLoggedIn = (req, res, next) => {
    // verify token here
    next();
}