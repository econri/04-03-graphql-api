'use strict'

const Authors = require("../server/db/index").models.Authors;
const AuthorsList = require("../server/db/datasets/authors");
const Promise = require("bluebird");

exports.up = function (next) {
  Promise.map(AuthorsList, author => {
    return Authors.create(author);
  })
    .nodeify(next);
};

exports.down = function (next) {
  Promise.map(AuthorsList, author => {
    return Authors.destroy({
      where: {
        name: author.name
      }
    });
  })
    .nodeify(next);
};
