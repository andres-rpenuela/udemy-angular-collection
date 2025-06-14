const { writeFileSync, mkdirSync } = require( 'fs');

// reuqeire dotenv to load environment variables from .env file

//require( 'dotenv' ).config();
require('dotenv').config({ path: 'envs/.env' }); // los .env esta en otra ruta


const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

console.log(process)
// contenido del fichero de entorno
const appName = process.env['APP_NAME'];


if( !appName ) { //if( !process.env['APP_NAME']) {
  throw new Error( 'APP_NAME is not set in .env file' );
}

const envFileContent = `
export const environment = {
  appName:"${appName}"
};
`;

// se crea el fichero de entorno (si no existe tambien)
mkdirSync('./src/environments', { recursive: true });

// se escribe el fichero de entorno
writeFileSync(targetPath, envFileContent, { encoding: 'utf8' });
writeFileSync(targetPathDev, envFileContent, { encoding: 'utf8' });
