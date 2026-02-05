import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { createRef } from "react";
import { Checkbox } from "./Checkbox";

interface RenderOptions {
	label?: string;
	error?: string;
	checked?: boolean;
	onChange?: () => void;
	id?: string;
}

const defaultProps: Required<Omit<RenderOptions, "error" | "id">> = {
	label: "Accept terms",
	checked: false,
	onChange: vi.fn(),
};

const renderCheckbox = (additionalProps?: RenderOptions) => {
	const props = { ...defaultProps, ...additionalProps };

	return render(
		<Checkbox
			label={props.label}
			error={additionalProps?.error}
			checked={props.checked}
			onChange={props.onChange}
			id={additionalProps?.id}
		/>,
	);
};

describe("Checkbox", () => {
	const user = userEvent.setup();

	it("should render a checkbox input", () => {
		renderCheckbox();

		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).toBeInTheDocument();
	});

	it("should render label content when label is provided", () => {
		renderCheckbox();

		const label = screen.getByText(/accept/i);

		expect(label).toBeInTheDocument();
	});

	it("should toggle checked state when clicked", async () => {
		renderCheckbox();

		const checkbox = screen.getByRole("checkbox");
		await user.click(checkbox);

		expect(defaultProps.onChange).toHaveBeenCalled();
	});

	it("should render error message when error prop is provided", () => {
		renderCheckbox({ error: "Something went wrong" });

		const alert = screen.getByRole("alert");

		expect(alert).toBeInTheDocument();
	});

	it("should mark checkbox as invalid when error is present", () => {
		renderCheckbox({ error: "Invalid value" });

		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).toHaveAttribute("aria-invalid", "true");
	});

	it("should associate error message using aria-describedby", () => {
		renderCheckbox({ error: "Invalid value", id: "terms" });

		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).toHaveAttribute("aria-describedby", "terms-error");
	});

	it("should forward ref to the input element", () => {
		const ref = createRef<HTMLInputElement>();

		render(<Checkbox ref={ref} label="Ref checkbox" />);

		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});
});
