const { cheerio, request } = require('../../src/dependencies');
module.exports = {
  endpoint: '/eventssearch',
  func: (req, res) => {
        const { getAllEvents } = require('../../src/getall/events');
    const {q} = req.query;
if (!q) {
  return res.json({message: "No q parameter"});
}
getAllEvents(funcList => {
const reqFunc = funcList.find(func => func.toLowerCase().split('.').join('').split('bot').join('') == q.toLowerCase().split('.').join('').split('bot').join('')) || funcList.find(func => func.toLowerCase().includes(q.toLowerCase()));
if (!reqFunc) {
  return res.json({message: "not found"});
}
const path = reqFunc.toLowerCase().split('.').join('');

const options = {
 url: "https://docs.db-script.com/events/" + encodeURIComponent(path),
 method: "GET",
 headers: {"user-agent": "Chrome"}
};
request(options, (err, resp) => {
  $ = cheerio.load(resp.body);
  if ($('head title').text().includes('Page not found')) {
    return res.json({message: "not found"});
  };
  var title = $('head title').text().split('-')[0].trim(),
  desc = $("meta[property='og:description']").attr('content'),
  example = $('head title').text().split('-')[0].trim() + '({' + $('.codeLine-a3169fbc').toArray().map(elem => elem.children[0].children[0].children[0].data).join("\n").split($('head title').text().split('-')[0].trim() + '({').pop(),
  usage = $('head title').text().split('-')[0].trim() + '({' + $('.codeLine-a3169fbc').toArray().map(elem => elem.children[0].children[0].children[0].data).join("\n").split($('head title').text().split('-')[0].trim() + '({')[1],
  documentation = "https://docs.db-script.com/events/" + encodeURIComponent(path);
 res.json({title, desc, example, usage, documentation});
  })
})
  }}