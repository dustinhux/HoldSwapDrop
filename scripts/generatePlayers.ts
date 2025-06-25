import fs from 'fs';
import csv from 'csv-parser';

interface Player {
  id: string;
  name: string;
  value: number;
  position: string;
  team: string;
}

const results: Player[] = [];

fs.createReadStream('data/players.csv')
  .pipe(csv())
  .on('data', (row) => {
    const name = row.name?.trim();
    const rank = parseInt(row.rk, 10);
    const position = row.pos?.trim() || '';
    const team = row.team?.trim() || '';

    if (!name || isNaN(rank)) return;

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const value = Math.max(1, 10000 - 20 * rank); // New rank-based formula

    results.push({
      id,
      name,
      value,
      position,
      team,
    });
  })
  .on('end', () => {
    const output =
      `export const players = ${JSON.stringify(results, null, 2)} as const;\n`;
    fs.writeFileSync('data/players.ts', output);
    console.log(`✅ Generated data/players.ts with ${results.length} players`);
  });
