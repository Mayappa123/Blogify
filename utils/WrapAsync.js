// utils.WrapAsync.js

module.exports = (fn) => {
  return (req, res, next) => {
    const result = fn(req, res, next);
    if (result && typeof result.catch === "function") {
      result.catch(next);
    }
  };
};
