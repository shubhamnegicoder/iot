module.exports = [
    {
        key: 'dashboard',
        name: 'Dashboard',
        icon: 'laptop',
        clickable: true
    }, 
    {
        key: 'customer',
        name: 'Customer',
        icon: 'team',
        clickable: true
    },
    {
        key: 'asset',
        name: 'Assets',
        icon: 'laptop',
        clickable: false,
        child: [
            {
                key: 'assets',
                name: 'Assets'
            },
            {
                key: 'assets_type',
                name: 'Assets Type'
            }
           
        ]
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
                key: 'user',
                name: 'User'
            },
            {
                key: 'user_type',
                name: 'User Type'
            }
        ]
    }
]
