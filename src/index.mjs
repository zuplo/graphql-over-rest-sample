import { useSofa } from "sofa-api";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import { resolvers } from "./resolvers.mjs";
import { typeDefs } from "./schema.mjs";

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  "/api",
  useSofa({
    basePath: "/api",
    schema,
  })
);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
