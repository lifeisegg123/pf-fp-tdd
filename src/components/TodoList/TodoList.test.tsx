import { TodoList } from "./TodoList";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { filter, map, pipe, toArray } from "@fxts/core";

const MOCK_TODOS = [
  { id: "1", desc: "test1", checked: false },
  { id: "2", desc: "test2", checked: false },
  { id: "3", desc: "test3", checked: false },
  { id: "4", desc: "test4", checked: false },
  { id: "5", desc: "test5", checked: false },
  { id: "6", desc: "test6", checked: false },
];

const MockTodo = () => {
  const [todos, setTodos] = useState(MOCK_TODOS);

  const onRemove = (targetId: string) => () => {
    setTodos((prev) =>
      pipe(
        prev,
        filter(({ id }) => targetId !== id),
        toArray
      )
    );
  };
  const onCheck = (targetId: string) => () => {
    setTodos((prev) =>
      pipe(
        prev,
        map(({ id, checked, desc }) => ({
          id,
          checked: id === targetId ? !checked : checked,
          desc,
        })),
        toArray
      )
    );
  };
  return <TodoList onCheck={onCheck} onRemove={onRemove} todos={todos} />;
};

describe("Component/TodoList", () => {
  it("should match snapshot", () => {
    const { container } = render(<MockTodo />);
    expect(container).toMatchSnapshot();
  });

  it("should remove item", () => {
    const { getByText } = render(<MockTodo />);

    const target = getByText("test1").nextSibling;
    fireEvent.click(target as HTMLButtonElement);

    expect(target).not.toBeInTheDocument();
  });

  it("should handle check", () => {
    const { getByText } = render(<MockTodo />);

    const target = getByText("test1");

    fireEvent.click(target);

    expect(screen.getByText("done")).toBeInTheDocument();
  });
});
