const { dbConnection } = require("./mysql");

const uploadURL = (req, res) => {
    const imageURL = req.query.url;
    dbConnection.query(`update uploads
set Image = ${imageURL}
where UserID = 1;`);
    console.log(`controller file`);
};

module.exports = { uploadURL };
