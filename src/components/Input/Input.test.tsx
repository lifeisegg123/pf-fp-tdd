import { Input } from "./Input";
import { render, fireEvent } from "@testing-library/react";
import { useState } from "react";

function MockInput({ disabled }: { disabled?: boolean }) {
  const [value, setValue] = useState("");
  return (
    <Input
      placeholder="mock-input"
      value={value}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

describe("Component/Input", () => {
  it("should match snapshot", () => {
    const { container } = render(<MockInput />);
    expect(container).toBeInTheDocument();
  });

  it("should handle change event", () => {
    const { getByPlaceholderText } = render(<MockInput />);
    const input = getByPlaceholderText("mock-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toEqual("test");
  });

  it("should be disabled", () => {
    const { getByPlaceholderText } = render(<MockInput disabled />);
    const input = getByPlaceholderText("mock-input") as HTMLInputElement;
    expect(input.disabled).toEqual(true);
  });
});
