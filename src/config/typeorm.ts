import { registerAs } from '@nestjs/config'
import{config as dotenvConfig}from 'dotenv'
import { Categories } from 'src/entities/categoris.entities'
import { OrderDetails } from 'src/entities/orderDetails.entities'
import { Orders } from 'src/entities/orders.entities'
import { Products } from 'src/entities/products.enties'
import { Users } from 'src/entities/user.entities'
import { DataSource, DataSourceOptions } from 'typeorm'


dotenvConfig({path:'.development.env'})

const config={
    type: "postgres",
    host: process.env.DB_HOST ,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    entities: [Users,Products,Orders,OrderDetails,Categories],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities:true,
    synchronize: true,
    dropSchema:false,
}

export default registerAs('typeorm',()=>config)
export const connectionSource=new DataSource(config as DataSourceOptions)         