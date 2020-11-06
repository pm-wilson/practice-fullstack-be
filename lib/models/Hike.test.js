const fs = require('fs');
const pool = require('../utils/pool');
const Hike = require('./Hike');

describe('Hike model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new hike and adds to the database and finds it by id', async() => {
    const createdHike = await Hike.insert({
      name: 'Angels Rest',
      address: '47786-47858 Historic Columbia River Hwy, Corbett, OR 97019',
      length: 4,
      elevation: 1476,
      note: 'out and back hike',
    });
    
    const foundHike = await Hike.findById(createdHike.id);

    expect(foundHike).toEqual(createdHike);
  });

  it('creates a hike, updates it and finds the updated hike', async() => {
    const createdHike = await Hike.insert({
      name: 'Angels Rest',
      address: '47786-47858 Historic Columbia River Hwy, Corbett, OR 97019',
      length: 7,
      elevation: 450,
      note: 'out and back hike',
    });

    const updatedHike = await Hike.updateById(createdHike.id, {
      name: 'Angels Rest',
      address: '47786-47858 Historic Columbia River Hwy, Corbett, OR 97019',
      length: 4,
      elevation: 1476,
      note: 'out and back hike',
    });

    const foundHikes = await Hike.find();

    expect(foundHikes[0]).toEqual(updatedHike);
  });

  it('creates two hikes and deletes one and finds only the remaining when searching all', async() => {
    const createdHike = await Hike.insert({
      name: 'Angels Rest',
      address: '47786-47858 Historic Columbia River Hwy, Corbett, OR 97019',
      length: 4,
      elevation: 1476,
      note: 'out and back hike',
    });

    const createdHike2 = await Hike.insert({
      name: 'Coyote Wall Hike',
      address: 'Old Hwy 8 White Salmon, WA 98672',
      length: 7,
      elevation: 1775,
      note: 'hike with a better and better view of Mt. Hood with every step',
    });

    Hike.deleteById(createdHike.id);

    const foundHikes = await Hike.find();

    expect(foundHikes[0]).toEqual(createdHike2);
  });
});
