import { DataSource } from 'typeorm'
import { entities } from './entities'

export const AppDataSource = new DataSource({
    type: 'postgres',
    // HOST = NOM DE SERVICE COMPOSE
    host: 'postgres',
    port: 5432,
    username: 'user',
    password: 'pass',
    database: 'treasure',
    // synchronise les modèles avec la base (utile pour dev)
    synchronize: true,
    logging: false,
    entities: [...entities],
})