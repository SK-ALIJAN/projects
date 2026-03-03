const express = require('express');
const router = express.Router();

router.get('/health', (_req: Request, res: Response): void => {
    // res.status(status.OK).json({
    //     status: 'UP',
    //     service: 'SyncTalk Backend',
    //     uptime: process.uptime(),
    //     timestamp: new Date().toISOString(),
    //     version: process.env.npm_package_version
    // });
});


module.exports = router;