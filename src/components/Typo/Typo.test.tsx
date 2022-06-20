import { Typo } from "./Typo";
import { render, fireEvent } from "@testing-library/react";

describe("Component/Typo", () => {
  it("should match snapshot", () => {
    const { container } = render(<Typo>test</Typo>);
    expect(container).toMatchSnapshot();
  });

  it("should render text", () => {
    const { getByText } = render(<Typo>test</Typo>);

    expect(getByText("test")).toBeInTheDocument();
  });
});
