export const userTypeDef = `
  type SaveUser {
    name: String
    email: String
    password:String
  }

  type GetUser {
    name: String
    email: String
    password:String
    id:String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  input UserUpdate {
    name: String!
    email: String!
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

