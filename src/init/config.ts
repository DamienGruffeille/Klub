import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
};

// renvoie un objet qui contient les infos liées au fichier .env
