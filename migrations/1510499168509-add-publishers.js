'use strict'

const Publishers = require("../server/db/index").models.Publishers;
const PublishersList = require("../server/db/datasets/publishers");
const Promise = require("bluebird");

exports.up = (next) => {
  Promise.map(PublishersList, publisher => {
    return Publishers.create(publisher);
  })
    .nodeify(next);
};

exports.down = function (next) {
  Promise.map(PublishersList, publisher => {
    return Publishers.destroy({
      where: {
        name: publisher.name
      }
    });
  })
    .nodeify(next);
};