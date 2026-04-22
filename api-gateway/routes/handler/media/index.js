const { get } = require("../../media");
const create = require("./create");
const getAll = require("./getAll");
const del = require("./destroy");
module.exports = {
    create,
    getAll,
    del,
};
