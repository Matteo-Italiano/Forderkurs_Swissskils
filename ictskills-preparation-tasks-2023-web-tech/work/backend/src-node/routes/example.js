const express = require("express");
const crypto = require("crypto");
const { handleAsync } = require("../helper/util");
const { executeQuery } = require("../db");

const exampleRouter = express.Router();

// Example route that can be deleted or adapted.
// This can be called via GET http://localhost:4000/api/example/blubb
exampleRouter.get(
    "/:var1",
    handleAsync(async (req, res, next) => {
        const results = await executeQuery(
            "SELECT * from canvas where id = ?",
            [1]
        );
        res.send({ foo: "bar", uuid: crypto.randomUUID(), results });
    })
);

module.exports = { exampleRouter };
