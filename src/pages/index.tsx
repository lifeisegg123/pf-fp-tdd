import { filter, map, pipe, toArray } from "@fxts/core";
import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { TodoList } from "src/components/TodoList";
import { Typo } from "src/components/Typo";
import { Todo } from "src/interfaces";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [value, setValue] = useState("");

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        checked: false,
        desc: value,
      },
    ]);
    setValue("");
  };

  return (
    <>
      <header>
        <Typo as="h1">TODO LIST</Typo>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <Input value={value} onChange={handleChange} />
          <Button>입력</Button>
        </form>
        <TodoList todos={todos} onRemove={onRemove} onCheck={onCheck} />
      </main>
    </>
  );
};

export default Home;
