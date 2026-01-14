db = db.getSiblingDB('devops_lab1')

db.createUser({
  user: 'subadmin',
  pwd: 'subadmin',
  roles: [
    { role: 'readWrite', db: 'devops_lab1' },
    { role: 'read', db: 'admin' }
  ]
})

db.auth('subadmin', 'subadmin')

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'password', 'createdAt'],
      properties: {
        username: { bsonType: 'string' },
        password: { bsonType: 'string' },
        createdAt: { bsonType: 'date' }
      }
    }
  }
})

const users = [
  {
    username: 'user1',
    password: '123456',
    createdAt: new Date()
  },
  {
    username: 'user2',
    password: '123456',
    createdAt: new Date()
  },
  {
    username: 'user3',
    password: '123456',
    createdAt: new Date()
  }
]

db.users.insertMany(users)
print('✅ Users created successfully')