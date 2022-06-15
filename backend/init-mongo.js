db.createUser({
    user: 'oneclick',
    pwd: 'password',
    roles: [
        {
            role: 'userAdmin',
            db: 'oneclick'
        }
    ]
});

db.createCollection('users');