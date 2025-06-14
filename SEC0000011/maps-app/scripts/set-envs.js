const { writeFileSync, mkdirSync } = require( 'fs');

// reuqeire dotenv to load environment variables from .env file

require( 'dotenv' ).config();


const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

// contenido del fichero de entorno
const mapboxKey = process.env['MAPBOX_KEY'];


if( !mapboxKey ) { //if( !process.env['MAPBOX_KEY']) {
  throw new Error( 'MAPBOX_KEY is not set in .env file' );
}

const envFileContent = `
export const environment = {
  mapboxKey:"${mapboxKey}"
};
`;

// se crea el fichero de entorno (si no existe tambien)
mkdirSync('./src/environments', { recursive: true });

// se escribe el fichero de entorno
writeFileSync(targetPath, envFileContent, { encoding: 'utf8' });
writeFileSync(targetPathDev, envFileContent, { encoding: 'utf8' });
