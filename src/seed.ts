import { createConnection } from 'typeorm';

console.log('Seeding the database...');

createConnection()
  .then((connection) => {
    console.log('Seeding the database completed!');

    // Seeding

    process.exit(0);
  })
  .catch((error) => console.log(error));
