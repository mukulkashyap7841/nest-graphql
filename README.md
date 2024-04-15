# GraphQL


GraphQL is a query language where you can request only the data you need, which can lead to more efficient and faster applications,

## Installation

1. Clone the Repository 
2. Create a .env file at root, and set a new pair as ```DATABASE_URL=mysql://root:password@localhost:3306/graphql```
3. Use the npm package manager to install the below dependencies.

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed
npm run start:dev
```

Now, NestJS application is running on port 4000. Open the URL on browser
```http://localhost:4000/graphql```
If you see a playground, then congrats you have successfully setup graphql playground.

## To execute a Query

```javascript
# returns 'Users'
query {
	users {
    id
    name
    created_on
  }
}

# returns 'User by ID'
query {
	user(id:1){
    id
    name
    created_on
  }
}
```

## To Add, Update or Delete then we use Mutations
``` javascript
# returns 'Creates a new User with name and email and returns name and email'
mutation {
  addUser(createUserInput:{
    name:"Nitin Reddy",
    email:"nitin.reddy@gmail.com"
  }){
    name
    email
  }
}

# returns 'Updates a User by ID and returns name and email'
mutation {
  updateUser(id:1,updateUserInput:{
    name:"Nitin kumar",
    email:"nitin.kumar@gmail.com"
  }){
    name
    email
  }
}

# returns 'Deletes a User by ID'
mutation {
  deleteUser(id:3){
    name
    email
  }
}
```

## To Subscribe to any event
```javascript
# returns 'when a event i.e; userCreated gets published then the event inside sendSignupEmail will be triggered '
subscription {
  sendSignupEmail {
    id
    name
    email
  }
}
```

## For any queries, you can connect with me on LinkedIn
- https://www.linkedin.com/in/mukul-kashyap-a24b46129/
