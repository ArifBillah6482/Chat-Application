//Database = MongoDB
const { connect } = require("mongoose");

connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Database connection successful."))
  .catch((err) => console.log(err));
