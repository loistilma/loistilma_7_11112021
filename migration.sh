# migrate
npx sequelize-cli db:migrate
# seed 
npx sequelize-cli db:seed:all
# generate user model
npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string
# generate user seed
npx sequelize-cli seed:generate --name test-user