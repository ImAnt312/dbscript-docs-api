module.exports = {
  endpoint: '/',
  func: (req, res) => {
    res.sendFile(__dirname.split('/').slice(0, __dirname.split('/').length - 1).join('/') + '/views/main.html');
  }
}