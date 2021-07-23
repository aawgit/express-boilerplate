import express from 'express';
import userRouter from "./user.controller"
import itemRouter from "./item.controller"


const router = express.Router();

const defaultRoutes = [
    {
        path: '/item',
        route: itemRouter,
    },
    {
        path: '/user',
        route: userRouter,
    },
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;