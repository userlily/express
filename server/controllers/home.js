module.exports = {

  async indexPage ( req, res, next ) {
    if(!req.session.name){
      console.log(req.ip)
      req.session.name = '首页'
    }
    await  res.render('home', { title: `Express-姊妹湖-session${req.session.name}`});
  },

}