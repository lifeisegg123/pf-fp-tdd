import { Button } from "./Button";
import { render, fireEvent } from "@testing-library/react";

describe("Component/Button", () => {
  it("should match snapshot", () => {
    const { container } = render(<Button>test</Button>);
    expect(container).toMatchSnapshot();
  });

  it("should handle click event", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(<Button onClick={mockFn} />);
    const button = getByRole("button") as HTMLButtonElement;
    fireEvent.click(button);
    expect(mockFn).toBeCalled();
  });

  it("should be disabled", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(<Button disabled onClick={mockFn} />);

    const button = getByRole("button") as HTMLButtonElement;

    fireEvent.click(button);

    expect(button.disabled).toEqual(true);
    expect(mockFn).not.toBeCalled();
  });
});
