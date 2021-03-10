{
  "name": "mongo",
  "type": "mongodb",
  "host": "localhost",
  "port": 27017,
  "database": "chat",
  "useUnifiedTopology": true,
  "entities": [
    "./src/modules/**/infra/typeorm/schemas/*.ts"
  ]
}
