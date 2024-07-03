# PNAP

This is a boilerplate project for building a GraphQL API using Apollo Server, Express, Prisma, and PostgreSQL.

## Project Structure

```
PNAP/
├── src/
│   ├── graphql/
│   │   ├── resolvers/
│   │   │   ├── userResolver.ts
│   │   │   ├── postResolver.ts
│   │   │   └── index.ts
│   │   ├── schemas/
│   │   │   ├── userSchema.ts
│   │   │   ├── postSchema.ts
│   │   │   └── index.ts
│   │   └── context.ts
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── models/
│   │   ├── User.ts
│   │   └── Post.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── postRoutes.ts
│   ├── services/
│   │   ├── userService.ts
│   │   └── postService.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── helpers.ts
│   ├── index.ts
│   ├── server.ts
│   ├── config.ts
│   └── app.ts
├── tests/
│   ├── unit/
│   │   ├── userService.test.ts
│   │   └── postService.test.ts
│   └── integration/
│       ├── userResolver.test.ts
│       └── postResolver.test.ts
├── .env
├── .gitignore
├── package.json
├── nodemon.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL installed and running
- Prisma CLI installed globally (`npm install -g prisma`)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/my-app.git
   cd my-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   ```

4. **Set up Prisma:**

   ```sh
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Seed the database:**

   ```sh
   npm run seed
   ```

### Running the Development Server

To start the development server with `nodemon`, use the following command:

```sh
npm run dev:watch
```

This will start the server at `http://localhost:4000`.

### Running Tests

To run unit and integration tests, use the following command:

```sh
npm test
```

### GraphQL Playground

You can access the GraphQL Playground to interact with your API at `http://localhost:4000/graphql`.

## Usage

### Example Queries and Mutations

#### Query for Users
```graphql
query {
  users {
    id
    email
    name
    posts {
      id
      title
      content
    }
  }
}
```

#### Query for a Single User by ID
```graphql
query {
  user(id: 1) {
    id
    email
    name
    posts {
      id
      title
      content
    }
  }
}
```

#### Query for Posts
```graphql
query {
  posts {
    id
    title
    content
    published
    author {
      id
      email
      name
    }
  }
}
```

#### Query for a Single Post by ID
```graphql
query {
  post(id: 1) {
    id
    title
    content
    published
    author {
      id
      email
      name
    }
  }
}
```

#### Mutation to Create a User
```graphql
mutation {
  createUser(email: "newuser@example.com", name: "New User") {
    id
    email
    name
  }
}
```

#### Mutation to Create a Post
```graphql
mutation {
  createPost(title: "New Post", content: "This is a new post", authorId: 1) {
    id
    title
    content
    published
    author {
      id
      email
      name
    }
  }
}
```

## License

