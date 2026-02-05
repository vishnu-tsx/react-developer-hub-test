import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { FilterDropdown } from "./FilterDropdown";

interface RenderOptions {
	label?: string;
	availableOptions?: string[];
	selectedOptions?: string[];
	onSelectionChange?: (selected: string[]) => void;
}

const defaultProps: Required<RenderOptions> = {
	label: "Filter",
	availableOptions: ["One", "Two", "Three"],
	selectedOptions: [],
	onSelectionChange: vi.fn(),
};

const renderFilterDropdown = (additionalProps?: RenderOptions) => {
	const props = { ...defaultProps, ...additionalProps };

	return render(
		<FilterDropdown
			label={props.label}
			availableOptions={props.availableOptions}
			selectedOptions={props.selectedOptions}
			onSelectionChange={props.onSelectionChange}
		/>,
	);
};

describe("FilterDropdown", () => {
	const user = userEvent.setup();

	it("should render the toggle button", () => {
		renderFilterDropdown();

		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
	});

	it("should render label content inside the button", () => {
		renderFilterDropdown();

		const label = screen.getByText(/filter/i);

		expect(label).toBeInTheDocument();
	});

	it("should open dropdown when button is clicked", async () => {
		renderFilterDropdown();

		const button = screen.getByRole("button");
		await user.click(button);

		const list = screen.getByRole("group");

		expect(list).toBeInTheDocument();
	});

	it("should close dropdown when escape key is pressed", async () => {
		renderFilterDropdown();

		const button = screen.getByRole("button");
		await user.click(button);
		await user.keyboard("{Escape}");

		const list = screen.queryByRole("group");

		expect(list).not.toBeInTheDocument();
	});

	it("should render checkbox options when opened", async () => {
		renderFilterDropdown();

		const button = screen.getByRole("button");
		await user.click(button);

		const checkbox = screen.getAllByRole("checkbox")[0];

		expect(checkbox).toBeInTheDocument();
	});

	it("should call onSelectionChange when an option is selected", async () => {
		const onSelectionChange = vi.fn();

		renderFilterDropdown({ onSelectionChange });

		const button = screen.getByRole("button");
		await user.click(button);

		const checkbox = screen.getAllByRole("checkbox")[0];
		await user.click(checkbox);

		expect(onSelectionChange).toHaveBeenCalled();
	});

	it("should show selected count badge when options are selected", () => {
		renderFilterDropdown({ selectedOptions: ["One"] });

		const badge = screen.getByText(/\d+/);

		expect(badge).toBeInTheDocument();
	});

	it("should close dropdown when clicking outside", async () => {
		renderFilterDropdown();

		const button = screen.getByRole("button");
		await user.click(button);

		await user.click(document.body);

		const list = screen.queryByRole("group");

		expect(list).not.toBeInTheDocument();
	});
});
