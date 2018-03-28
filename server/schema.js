const ql = require('graphql');
const db = require("./db/index");

//Определение моделей данных
const Publisher = new ql.GraphQLObjectType({
    name: 'Publisher',
    description: 'Издательство',
    fields: () => {
        return {
            id: {
                type: ql.GraphQLInt,
                description: 'ID записи в таблице Publishers',
                resolve(publisher) {
                    return publisher.id;
                }
            },
            name: {
                type: ql.GraphQLString,
                description: 'Название издательства',
                resolve(publisher) {
                    return publisher.name;
                }
            },
            address: {
                type: ql.GraphQLString,
                description: 'Адрес расположения издательства',
                resolve(publisher) {
                    return publisher.address;
                }
            },
            books: {
                type: new ql.GraphQLList(Book),
                description: 'Список изданных книг',
                resolve(publisher) {
                    return publisher.getBooks();
                }
            }
        };
    }
});

const Book = new ql.GraphQLObjectType({
    name: 'Book',
    description: 'Книга',
    fields: () => {
        return {
            id: {
                type: ql.GraphQLInt,
                description: 'ID записи в таблице Books',
                resolve(book) {
                    return book.id;
                }
            },
            name: {
                type: ql.GraphQLString,
                description: 'Название',
                resolve(book) {
                    return book.name;
                }
            },
            description: {
                type: ql.GraphQLString,
                description: 'Краткое описание',
                resolve(book) {
                    return book.description;
                }
            },
            pages: {
                type: ql.GraphQLInt,
                description: 'Количество страниц',
                resolve(book) {
                    return book.pages;
                }
            },
            price: {
                type: ql.GraphQLInt,
                description: 'Цена',
                resolve(book) {
                    return book.price;
                }
            },
            publisher: {
                type: Publisher,
                description: 'Издатель',
                resolve(book) {
                    return book.getPublisher();
                }
            },
            bookAuthors: {
                type: new ql.GraphQLList(BooksAuthors),
                description: 'Список авторов',
                resolve(book) {
                    return book.getBooksAuthors();
                }
            }
        };
    }
});

const Author = new ql.GraphQLObjectType({
    name: 'Author',
    description: 'Автор',
    fields: () => {
        return {
            id: {
                type: ql.GraphQLInt,
                description: 'ID записи в таблице Authors',
                resolve(author) {
                    return author.id;
                }
            },
            name: {
                type: ql.GraphQLString,
                description: 'ФИО',
                resolve(author) {
                    return author.name;
                }
            },
            biography: {
                type: ql.GraphQLString,
                description: 'Краткая биография',
                resolve(author) {
                    return author.biography;
                }
            },
            booksAuthors: {
                type: new ql.GraphQLList(BooksAuthors),
                description: 'Список книг',
                resolve(author) {
                    return author.getBooksAuthors();
                }
            }
        };
    }
});

const BooksAuthors = new ql.GraphQLObjectType({
    name: 'BooksAuthors',
    description: 'Авторы книг',
    fields: () => {
        return {
            id: {
                type: ql.GraphQLInt,
                description: 'ID записи в таблице BooksAuthors',
                resolve(booksAuthors) {
                    return booksAuthors.id;
                }
            },
            author: {
                type: Author,
                description: 'ID записи в таблице Authors',
                resolve(booksAuthors) {
                    return booksAuthors.getAuthor();
                }
            },
            book: {
                type: Book,
                description: 'ID записи в таблице Books',
                resolve(booksAuthors) {
                    return booksAuthors.getBook();
                }
            }
        };
    }
});

//Определение операций получения данных
const Query = new ql.GraphQLObjectType({
    name: 'Query',
    description: 'Операции получения данных',
    fields: () => {
        return {
            publisher: {
                type: new ql.GraphQLList(Publisher),
                args: {
                    id: {
                        type: ql.GraphQLInt
                    },
                    address: {
                        type: ql.GraphQLString
                    }
                },
                resolve(root, args) {
                    return db.models.Publishers.findAll({ where: args });
                }
            },
            book: {
                type: new ql.GraphQLList(Book),
                args: {
                    id: {
                        type: ql.GraphQLInt
                    },
                    name: {
                        type: ql.GraphQLString
                    },
                    price: {
                        type: ql.GraphQLInt
                    }
                },
                resolve(root, args) {
                    return db.models.Books.findAll({ where: args });
                }
            },
            author: {
                type: new ql.GraphQLList(Author),
                args: {
                    id: {
                        type: ql.GraphQLInt
                    },
                    name: {
                        type: ql.GraphQLString
                    },
                    biography: {
                        type: ql.GraphQLString
                    }
                },
                resolve(root, args) {
                    return db.models.Authors.findAll({ where: args });
                }
            },
            booksAuthors: {
                type: new ql.GraphQLList(BooksAuthors),
                args: {
                    id: {
                        type: ql.GraphQLInt
                    }
                },
                resolve(root, args) {
                    return db.models.BooksAuthors.findAll({ where: args });
                }
            }
        };
    }
});

//Определение операций изменения данных
const Mutation = new ql.GraphQLObjectType({
    name: 'Mutations',
    description: 'Операции добавления, изменения, удаления записи',
    fields: () => {
        return {
            addBook: {
                type: Book,
                args: {
                    name: {
                        type: new ql.GraphQLNonNull(ql.GraphQLString)
                    },
                    description: {
                        type: new ql.GraphQLNonNull(ql.GraphQLString)
                    },
                    pages: {
                        type: new ql.GraphQLNonNull(ql.GraphQLInt)
                    },
                    price: {
                        type: new ql.GraphQLNonNull(ql.GraphQLInt)
                    }
                },
                resolve(source, args) {
                    return db.models.Books.create({
                        name: args.name,
                        description: args.description,
                        pages: args.pages,
                        price: args.price
                    });
                }
            },
            addPublisher: {
                type: Publisher,
                args: {
                    name: {
                        type: ql.GraphQLNonNull(ql.GraphQLInt)
                    },
                    address: {
                        type: ql.GraphQLNonNull(ql.GraphQLString)
                    }
                },
                resolve(source, args) {
                    return db.models.Publishers.create({
                        name: args.name,
                        address: args.address
                    });
                }
            }
        };
    }
});

const Schema = new ql.GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = Schema;