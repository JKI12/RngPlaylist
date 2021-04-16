const nedb = require('nedb');
const shuffle = require('shuffle-array');

const db = new nedb({ filename: 'tracks.db' });

db.loadDatabase(() => {
  const tracks = db.getAllData().reduce((acc, current) => {
    const copy = [...acc];
  
    if (copy.find(x => x.id == current.id)) {
      return copy;
    }
  
    copy.push(current);
  
    return copy;
  }, []);

  shuffle(tracks);

  const output = tracks.slice(0, 30);

  console.log(output.map(x => `spotify:track:${x.id}`).join(','));
});