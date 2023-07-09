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