import UserRepo from "repository/user.repository";

const userRepo = new UserRepo();

export const userResolvers = {
  Query: {
    async getAllUsers() {
      try {
        const data = await userRepo.getAll({});
        return data;
      } catch (error) {
        console.log({ error });
      }
    },
    async getUserById(parent: unknown, args: { id: number }) {
      try {
        const data = await userRepo.get({ where: { id: args.id } });
        return data;
      } catch (error) {
        console.log({ error });
      }
    },
  },
  Mutation: {
    async createUser(parent: unknown, args: any) {
      try {
        const result = await userRepo.create(args.createParam);
        return result;
      } catch (error) {
        console.log({ error });
      }
    },
    async updateUser(parent: unknown, args: any) {
      try {
        const isExist = await userRepo.get({ where: { id: args.id } });
        if (!isExist) {
          throw new Error("User does not exist");
        }
        const [affectedCount, returnData] = await userRepo.update(
          { ...args.updateParam },
          { where: { id: args.id } }
        );
        return returnData[0];
      } catch (error) {
        console.log({ error });
      }
    },
    async deleteUser(parent: unknown, args: any) {
      try {
        const isExist = await userRepo.get({ where: { id: args.id } });
        if (!isExist) {
          throw new Error("User does not exist");
        }
        const result = await userRepo.deleteData({ where: { id: args.id } });
        return isExist;
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
