import { MouseEventHandler } from "react";
import { Button } from "../Button";
import { Typo } from "../Typo";

interface TodoItemProps {
  desc: string;
  checked: boolean;
  onRemove: MouseEventHandler<HTMLButtonElement>;
  onCheck: MouseEventHandler<HTMLLIElement>;
}

export function TodoItem({ desc, checked, onRemove, onCheck }: TodoItemProps) {
  const handleRemove: TodoItemProps["onRemove"] = (e) => {
    e.stopPropagation();
    onRemove(e);
  };
  return (
    <li className="flex-row-center gap-sm" onClick={onCheck}>
      <span>{checked ? "done" : "todo"}</span>
      <Typo as="h2">{desc}</Typo>
      <Button onClick={handleRemove} aria-label="삭제">
        X
      </Button>
    </li>
  );
}
