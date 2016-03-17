module.exports = {
    database: process.env.MONGO_URI || 'localhost/nef',
    perPage: 5,
    rentalBuffer: 20,
    rentalMin: 0,
    rentalMax: 2000,
    rentalStep: 10,

    iconMapping: {
      apartment: 'flaticon-apartment',
      house: 'flaticon-house',
      studio: 'flaticon-apartment',
      whole: 'flaticon-apartment',
      private: 'flaticon-private-room',
      shared: 'flaticon-shared-room',
      living: 'flaticon-living-room',
      master: 'flaticon-master-room',
      car: 'flaticon-garage',
      furnished: 'flaticon-furnished',
      femalePrefer: 'flaticon-female-prefer',
      nonSmoker: 'flaticon-no-smoking',
      petAllowed: 'flaticon-pet-friendly',
      billInclude: 'flaticon-bill-included',
      fastInternet: 'flaticon-internet'
    }
};
