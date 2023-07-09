# React Query Tutorial

## Introduction to React Query

- Data fetching: React Query provides a simple and flexible API for fetching data. It supports different types of data sources, such as REST APIs, GraphQL API, and more. It also supports different types of queries, such as queries with pagination and queries with filters.
- Caching: React Query caches data by default, which means that it can minimize the number of network requests made by your application. It also supports various cache policies, such as time-based expiration and stale-while-revalidate.
- Data mutations: React Query provides an easy way to mutate data. It supports optimistic updates, which means that it can update the UI immediately, without waiting for the network response.
- Error handling: React Query provides a unified way to handle errors. It supports retrying failed queries, automatic error retries, and more.
- Query invalidation: React Query supports automatic query invalidation. This means that if the data changes on the server, the query will be automatically refetched.

## Essential Hooks

- `useQuery`: This hook is used for fetching data. It takes a query key and a fetch function as arguments, and returns the data, status and error of the query. The hook also caches the data by default.
- `useMutation`: This hook is used for mutating data. It takes a mutation function as an argument, and returns a mutate function and the status of the mutation. This hook also provides optimistic update by default.
- `useQueryClient`: This hook is used for accessing the query client instance. It returns an instance of the QueryClient class, which can be used to manage queries manually, invalidate queries, and more

## Fetching and Validation

- `useQuery`
- `useQueryClient`

## Mutation/Updating

- `useMutation`

## Installation

[React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)

```bash
$ npm i @tanstack/react-query
# or
$ pnpm add @tanstack/react-query
# or
$ yarn add @tanstack/react-query
```

[Quick Start](https://tanstack.com/query/v4/docs/react/quick-start)

### Setup in Nextjs

- /pages/_app.js

```javascript
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

## Data Fetching

You have to use `useQuery` hook to fetching data. [useQuery docs](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```javascript
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const getAllTodos = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todoss",
      );
      return res.data;
    } catch (error) {
      return Promise.reject(new Error(error));
    }
  };

  const {
    data: todos,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get", "todos"],
    queryFn: getAllTodos,
  });

  return (
    <div>
      {isLoading && "Loading..."}
      {isError && "Something wrong"}
      {isSuccess &&
        todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.id} - {todo.title}
            </li>
          );
        })}
    </div>
  );
};

export default Home;
```