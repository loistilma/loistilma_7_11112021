# generate model
npx sequelize-cli model:generate --name Tablename --attributes row:type,row:type
# run migrate
npx sequelize-cli db:migrate
# undo last migrate
npx sequelize-cli db:migrate:undo
# run seeds
npx sequelize-cli db:seed:all
# undo seeds
npx sequelize-cli db:seed:undo:all
# generate seed
npx sequelize-cli seed:generate --name data-name
# create migration skeleton
npx sequelize-cli migration:generate --name migration-skeleton-name