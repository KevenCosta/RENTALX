//import { Connection } from 'sequelize/types/lib/connection-manager';
import { createConnection, getConnectionOptions, Connection } from 'typeorm';

// interface IOptions {
//   host: string;
// }

// //createConnection('database');
// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   newOptions.host = 'database_ignite'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados...Ou ao nome do banco ?
//   createConnection({
//     ...options,
//   });
// });

export default async():Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      database: 
      process.env.NODE_ENV === "test"
      ? "rentx_test"
      : defaultOptions.database
    })
  )
}