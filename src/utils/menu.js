module.exports = [
    {
        key: 'dashboard',
        name: 'Dashboard',
        icon: 'laptop',
        clickable: true
    }, 
    {
        key: 'asset',
        name: 'Assets',
        icon: 'team',
        clickable: false,
    },
    {
        key: 'assets_type',
        name: 'Assets Type',
        icon: 'pushpin-o',
        clickable: true
    }, 
     {
        key: 'device',
        name: 'Devices',
        icon: 'pushpin-o',
        clickable: true
    }, 
    {
        key: 'user',
        name: 'Users',
        icon: 'team',
        clickable: false,
        child: [
            {
                key: 'users',
                name: 'Users'
            },
            {
                key: 'user_type',
                name: 'User Type'
            }
        ]
    }
]
