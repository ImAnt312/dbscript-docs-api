module.exports = {
  endpoint: '/functionslist',
  func: (req, res) => {
    const { getAllFunctions } = require('../../src/getall/functions');
    getAllFunctions(funcList => res.json(funcList));
  }
}