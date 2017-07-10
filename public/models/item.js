const Sequelize = require('sequelize');
const sequelize = new Sequelize('diary', 'root', '',{
    host: 'localhost',
    port: '',
    dialect: 'mysql'});
const item = sequelize.define('item',{
        id:{
            type: 'INTEGER', autoIncrement: true, primaryKey: true
        },
        content: {
            type: 'TEXT',
            validate: {
                notEmpty: false,
                len: [20,500]
            }
        },
        file: {
            type: 'TEXT',
            validate:{
                notEmpty: false,
                len:[4,200]
            }
        },
        title: {
            type:'VARCHAR',
            validate:{
                notEmpty: false,
                len:[4,100]
            }
        }
},{
    tableName: 'item',
});
item.sync();
module.exports = item;