import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { schema } from "./graphQL/schema";
import cors from "cors";
import { NODE_ENV } from "./config";

interface MyContext {
  token?: string;
}

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public httpServer: http.Server;
  private server: any;

  constructor() {
    this.app = express();
    this.port = 4000;
    this.env = NODE_ENV || "development";
    this.initializeMiddleware();
    this.httpServer = http.createServer(this.app);
    this.server = new ApolloServer<MyContext>({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
    });
  }

  private initializeMiddleware() {
    this.app.use(cors());
  }

  private startServer = async () => {
    await this.server.start();
    this.app.use(
      "/",
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(this.server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      })
    );
  };

  public listen = async () => {
    await this.startServer();
    console.log(`=================================`);
    console.log(`======= ENV: ${this.env} =======`);
    console.log(`🚀 App listening on the port ${this.port}`);
    console.log(`=================================`);
    this.httpServer.listen(this.port);
  };
}
export default App;