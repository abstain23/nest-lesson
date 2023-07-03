const mysql = require('mysql2/promise');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '123456',
//   database: 'practice',
// });

// connection.query(
//   'select * from customers where name like ?',
//   ['张%'],
//   (err, res, fields) => {
//     console.log('res', res);
//     console.log(fields.map((item) => item.name));
//   },
// );

// connection.execute(
//   'INSERT INTO customers (name) VALUES (?)',
//   ['光'],
//   (err, results, fields) => {
//     console.log(err);
//   },
// );

// connection.execute(
//   'UPDATE customers SET name="guang" where name="光"',
//   (err) => {
//     console.log(err);
//   },
// );

// connection.execute('DELETE  FROM customers where name=?', ['guang'], (err) => {
//   console.log(err);
// });

// (async function () {
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '123456',
//     database: 'practice',
//   });

//   const [results, fields] = await connection.query('SELECT * FROM customers');

//   console.log(results);
//   console.log(fields.map((item) => item.name));
// })();

(async function () {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'practice',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  const [results] = await pool.query('select * from customers');
  console.log(results);
})();
