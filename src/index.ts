import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Book {
    id: Int
    title: String
    author: String
    genre: String
    publishedYear: Int
    pageCount: Int
    language: String
    publisher: String
    ISBN: String
  }

  type Query {
    books(title: String, skip: Int, limit: Int): [Book]
    book(id: Int): Book
  }

  type Mutation {
    createBook(title: String, author: String, genre: String, publishedYear: Int, pageCount: Int, language: String, publisher: String, ISBN: String): Book
    updateBook(id: Int, bookInput: BookInput): Book
  }

  input BookInput {
    title: String
    author: String
    genre: String
    publishedYear: Int
    pageCount: Int
    language: String
    publisher: String
    ISBN: String
  }
`;

const books = [
  {
    id: 1,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1954,
    pageCount: 1178,
    language: "English",
    publisher: "George Allen & Unwin",
    ISBN: "978-0-395-08254-4",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813,
    pageCount: 279,
    language: "English",
    publisher: "T. Egerton, Whitehall",
    ISBN: "N/A",
  },
  {
    id: 3,
    title: "The Metamorphosis",
    author: "Franz Kafka",
    genre: "Fiction",
    publishedYear: 1915,
    pageCount: 55,
    language: "German",
    publisher: "Kurt Wolff Verlag",
    ISBN: "N/A",
  },
  {
    id: 4,
    title: "The Awakening",
    author: "Kate Chopin",
    genre: "Fiction",
    publishedYear: 1899,
    pageCount: 196,
    language: "English",
    publisher: "Herbert S. Stone & Co.",
    ISBN: "N/A",
  },
  {
    id: 5,
    title: "City of Glass",
    author: "Paul Auster",
    genre: "Mystery",
    publishedYear: 1985,
    pageCount: 203,
    language: "English",
    publisher: "Sun & Moon Press",
    ISBN: "978-1-55713-016-7",
  },
  {
    id: 6,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Drama",
    publishedYear: 1960,
    pageCount: 281,
    language: "English",
    publisher: "J.B. Lippincott & Co.",
    ISBN: "978-0-06-112008-4",
  },
  {
    id: 7,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    pageCount: 328,
    language: "English",
    publisher: "Secker & Warburg",
    ISBN: "978-0-452-28423-4",
  },
  {
    id: 8,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classics",
    publishedYear: 1925,
    pageCount: 180,
    language: "English",
    publisher: "Charles Scribner's Sons",
    ISBN: "978-0-7432-7356-5",
  },
  {
    id: 9,
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    genre: "Magical Realism",
    publishedYear: 1967,
    pageCount: 417,
    language: "Spanish",
    publisher: "Harper & Row",
    ISBN: "978-0-06-088328-7",
  },
  {
    id: 10,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publishedYear: 1997,
    pageCount: 223,
    language: "English",
    publisher: "Bloomsbury",
    ISBN: "978-0-7475-3269-6",
  },
  {
    id: 11,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-Age",
    publishedYear: 1951,
    pageCount: 277,
    language: "English",
    publisher: "Little, Brown and Company",
    ISBN: "978-0-316-76948-0",
  },
  {
    id: 12,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1937,
    pageCount: 310,
    language: "English",
    publisher: "George Allen & Unwin",
    ISBN: "978-0-261-10236-1",
  },
  {
    id: 13,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    publishedYear: 2003,
    pageCount: 454,
    language: "English",
    publisher: "Doubleday",
    ISBN: "978-0-385-50420-5",
  },
  {
    id: 14,
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    publishedYear: 1932,
    pageCount: 311,
    language: "English",
    publisher: "Chatto & Windus",
    ISBN: "978-0-06-085052-4",
  },
  {
    id: 15,
    title: "The Shining",
    author: "Stephen King",
    genre: "Horror",
    publishedYear: 1977,
    pageCount: 447,
    language: "English",
    publisher: "Doubleday",
    ISBN: "978-0-385-12167-5",
  },
  {
    id: 16,
    title: "The Road",
    author: "Cormac McCarthy",
    genre: "Post-Apocalyptic",
    publishedYear: 2006,
    pageCount: 241,
    language: "English",
    publisher: "Alfred A. Knopf",
    ISBN: "978-0-307-26543-2",
  },
  {
    id: 17,
    title: "Gone with the Wind",
    author: "Margaret Mitchell",
    genre: "Historical Fiction",
    publishedYear: 1936,
    pageCount: 1037,
    language: "English",
    publisher: "Macmillan Publishers",
    ISBN: "978-0-02-585388-1",
  },
  {
    id: 18,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    genre: "Historical Fiction",
    publishedYear: 1939,
    pageCount: 464,
    language: "English",
    publisher: "The Viking Press",
    ISBN: "978-0-14-303943-3",
  },
  {
    id: 19,
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    publishedYear: 1851,
    pageCount: 625,
    language: "English",
    publisher: "Richard Bentley",
    ISBN: "N/A",
  },
  {
    id: 20,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Science Fiction",
    publishedYear: 1979,
    pageCount: 208,
    language: "English",
    publisher: "Pan Books",
    ISBN: "978-0-330-25864-9",
  },
];

const resolvers = {
  Query: {
    books: (_, args) => {
      if (args.title) {
        return books.filter((book) => book.title.includes(args.title));
      } else if (args.skip && args.limit) {
        return books.slice(args.skip, args.skip + args.limit);
      } else {
        return books;
      }
    },
    book: (_, { id }) => {
      return books.find((book) => book.id === id);
    },
  },
  Mutation: {
    createBook: (
      _,
      {
        title,
        author,
        genre,
        publishedYear,
        pageCount,
        language,
        publisher,
        ISBN,
      }
    ) => {
      const newBook = {
        id: books.length + 1,
        title,
        author,
        genre,
        publishedYear,
        pageCount,
        language,
        publisher,
        ISBN,
      };
      books.push(newBook);
      return newBook;
    },
    updateBook: (_, { id, bookInput }) => {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex !== -1) {
        books[bookIndex] = {
          ...books[bookIndex],
          ...bookInput,
        };
        return books[bookIndex];
      } else {
        throw new Error(`Book with ID ${id} not found`);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
