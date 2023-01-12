const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes')

router.use('ldh-mvc-blog/api', apiRoutes);
router.use('ldh-mvc-blog/', homeRoutes);
router.use('ldh-mvc-blog/dashboard', dashboardRoutes)

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;