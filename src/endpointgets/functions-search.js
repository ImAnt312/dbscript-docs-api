const {cheerio, request} = require('../../src/dependencies');
module.exports = {
  endpoint: '/search',
  func: (req, res) => {
    const { getAllFunctions } = require('../../src/getall/functions');
    const {q} = req.query;
if (!q) {
  return res.json({message: "No q parameter"});
}
getAllFunctions(funcList => {
const reqFunc = funcList.find(func => func.toLowerCase().split('$').join('').split('[').join('').split(']').join('').trim() == q.toLowerCase().split('$').join('').split('[').join('').split(']').join('').trim()) || funcList.find(func => func.toLowerCase().includes(q.toLowerCase()));
if (!reqFunc) {
  return res.json({message: "not found"});
}
const path = reqFunc.toLowerCase().split('$').join('').split('[').join('').split(']').join('').trim();

const options = {
 url: "https://docs.db-script.com/commands/" + encodeURIComponent(path),
 method: "GET",
 headers: {"user-agent": "Chrome"}
};
request(options, (err, resp) => {
  $ = cheerio.load(resp.body);
  if ($('head title').text().includes('Page not found')) {
    return res.json({message: "not found"});
  };
  const descSpan = $('span.text-4505230f--TextH400-3033861f--textContentFamily-49a318e1');
  var title = $('head title').text().split("-")[0].trim(),
  description = $("meta[property='og:description']").attr("content"),
  usage = $('ul.list-20526648').text().split(']').join(']\n') || $('head title').text().split("-")[0].trim(),
  example = $('.codeLine-a3169fbc').toArray().map(elem => elem.children[0].children[0].children[0].data).join("\n"),
  documentation = "https://docs.db-script.com/commands/" + encodeURIComponent(path);
  res.json({title, description, usage, documentation, example});

})
});
  }
}