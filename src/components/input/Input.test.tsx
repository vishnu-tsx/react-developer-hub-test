import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { createRef } from "react";
import { Input } from "./Input";

interface RenderOptions {
	label?: string;
	error?: string;
	value?: string;
	onChange?: () => void;
	id?: string;
}

const defaultProps: Required<Omit<RenderOptions, "error" | "id">> = {
	label: "Email",
	value: "",
	onChange: vi.fn(),
};

const renderInput = (additionalProps?: RenderOptions) => {
	const props = { ...defaultProps, ...additionalProps };

	return render(
		<Input
			label={props.label}
			error={additionalProps?.error}
			value={props.value}
			onChange={props.onChange}
			id={additionalProps?.id}
		/>,
	);
};

describe("Input", () => {
	const user = userEvent.setup();

	it("should render an input element", () => {
		renderInput();

		const input = screen.getByRole("textbox");

		expect(input).toBeInTheDocument();
	});

	it("should render label when label prop is provided", () => {
		renderInput();

		const label = screen.getByText(/email/i);

		expect(label).toBeInTheDocument();
	});

	it("should associate label with input using htmlFor", () => {
		renderInput({ id: "email" });

		const input = screen.getByRole("textbox");

		expect(input).toHaveAttribute("id", "email");
	});

	it("should call onChange when user types", async () => {
		renderInput();

		const input = screen.getByRole("textbox");
		await user.type(input, "a");

		expect(defaultProps.onChange).toHaveBeenCalled();
	});

	it("should render error message when error prop is provided", () => {
		renderInput({ error: "Invalid value" });

		const alert = screen.getByRole("alert");

		expect(alert).toBeInTheDocument();
	});

	it("should mark input as invalid when error is present", () => {
		renderInput({ error: "Invalid value" });

		const input = screen.getByRole("textbox");

		expect(input).toHaveAttribute("aria-invalid", "true");
	});

	it("should associate error message using aria-describedby", () => {
		renderInput({ error: "Invalid value", id: "email" });

		const input = screen.getByRole("textbox");

		expect(input).toHaveAttribute("aria-describedby", "email-error");
	});

	it("should forward ref to the input element", () => {
		const ref = createRef<HTMLInputElement>();

		render(<Input ref={ref} label="Ref input" />);

		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});
});
