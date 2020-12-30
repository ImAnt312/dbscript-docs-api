const blacklist = ['bot.AwaitedCommand', 'bot.ExecutableCommand', 'bot.Status'];
module.exports = {
  getAllEvents: function(fn) {
    const { request, cheerio } = require('../../src/dependencies');
    const options = {
      url: "https://docs.db-script.com/",
      method: "GET",
      headers: {"user-agent": "Chrome"}
    };
    request(options, (err, res) => {
      $ = cheerio.load(res.body);
      const funcArr = $('span.text-4505230f--UIH300-2063425d--textContentFamily-49a318e1--navButtonLabel-14a4968f');
      const functions = funcArr.filter(elem => elem.children && elem.children[0].data.startsWith('$')).prevObject.toArray().map(elem => elem.children[0].data).filter(funcName => `${funcName}`.startsWith('bot.')  && !blacklist.includes(`${funcName}`));
      fn(functions);
    })
  }}