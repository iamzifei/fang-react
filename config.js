module.exports = {
    database: process.env.MONGO_URI || 'localhost/nef',
    perPage: 5,
    rentalBuffer: 20,
    rentalMin: 0,
    rentalMax: 2000,
    rentalStep: 10
};
