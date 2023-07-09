import React, { useReducer } from "react";

// {payload: '', type: ''}
const reducer = (prevState, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...prevState,
        count: prevState.count + 1,
      };
    case "decrement":
      return {
        ...prevState,
        count: prevState.count - 1,
      };
    default:
      throw new Error("action did not exist for this type");
  }
};

const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
  });

  const onIncreaseCount = () => {
    dispatch({
      type: "increment",
    });
  };

  const onDecreaseCount = () => {
    dispatch({
      type: "decrement",
    });
  };

  return (
    <div>
      <h1>Reducer</h1>
      <h2>{state.count}</h2>
      <button onClick={onIncreaseCount}>Add</button>
      <button onClick={onDecreaseCount}>Remove</button>
    </div>
  );
};

export default Reducer;
