import { connect } from 'mongoose';
import seeders from './';

drop().catch((err) => console.log(err));

async function drop() {
  const mongoose = await connect('mongodb://mongoadmin:bdung@127.0.0.1:27017');

  console.log('Connected to the MongoDB successfully');

  const downs = seeders.map((seeder) => seeder.down());

  await Promise.all(downs);

  console.log("Dropped successfully");

  mongoose.connection.close();
}