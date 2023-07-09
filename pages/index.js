import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const getAllTodos = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
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
