const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Village Lane Publishing Books",
    description: "An open API for managing contacts",
  },
  host: "",
  schemes: ["http", "https"],
};

const outputFileDist = "./dist/swagger-output.json";
const outputFileTS = "./src/swagger-output.json";

const endpointsFiles = [
  "./dist/config/routes/cleanRomance.routes.js",
  "./dist/config/routes/fairytale.routes.js",
];

swaggerAutogen(outputFileDist, endpointsFiles, doc);
swaggerAutogen(outputFileTS, endpointsFiles, doc);