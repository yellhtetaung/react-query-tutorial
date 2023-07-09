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
    try {
      const res = await axios.post("http://localhost:4000/todos", {
        taskName,
        isFinished,
      });
      setTaskValue("");
      return res.data;
    } catch (error) {
      return error;
    }
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
