'use strict';
const cats = [
  {
    id: '1',
    name: 'Frank',
    birthdate: '2010-10-30',
    weight: '5',
    owner: '1',
    filename: 'http://placekitten.com/400/300',
  },
  {
    id: '2',
    name: 'James',
    birthdate: '2015-12-25',
    weight: '11',
    owner: '2',
    filename: 'http://placekitten.com/400/302',
  },
];

const getCat = (catId) => {
  // TODO find single cat from cats-array and return it
  const cat = cats.find(cat => cat.id == catId);
  return cat;
};

module.exports = {
  cats,
  getCat,
};
