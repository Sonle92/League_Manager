import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'Nestjs',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/modules/**/databases/migrations/*.js'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
