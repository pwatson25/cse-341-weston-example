const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Weston's Contacts API",
    description: "An open API for managing contacts",
  },
  host: "cse341node-books.onrender.com",
  schemes: ["http", "https"],
};

const outputFile = "./dist/swagger-output.json";
const outFileTS = "../src/swagger-output.json";
const endpointsFiles = ["./dist/config/routes/cleanRomance.routes.js"];


swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen(outFileTS, endpointsFiles, doc);