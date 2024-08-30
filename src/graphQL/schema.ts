import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDef } from "./typeDef/user.typeDef";
import { userResolvers } from "./resolvers/user.resolvers";

const typeDefs = mergeTypeDefs([userTypeDef /*, otherTypeDef*/]);
const resolvers = mergeResolvers([userResolvers /*, otherResolvers*/]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
