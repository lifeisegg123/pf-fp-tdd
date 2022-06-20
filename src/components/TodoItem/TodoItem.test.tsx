import { TodoItem } from "./TodoItem";
import { fireEvent, render } from "@testing-library/react";

describe("Component/TodoItem", () => {
  it("should match snapshot", () => {
    const mockRemove = jest.fn();
    const mockCheck = jest.fn();
    const { container } = render(
      <TodoItem desc="test" checked onRemove={mockRemove} onCheck={mockCheck} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render description", () => {
    const mockRemove = jest.fn();
    const mockCheck = jest.fn();
    const { getByText } = render(
      <TodoItem desc="test" checked onRemove={mockRemove} onCheck={mockCheck} />
    );

    expect(getByText("test")).toBeInTheDocument();
  });

  it("should handle click remove button", () => {
    const mockRemove = jest.fn();
    const mockCheck = jest.fn();
    const { getByLabelText } = render(
      <TodoItem desc="test" checked onRemove={mockRemove} onCheck={mockCheck} />
    );

    fireEvent.click(getByLabelText("삭제"));

    expect(mockRemove).toBeCalled();
    expect(mockCheck).not.toBeCalled();
  });
});
