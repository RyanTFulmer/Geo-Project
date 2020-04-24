const csv = require('csv-parse');
const fs = require('fs');

fs.createReadStream('./raw_data/Coordinates_by_state.csv')
  .pipe(csv())
  .on('data', (row) => {
    `,${row[0]}: {north: ${row[1]}, west: ${row[2]}}`;
    console.log(`${row[0]}: {north: ${row[1]}, west: ${row[2]}},`);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
