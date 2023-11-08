import { Product } from "./db/entities";

export default {
  name: "node_gmp",
  type: "postgres",
  database: "db/dev.db",
  entities: [Product],
  synchronize: true,
  logging: false,
  // These two lines have been added:
  seeds: ["db/seeding/seeds/**/*{.ts,.js}"],
  factories: ["db/seeding/factories/**/*{.ts,.js}"],
};