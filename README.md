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

### Fetching and Validation

- `useQuery`
- `useQueryClient`

### Mutation/Updating

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

### Setup in Nextjs 

[Quick Start](https://tanstack.com/query/v4/docs/react/quick-start)

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

- /pages/index.js

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

## Create JSON-SERVER

[json-server docs](https://www.npmjs.com/package/json-server)

```bash
$ npm i json-server
# or
$ pnpm add json-server
# or
$ yarn add json-server
```

- create json file `db.json` in project folder

```json
{
  "todos": [
    {
      "id": 1,
      "taskName": "To eat",
      "isFinished": false
    },
    {
      "id": 2,
      "taskName": "To coding",
      "isFinished": false
    },
    {
      "id": 3,
      "taskName": "To sleep",
      "isFinished": false
    },
    {
      "id": 4,
      "taskName": "To learn",
      "isFinished": false
    }
  ]
}

```

- run json-server
```bash
$ npm json-server --watch db.json --port 4000
# or
$ pnpm json-server --watch db.json --port 4000
# or
$ yarn json-server --watch db.json --port 4000
```

## Mutation/Updating

You have to use `useMutation` hook to mutating data. [useMutation docs](https://tanstack.com/query/v4/docs/react/reference/useMutation)

```javascript
import React from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const Home = () => {
  const getAllTodos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/todos");
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

  const createNewTodo = async () => {
    const res = await axios.post("http://localhost:4000/todos", {
      taskName: "test",
      isFinished: false,
    });
    return res.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["get", "todos"],
    mutationFn: createNewTodo,
  });

  const onCreateNewTodo = () => {
    mutate();
  };

  return (
    <div>
      {isLoading && "Loading..."}
      {isError && "Something wrong"}
      {isSuccess &&
        todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.id} - {todo.taskName}
            </li>
          );
        })}
      <button onClick={onCreateNewTodo}>Create new todo</button>
    </div>
  );
};

export default Home;

```

## Invalidate

You have to use `useQueryClient` hook to invalidate data. [useQueryClient docs](https://tanstack.com/query/v4/docs/react/reference/useQueryClient)

- Data တွေ refetching လုပ်ဖို့အတွက် invalidation query ကိုသုံးဖို့လိုအပ်ပါတယ်။ create လုပ်လို့ success ဖြစ်သွားတာနဲ့ တစ်ပြိုင်နက်ထဲမှာ data တွေကို refetching လုပ်ပါတယ်။ ဘယ် data ကို refetching လုပ်မယ်ဆိုတာကိုလည်း queryKey နဲ့ သတ်မှတ်ပေးရပါတယ်။

```javascript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

const onCreateNewTodo = () => {
    mutate(
      {},
      {
        onSuccess: async () => {
         await queryClient.invalidateQueries({
            queryKey: ["get", "todos"],
          });
        },
      },
    );
  };
```

### Using Real Data

```javascript
import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const queryClient = useQueryClient();
  const [taskValue, setTaskValue] = useState("");

  const getAllTodos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/todos");
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

  const createNewTodo = async ({ taskName, isFinished }) => {
    const res = await axios.post("http://localhost:4000/todos", {
      taskName,
      isFinished,
    });
    setTaskValue("");
    return res.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["get", "todos"],
    mutationFn: createNewTodo,
  });

  const onCreateNewTodo = () => {
    mutate(
      {
        taskName: taskValue,
        isFinished: false,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["get", "todos"],
          });
        },
      },
    );
  };

  return (
    <div className="mx-14 mt-16">
      <input
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
        type="text"
        className="mb-6"
      />
      <button
        onClick={onCreateNewTodo}
        className="bg-red-500 text-white px-2 py-2"
      >
        Add New Todo
      </button>

      {isLoading && "Loading..."}
      {isError && "Something wrong"}
      {isSuccess &&
        todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.id} - {todo.taskName}
            </li>
          );
        })}
    </div>
  );
};

export default Home;

```

- Set argument in mutate
```javascript
const onCreateNewTodo = () => {
    mutate(
      {
        taskName: taskValue,
        isFinished: false,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["get", "todos"],
          });
        },
      },
    );
  };
```

- mutate မှာ argument တွေ ထည့်လိုက်တာနဲ့ value တွေကို parameter အနေနဲ့ function ထဲကို pass လုပ်ပေးပါတယ်။

```javascript
const createNewTodo = async ({ taskName, isFinished }) => {
    const res = await axios.post("http://localhost:4000/todos", {
      taskName,
      isFinished,
    });
    setTaskValue("");
    return res.data;
  };
```

## Window focus Refetching

[window focus refetching Docs](https://tanstack.com/query/latest/docs/react/guides/window-focus-refetching)

- refetchOnWindowFocus (default - true)
- staleTime (data fetch လုပ်နေတဲ့ result က အသစ် အနေနဲ့ မရောက်တဲ့ ကာလ)

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default true
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    },
  },
});
```

##  Devtools

[react query dev tools Docs](https://tanstack.com/query/v4/docs/react/devtools)

```bash
$ npm i @tanstack/react-query-devtools
# or
$ pnpm add @tanstack/react-query-devtools
# or
$ yarn add @tanstack/react-query-devtools
```

## Dependent Queries

[Dependent Queries Docs](https://tanstack.com/query/latest/docs/react/guides/dependent-queries)

- /page/[id].js

```javascript
import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TodoById = () => {
  const router = useRouter();
  const { id } = router.query;

  const getTodoById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/todos/${id}`);
      return res.data;
    } catch (error) {
      return Promise.reject(new Error(error));
    }
  };

  const {
    data: todo,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["get", "todos", id],
    queryFn: () => getTodoById(id),
    enabled: !!id,
  });

  return (
    <div>
      {isLoading && "Loading..."}
      {isError && "Something wrong"}
      {isSuccess && (
        <div>
          {todo.id} - {todo.taskName}
        </div>
      )}
    </div>
  );
};

export default TodoById;
```

- Query Key must be unique. 
```javascript
    queryKey: ["get", "todos", id]
```

- Pass Value to function
```javascript
    queryFn: () => getTodoById(id)
```

- Dependent Queries
```javascript
    enabled: !!id
```