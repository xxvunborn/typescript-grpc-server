import * as path from "path";
import Mali from "mali";

import DB, { postgresParams } from './database/postgres'
import CRUD from './database/postgres/crud'
import SERVICES from "./services/Todo";

const PROTO_PATH = path.resolve(__dirname, "../../protos/todo.proto");

class App {
  port: number;
  server: any;

  public constructor(port: number) {
    this.port = port;
  }

  public async start(this: App) {

    const dbParams = <postgresParams> {
      user: "acidlabs",
      host: "localhost",
      port: 5432,
      database: "test",
      password: "",
    }

    const db = new DB(dbParams); 
    const crud = new CRUD(db);
    const services = new SERVICES(crud);

    this.server = new Mali(PROTO_PATH, "Todos");

    this.server.use({getById: services.GetById});
    this.server.use({getAll: services.GetAll});
    this.server.use({create: services.Create});
    this.server.use({update: services.Update});
    this.server.use({delete: services.Delete});

    this.server.start(`0.0.0.0:${this.port}`);
    console.log(`Todos service running at: 0.0.0.0:${this.port}`);
  }
}

export default App;
