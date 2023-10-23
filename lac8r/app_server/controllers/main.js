const index = (req, res, next) => {
    res.render('index', { title: 'Home Page', nama: 'Nur Rachmat' });
};

module.exports = {
    index, 
}
