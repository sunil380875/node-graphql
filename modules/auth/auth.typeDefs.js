export const authTypeDef = `
    input LoginInput {
        email: String!
        password:String!
    }

    type GetUser {
        name: String
        email: String
        id:String
        token:String
    }

    type Mutation {
        login(body: LoginInput!): GetUser
        signup(body: UserInput!): GetUser
    }
    type Query {
        profile: GetUser
    }
`