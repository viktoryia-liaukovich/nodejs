import { Document, connect } from 'mongoose';
import seeders from './';

seed().catch((err) => console.log(err));

async function seed() {
  const mongoose = await connect('mongodb://mongoadmin:bdung@mongo:27017');

  console.log('Connected to the MongoDB successfully');

  const entities: Document<unknown>[] = [];

  seeders.forEach((seeder) => {
    entities.push(...seeder.up(entities as any));
  });

  await Promise.all(entities.map((entity) => entity.save()));

  console.log("Seeded successfully");

  mongoose.disconnect();
}