import {
  BooksCollection,
  PostsCollection,
  UsersCollection,
} from "./collections.mjs";

export const resolvers = {
  Query: {
    me() {
      return UsersCollection.get(1);
    },
    user(_, { id }) {
      return UsersCollection.get(id);
    },
    users() {
      return UsersCollection.all();
    },
    usersLimit(_, { limit }) {
      return UsersCollection.all().slice(0, limit);
    },
    usersSort(_, { sort }) {
      const users = UsersCollection.all();
      return sort ? users.sort((a, b) => b.id - a.id) : users;
    },
    book(_, { id }) {
      return BooksCollection.get(id);
    },
    books() {
      return BooksCollection.all();
    },
    feed() {
      return PostsCollection.all();
    },
    never() {
      throw new Error("Some Message");
    },
  },
  Mutation: {
    addBook(_, { title }) {
      const book = BooksCollection.add(title);

      return book;
    },
  },
  Subscription: {
    onBook: {
      subscribe: () => {},
    },
  },
  Food: {
    __resolveType(obj) {
      if (obj.ingredients) {
        return "Salad";
      }

      if (obj.toppings) {
        return "Pizza";
      }

      return null;
    },
  },
  Post: {
    comments(post, { filter }) {
      return post.comments.filter(
        (comment) =>
          !filter || comment.toLowerCase().indexOf(filter.toLowerCase()) > -1
      );
    },
  },
};
