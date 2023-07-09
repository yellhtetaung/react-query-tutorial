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
