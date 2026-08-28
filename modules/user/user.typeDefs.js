export const userTypeDef = `
  type SaveUser {
    name: String
    email: Email
    password:String
  }

  type GetUser {
    name: String
    email: Email
    password:String
    id:String
  }

  input UserInput {
    name: String!
    email: Email!
    password: String!
  }
  input UserUpdate {
    name: String!
    email: Email!
  }
  type Mutation {
    saveUser(input: UserInput!): SaveUser
    updateUser(id:ID!,body:UserUpdate):SaveUser
  }

  type Query {
    getAllUser:[GetUser]
    getUserById(id: ID!): GetUser
  }
`;

