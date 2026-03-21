const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });

const Genre = require('./src/models/Genre');
const Director = require('./src/models/Director');
const Studio = require('./src/models/Studio');
const MediaType = require('./src/models/MediaType');
const Media = require('./src/models/Media');

const seedData = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected.');

    // Clear existing (drop collections to clear old indexes)
    console.log('Dropping existing collections to clear legacy indexes...');
    const collections = ['genres', 'directors', 'studios', 'mediatypes', 'media'];
    for (const name of collections) {
      try {
        await mongoose.connection.db.dropCollection(name);
        console.log(`Dropped ${name}`);
      } catch (e) {
        console.log(`Collection ${name} might not exist, skipping drop.`);
      }
    }

    // 1. Create Genres
    console.log('Creating Genres...');
    const genres = await Genre.insertMany([
      { name: 'Acción', description: 'Películas de mucha adrenalina' },
      { name: 'Ciencia Ficción', description: 'Exploración del futuro y tecnología' },
      { name: 'Drama', description: 'Historias profundas y emocionales' }
    ]);

    // 2. Create Directors
    console.log('Creating Directors...');
    const directors = await Director.insertMany([
      { name: 'Christopher Nolan', isActive: true },
      { name: 'Greta Gerwig', isActive: true },
      { name: 'Denis Villeneuve', isActive: true }
    ]);

    // 3. Create Studios
    console.log('Creating Studios...');
    const studios = await Studio.insertMany([
      { name: 'Warner Bros.', slogan: 'Believe in the Magic', description: 'Major Hollywood studio', isActive: true },
      { name: 'A24', slogan: 'Independent Spirit', description: 'Boutique production company', isActive: true },
      { name: 'Paramount Pictures', slogan: 'Mountain of Entertainment', description: 'Historic production company', isActive: true }
    ]);

    // 4. Create Media Types
    console.log('Creating Media Types...');
    const types = await MediaType.insertMany([
      { name: 'Película', description: 'Largometraje cinema' },
      { name: 'Serie', description: 'Contenido episódico' }
    ]);

    const typeMovie = types.find(t => t.name === 'Película');
    const typeSeries = types.find(t => t.name === 'Serie');

    // 5. Create Movies (3)
    console.log('Creating Movies...');
    await Media.insertMany([
      {
        serialNumber: 'MOV-001',
        title: 'Inception',
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        url: 'https://www.warnerbros.com/movies/inception',
        posterImage: 'https://image.tmdb.org/t/p/w500/edv5CZvj0Yv9NXO19Cc86EUDzwh.jpg',
        releaseYear: 2010,
        genre: genres[1]._id,
        director: directors[0]._id,
        productionCompany: studios[0]._id,
        type: typeMovie._id
      },
      {
        serialNumber: 'MOV-002',
        title: 'Barbie',
        synopsis: 'Barbie suffers a crisis that leads her to question her world and her existence.',
        url: 'https://www.warnerbros.com/movies/barbie',
        posterImage: 'https://image.tmdb.org/t/p/w500/iuFNmBTD0X4EXI0V9Qp3A6biu9X.jpg',
        releaseYear: 2023,
        genre: genres[2]._id,
        director: directors[1]._id,
        productionCompany: studios[0]._id,
        type: typeMovie._id
      },
      {
        serialNumber: 'MOV-003',
        title: 'Dune: Part Two',
        synopsis: 'Paul Atreides unites with Chani and the Fremen while on a war of revenge.',
        url: 'https://www.dunemovie.net/',
        posterImage: 'https://image.tmdb.org/t/p/w500/8uS6B7777y8vL3wVf7fGgO6uG5R.jpg',
        releaseYear: 2024,
        genre: genres[1]._id,
        director: directors[2]._id,
        productionCompany: studios[0]._id,
        type: typeMovie._id
      }
    ]);

    // 6. Create Series (3)
    console.log('Creating Series...');
    await Media.insertMany([
      {
        serialNumber: 'SER-001',
        title: 'Interstellar (Fake Series)',
        synopsis: 'Exploration beyond our galaxy to save humanity.',
        url: 'https://www.interstellar.com',
        posterImage: 'https://image.tmdb.org/t/p/w500/gEU2QniE6EwfVnz6n2p2oCLha8j.jpg',
        releaseYear: 2014,
        genre: genres[1]._id,
        director: directors[0]._id,
        productionCompany: studios[2]._id,
        type: typeSeries._id
      },
      {
        serialNumber: 'SER-002',
        title: 'Little Women (Fake Series)',
        synopsis: 'Jo March reflects back and forth on her life.',
        url: 'https://www.littlewomen.com',
        posterImage: 'https://image.tmdb.org/t/p/w500/77S9mH8uBg4v96fpkU9pS94CLyc.jpg',
        releaseYear: 2019,
        genre: genres[2]._id,
        director: directors[1]._id,
        productionCompany: studios[1]._id,
        type: typeSeries._id
      },
      {
        serialNumber: 'SER-003',
        title: 'Sicario (Fake Series)',
        synopsis: 'An idealistic FBI agent is enlisted by a government task force.',
        url: 'https://www.sicario.com',
        posterImage: 'https://image.tmdb.org/t/p/w500/8uKzpV9y9y8vL3wVf7fGgO6uG5R.jpg',
        releaseYear: 2015,
        genre: genres[0]._id,
        director: directors[2]._id,
        productionCompany: studios[2]._id,
        type: typeSeries._id
      }
    ]);

    console.log('Database seeded successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedData();
