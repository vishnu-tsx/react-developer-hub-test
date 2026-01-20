import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { ResourceCard } from "./ResourceCard";

const navigate = vi.fn();

vi.mock("react-router-dom", async () => {
	const actual =
		await vi.importActual<typeof import("react-router-dom")>(
			"react-router-dom",
		);

	return {
		...actual,
		useNavigate: () => navigate,
	};
});

beforeEach(() => {
	navigate.mockClear();
});

type RenderOptions = {
	additionalProps?: Partial<React.ComponentProps<typeof ResourceCard>>;
};

const defaultProps: React.ComponentProps<typeof ResourceCard> = {
	resource: {
		id: "123",
		title: "Testing React Components",
		description: "A practical guide to testing UI behavior",
		type: "article",
		level: "beginner",
		tags: ["react", "testing", "vitest", "rtl", "ui"],
		url: "https://resourcehub.com",
		created_at: "2024-01-01T00:00:00Z",
		updated_at: "2024-01-01T00:00:00Z",
	},
};

const renderResourceCard = ({ additionalProps }: RenderOptions = {}) => {
	return render(
		<MemoryRouter>
			<ResourceCard {...defaultProps} {...additionalProps} />
		</MemoryRouter>,
	);
};

describe("ResourceCard", () => {
	const user = userEvent.setup();

	it("should render the resource title", () => {
		renderResourceCard();

		expect(
			screen.getByRole("heading", { name: /testing react components/i }),
		).toBeInTheDocument();
	});

	it("should render the resource description", () => {
		renderResourceCard();

		expect(
			screen.getByText(/practical guide to testing ui behavior/i),
		).toBeInTheDocument();
	});

	it("should render resource type badge", () => {
		renderResourceCard();

		expect(screen.getByText(/article/i)).toBeInTheDocument();
	});

	it("should render resource level badge", () => {
		renderResourceCard();

		expect(screen.getByText(/beginner/i)).toBeInTheDocument();
	});

	it("should render overflow tag count when tags exceed four", () => {
		renderResourceCard();

		expect(screen.getByText(/\+1/i)).toBeInTheDocument();
	});

	it("should render an external visit link", () => {
		renderResourceCard();

		expect(
			screen.getByRole("link", { name: /visit resource/i }),
		).toBeInTheDocument();
	});

	it("should navigate to resource details when the card is clicked", async () => {
		renderResourceCard();

		await user.click(
			screen.getByRole("heading", { name: /testing react components/i }),
		);

		expect(navigate).toHaveBeenCalledWith("/resource/123");
	});

	it("should not trigger navigation when external link is clicked", async () => {
		renderResourceCard();

		await user.click(screen.getByRole("link", { name: /visit resource/i }));

		expect(navigate).not.toHaveBeenCalled();
	});

	it("should expose an accessible label for the card", () => {
		renderResourceCard();

		expect(
			screen.getByLabelText(/view details for testing react components/i),
		).toBeInTheDocument();
	});
});
