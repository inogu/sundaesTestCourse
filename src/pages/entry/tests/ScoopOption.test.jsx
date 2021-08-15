import { render, screen } from "@testing-library/react";
import ScoopOption from "../ScoopOption";

test("indicate if scoop count is non-int or out of range", async () => {
  render(<ScoopOption />);
});
