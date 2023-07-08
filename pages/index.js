import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const url = "http://localhost:3000/todos";
  const queryClient = useQueryClient();
  const [taskValue, setTaskValue] = useState("");

  const getAllTodos = async () => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      return Promise.reject(new Error(err));
    }
  };

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["get", "todos"],
    queryFn: getAllTodos,
  });

  const createNewTodo = async ({ taskName, isFinished }) => {
    try {
      const res = await axios.post(url, {
        taskName: taskName,
        isFinished: isFinished,
      });
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["post", "todos"],
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
    <div className="mx-14 mt-6">
      <input
        type="text"
        className="mb-6"
        onChange={(e) => setTaskValue(e.target.value)}
      />
      <button className="bg-red-500 text-white p-2" onClick={onCreateNewTodo}>
        Add new todo
      </button>

      {isLoading && "Loading..."}
      {isError && "Something want wrong please try again later"}
      {isSuccess &&
        todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} - {todo.taskName}
          </li>
        ))}
    </div>
  );
};

export default Home;
