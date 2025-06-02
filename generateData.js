const fs = require('fs');
const { faker } = require('@faker-js/faker');

const users = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 65 })
}));

fs.writeFileSync('userProfiles.json', JSON.stringify(users, null, 2));
