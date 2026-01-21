import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { resourcesApi } from "../../api/resources/resources.api";
import { ResourceListPage } from "./ResourceListPage";

vi.mock("../../api/resources/resources.api");

const mockFetchResourcesByFilters = vi.mocked(
	resourcesApi.fetchResourcesByFilters,
);

const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

const renderResourceListPage = () => {
	const queryClient = createQueryClient();
	const user = userEvent.setup();

	return {
		user,
		...render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<ResourceListPage />
				</MemoryRouter>
			</QueryClientProvider>,
		),
	};
};

beforeEach(() => {
	vi.clearAllMocks();
});

describe("ResourceListPage", () => {
	it("should render page heading and description", async () => {
		mockFetchResourcesByFilters.mockResolvedValue([]);

		renderResourceListPage();

		expect(
			screen.getByRole("heading", { name: /react resource hub/i }),
		).toBeInTheDocument();
		expect(
			screen.getByText(/discover high-quality react learning resources/i),
		).toBeInTheDocument();
	});

	it("should render search input", async () => {
		mockFetchResourcesByFilters.mockResolvedValue([]);

		renderResourceListPage();

		expect(
			screen.getByRole("textbox", { name: /search/i }),
		).toBeInTheDocument();
	});

	it("should render filter dropdowns", async () => {
		mockFetchResourcesByFilters.mockResolvedValue([]);

		renderResourceListPage();

		expect(
			screen.getByRole("button", { name: /resource type/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /skill levels/i }),
		).toBeInTheDocument();
	});

	it("should show spinner while loading", async () => {
		mockFetchResourcesByFilters.mockImplementation(() => new Promise(() => {}));

		renderResourceListPage();

		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("should show empty state when no resources found", async () => {
		mockFetchResourcesByFilters.mockResolvedValue([]);

		renderResourceListPage();

		await waitFor(() => {
			expect(screen.getByText(/no resources found/i)).toBeInTheDocument();
		});
	});

	it("should render resource cards when data is available", async () => {
		mockFetchResourcesByFilters.mockResolvedValue([
			{
				id: "1",
				title: "React Basics",
				description: "Learn React fundamentals",
				type: "article",
				level: "beginner",
				tags: ["react"],
				url: "https://example.com",
				created_at: "2024-01-01T00:00:00Z",
				updated_at: "2024-01-01T00:00:00Z",
			},
		]);

		renderResourceListPage();

		await waitFor(() => {
			expect(screen.getByText("React Basics")).toBeInTheDocument();
		});
	});

	it("should call API with search query when user types", async () => {
		mockFetchResourcesByFilters.mockResolvedValue([]);

		const { user } = renderResourceListPage();

		const searchInput = screen.getByRole("textbox", { name: /search/i });
		await user.type(searchInput, "hooks");

		await waitFor(() => {
			expect(mockFetchResourcesByFilters).toHaveBeenCalledWith(
				expect.objectContaining({
					searchQuery: "hooks",
				}),
			);
		});
	});
});
