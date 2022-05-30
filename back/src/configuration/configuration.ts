
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  dataSource: process.env.DATA_SOURCE || '../data/data.json',
});
