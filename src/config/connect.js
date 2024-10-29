import { Sequelize } from 'sequelize'


export const connectDB = (database, username, password, host, port) => {
    const sequelize = new Sequelize(database, username, password,
        {
            host:host,
            port: port,
            dialect: 'postgres'
    });
    return sequelize
}


