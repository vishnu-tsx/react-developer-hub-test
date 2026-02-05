import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Badge } from "./Badge";

interface RenderOptions {
	children?: React.ReactNode;
	variant?: "default" | "primary" | "success" | "warning" | "error";
	className?: string;
}

const defaultProps: Required<Omit<RenderOptions, "className">> = {
	children: "Badge content",
	variant: "default",
};

const renderBadge = (additionalProps?: RenderOptions) => {
	const props = { ...defaultProps, ...additionalProps };

	return render(
		<Badge variant={props.variant} className={props.className}>
			{props.children}
		</Badge>,
	);
};

describe("Badge", () => {
	it("should render a badge element", () => {
		renderBadge();

		const badge = screen.getByText(/badge/i);

		expect(badge).toBeInTheDocument();
	});

	it("should render children content", () => {
		renderBadge({ children: "New content" });

		const badge = screen.getByText(/new/i);

		expect(badge).toBeInTheDocument();
	});

	it("should apply default variant styles when no variant is provided", () => {
		renderBadge();

		const badge = screen.getByText(/badge/i);

		expect(badge.className).toContain("bg-gray");
	});

	it("should apply primary variant styles when variant is primary", () => {
		renderBadge({ variant: "primary" });

		const badge = screen.getByText(/badge/i);

		expect(badge.className).toContain("bg-blue");
	});

	it("should apply success variant styles when variant is success", () => {
		renderBadge({ variant: "success" });

		const badge = screen.getByText(/badge/i);

		expect(badge.className).toContain("bg-green");
	});

	it("should apply warning variant styles when variant is warning", () => {
		renderBadge({ variant: "warning" });

		const badge = screen.getByText(/badge/i);

		expect(badge.className).toContain("bg-amber");
	});

	it("should apply error variant styles when variant is error", () => {
		renderBadge({ variant: "error" });

		const badge = screen.getByText(/badge/i);

		expect(badge.className).toContain("bg-red");
	});

	it("should merge custom className with variant styles", () => {
		renderBadge({ className: "custom-class" });

		const badge = screen.getByText(/badge/i);

		expect(badge.className).toContain("custom-class");
	});
});
