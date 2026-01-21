import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ResourceList } from "./ResourceList";
import type { Resource } from "../../../api/resources/resources.types";

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

interface RenderOptions {
	resources?: Resource[];
	isLoading?: boolean;
}

const mockResources: Resource[] = [
	{
		id: "1",
		title: "Resource One",
		description: "Test resource description",
		type: "article",
		level: "beginner",
		tags: ["react", "testing", "vitest"],
		url: "https://resourcehub.com",
		created_at: "2024-01-01T00:00:00Z",
		updated_at: "2024-01-01T00:00:00Z",
	},
];

const defaultProps: Required<RenderOptions> = {
	resources: mockResources,
	isLoading: false,
};

const renderResourceList = (additionalProps?: RenderOptions) => {
	const props = { ...defaultProps, ...additionalProps };
	const user = userEvent.setup();

	render(
		<MemoryRouter>
			<ResourceList resources={props.resources} isLoading={props.isLoading} />
		</MemoryRouter>,
	);

	return { user };
};

describe("ResourceList", () => {
	it("should render spinner when loading is true", () => {
		renderResourceList({ isLoading: true });

		const spinner = screen.getByRole("status");

		expect(spinner).toBeInTheDocument();
	});

	it("should render empty state when resources list is empty", () => {
		renderResourceList({ resources: [] });

		const emptyState = screen.getByText(/no resources/i);

		expect(emptyState).toBeInTheDocument();
	});

	it("should render resource cards when resources are provided", () => {
		renderResourceList();

		const resource = screen.getByText(/resource one/i);

		expect(resource).toBeInTheDocument();
	});

	it("should navigate to resource detail when card is clicked", async () => {
		const { user } = renderResourceList();

		const resource = screen.getByText(/resource one/i);
		await user.click(resource);

		expect(navigate).toHaveBeenCalledWith("/resource/1");
	});
});
