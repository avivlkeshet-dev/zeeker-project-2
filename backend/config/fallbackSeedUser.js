const seedUsers = [
  {
    _id: 'seed-fallback-user-1',
    firstName: 'יואב',
    lastName: 'כהן',
    personalId: '123456789',
    birthDate: new Date('1990-04-12'),
    phone: '0501234567',
    email: 'yoav.cohen@example.com',
    city: 'תל אביב',
    street: 'הרצל',
    houseNumber: '12',
    plateNumber: '123-45-67',
  },
  {
    _id: 'seed-fallback-user-2',
    firstName: 'נועה',
    lastName: 'לוי',
    personalId: '234567891',
    birthDate: new Date('1988-09-03'),
    phone: '0529876543',
    email: 'noa.levi@example.com',
    city: 'חיפה',
    street: 'הנביאים',
    houseNumber: '8',
    plateNumber: '456-78-90',
  },
  {
    _id: 'seed-fallback-user-3',
    firstName: 'דניאל',
    lastName: 'מזרחי',
    personalId: '345678912',
    birthDate: new Date('1995-01-21'),
    phone: '0541122334',
    email: 'daniel.mizrahi@example.com',
    city: 'ירושלים',
    street: 'יפו',
    houseNumber: '101',
    plateNumber: '789-12-34',
  },
];

// First entry kept as named export for places that need a single fallback user
const fallbackSeedUser = seedUsers[0];

module.exports = {
  fallbackSeedUser,
  seedUsers,
};
