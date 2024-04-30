const joi = require("joi");

module.exports.blogSchema = joi.object({
  blog: joi
    .object({
      date: joi.string().required(),
      subject: joi.string().required(),
      title: joi.string().required(),
      author: joi.string().required(),
      content: joi.string().required().min(1),
    })
    .required(),
});

module.exports.reviewSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().required().min(1).max(5),
      comment: joi.string().required(),
    })
    .required(),
});
