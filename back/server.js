const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

app.listen(3000, () => console.log("Server ready"));
