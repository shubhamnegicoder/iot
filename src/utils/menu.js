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
        icon: 'team',
        clickable: false,
        child: [
            {
                key: 'assets_type',
                name: 'Assets Type'
            }
            // {
            //     key: 'user_type',
            //     name: 'User Type'
            // }
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
