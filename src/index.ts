import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT || 8000);
  app.use(express.json());

  // creating the graphql server
  const gqlserver = new ApolloServer({
    typeDefs: `
    type Query {
        hello:String
        sayname(name:String):String
    }
 
    `, //Schema
    resolvers: {
      Query: {
        hello: () => `hello there I am the graphql server`,
        sayname: (_, { name }: { name: String }) => `I am the ${name} wick`,
      },
    },
  });
  //executing the graphql server
  await gqlserver.start();

  app.get("/", (req, res) => {
    res.json({
      message: "Server is up and running",
    });
  });

  app.use("/graphql", expressMiddleware(gqlserver));

  app.listen(PORT, () => {
    console.log(`Server started at PORT: http://localhost:${PORT}`);
  });
}

init();
