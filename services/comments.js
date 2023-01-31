import pkg from 'pg';
const { Client } = pkg;
import { v4 as uuidv4 } from 'uuid';
// import { DataTypes, Sequelize } from 'sequelize';

// const sequelize = new Sequelize('test_zusn', 'test_zusn_user', 'kJrUAYN3i4Q5D6ZSVrDcePPNrsIAXHhF', {
//   host: 'dpg-cf962jarrk0e2av109fg-a.oregon-postgres.render.com',
//   // ssl: true,
//   dialect: 'postgres',
// });

// const sequelize = new Sequelize('postgres', 'postgres', 'kozak1488', {
//   host: 'localhost',
//   ssl: true,
//   dialect: 'postgres',
// });

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// const Comment = sequelize.define('Comment', {
//   id: {
//     type: DataTypes.STRING,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   useremail: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   homepage: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   likes: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   parentid: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   text: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   hascomments: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     field: 'created_at',
//     defaultValue: DataTypes.NOW
//   }
 
// }, {
//   tableName: 'comments',
//   updatedAt: false,
// });

const client = new Client({
  host: 'dpg-cf962jarrk0e2av109fg-a.oregon-postgres.render.com',
  user: 'test_zusn_user',
  password: 'kJrUAYN3i4Q5D6ZSVrDcePPNrsIAXHhF',
  port: 5432,
  database: 'test_zusn',
  ssl: true,
});

client.connect((e) => {
  if (e) {
    console.log(e.message)
  } else {
    console.log('no errors')
  }
});

export const getAllComments = async () => {
  const result = await client.query(`
  SELECT * FROM public.comments
  WHERE parentid = ''
  ORDER BY created_at ASC
  `);
  return result.rows;
};

export const getSelectedComments = async (parentid) => {
  const result = await client.query(`
  SELECT * FROM public.comments
  WHERE parentid='${parentid}'
  ORDER BY created_at DESC  
  `);
  return result.rows;
};

export const addComment = async (comment) => {
  const {username, useremail, text, homepage, likes, hascomments, parentid} = comment;
  const id = uuidv4();
  comment.id = id;
  console.log(comment)
  const result =  await client.query(`
  INSERT INTO comments (id, username, useremail, text, homepage, likes, parentid, hascomments)
  VALUES ('${id}', '${username}', '${useremail}', '${text}', '${homepage}', '${likes}', '${parentid}', '${hascomments}');
  UPDATE comments
  SET hascomments='TRUE'
  WHERE id = '${parentid}'
  `)
}