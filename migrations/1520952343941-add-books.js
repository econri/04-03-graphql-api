'use strict'

const Books = require("../server/db/index").models.Books;
const Authors = require("../server/db/index").models.Authors;
const Publishers = require("../server/db/index").models.Publishers;
const BooksAuthors = require("../server/db/index").models.BooksAuthors;
const BooksList = require("../server/db/datasets/books");
const Promise = require("bluebird");

exports.up = function (next) {
  Promise.map(BooksList, book => {
    return Publishers
      .findOne({ where: { name: book.publisher } })
      .then(publisher => {
        book.publisherId = publisher.id;
        return Books
          .create(book)
          .then(createdBook => {
            return Promise.map(book.authors, author => {
              return Authors
                .findOne({ where: { name: author } })
                .then(result => {
                  return BooksAuthors.create({ bookId: createdBook.id, authorId: result.id });
                })
            })
          })
      });
  })
    .nodeify(next);
};

exports.down = function (next) {
  Promise.map(BooksList, book => {
    return Books.destroy({
      where: {
        name: book.name
      }
    });
  })
    .nodeify(next);
};

