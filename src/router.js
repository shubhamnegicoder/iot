import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'

export default function ({history,app}) {

    const routes = [
        {
            path: '/',
            component:App,
            getIndexRoute(nextState, cb) {
                require.ensure([], require => {
                    cb(null, {component: require('./routes/dashboard_1')})
                    cb(null, {component: require('./routes/login')})
                })
            },
            childRoutes: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/dashboard_1'))
                        })
                    }
                },
                {
                    path: 'devicemap',
                    name: 'devicemap',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/map/devicemap'))
                        })
                    }
                },
                {
                    path: 'asset/assets',
                    name: 'asset/assets',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/asset/assets'))
                        })
                    }
                },
                {
                    path: 'asset/assets_type',
                    name: 'asset/asset_type',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/asset/assets_type'))
                        })
                    }
                },
                {
                    path: 'device',
                    name: 'device',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/table/device'))
                        })
                    }
                },
                {
                    path: 'user/users',
                    name: 'user/users',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/user/users'))
                        })
                    }
                },
                {
                    path: 'user/user_type',
                    name: 'user/user_type',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/user/user_type'))
                        })
                    }
                },
               {
                    path: 'regions',
                    name: 'regions',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/table/regions'))
                        })
                    }
                }, {
                    path: 'pages/blank',
                    name: 'pages/blank',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/pages/blank'))
                        })
                    }
                },
                 {
                    path: 'pages/login-page',
                    name: 'pages/login-page',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/pages/login-page'))
                        })
                    }
                },
                 {
                    path: 'pages/signup',
                    name: 'pages/signup',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/pages/signup'))
                        })
                    }
                },
                {
                    path: 'zone',
                    name: 'zone',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/zone'))
                        })
                    }

                },
                {
                    path: 'branch',
                    name: 'branch',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/table/branch'))
                        })
                    }
                },
                {
                    path: '*',
                    name: 'error',
                    getComponent(nextState, cb) {
                        require.ensure([], require => {
                            cb(null, require('./routes/error'))
                        })
                    }
                }

            ]
        }
    ]

    return <Router history={history} routes={routes}/>
}
