export default function wrapAsync(asyncFn) {
    return (req, res, next) => {
        asyncFn(req, res, next).catch(next);
    };
}