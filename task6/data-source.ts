import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./db/entities";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "node_gmp",
    password: "password123",
    database: "default",
    synchronize: true,
    logging: false,
    entities: [Product],
    migrations: [],
    subscribers: [],
});
