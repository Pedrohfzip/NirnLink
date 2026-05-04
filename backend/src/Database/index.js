import { Sequelize } from "sequelize";

const sequelize = new Sequelize("nirnLink", "postgres", "123", {
  host: "localhost",
  dialect: "postgres"
});

export default async function databaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}

