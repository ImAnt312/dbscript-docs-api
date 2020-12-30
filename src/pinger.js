const { fetch } = require('./dependencies');
module.exports = {
  launch: function() {
    setInterval(async function() {
      await fetch("https://dbscript-docs-api.bacontroll393.repl.co");
    }, 3000);
  }
}