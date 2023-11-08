import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import { Product } from "../../entities";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const products = await factory(Product)().createMany(15);
  }
}