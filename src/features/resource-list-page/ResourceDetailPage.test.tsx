import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { resourcesApi } from "../../api/resources/resources.api";
import { ResourceDetailPage } from "./ResourceDetailPage";

vi.mock("../../api/resources/resources.api");

const mockFetchResourceById = vi.mocked(resourcesApi.fetchResourceById);

const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

const renderResourceDetailPage = (resourceId = "1") => {
	const queryClient = createQueryClient();
	const user = userEvent.setup();

	return {
		user,
		...render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter initialEntries={[`/resource/${resourceId}`]}>
					<Routes>
						<Route path="/resource/:id" element={<ResourceDetailPage />} />
					</Routes>
				</MemoryRouter>
			</QueryClientProvider>,
		),
	};
};

beforeEach(() => {
	vi.clearAllMocks();
});

describe("ResourceDetailPage", () => {
	it("should show loading indicator while fetching resource", () => {
		mockFetchResourceById.mockImplementation(() => new Promise(() => {}));

		renderResourceDetailPage();

		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("should show error state when resource fetch fails", async () => {
		mockFetchResourceById.mockRejectedValue(new Error("Failed to fetch"));

		renderResourceDetailPage();

		await waitFor(() => {
			expect(screen.getByText(/error loading resource/i)).toBeInTheDocument();
		});
	});

	it("should show not found state when resource does not exist", async () => {
		mockFetchResourceById.mockResolvedValue(null);

		renderResourceDetailPage();

		await waitFor(() => {
			expect(screen.getByText(/resource not found/i)).toBeInTheDocument();
		});
	});

	it("should render resource title", async () => {
		mockFetchResourceById.mockResolvedValue({
			id: "1",
			title: "React Basics",
			description: "Learn the basics of React",
			type: "article",
			level: "beginner",
			tags: ["react", "frontend"],
			url: "https://example.com",
			created_at: "2024-01-01T00:00:00Z",
			updated_at: "2024-01-01T00:00:00Z",
		});

		renderResourceDetailPage();

		await waitFor(() => {
			expect(
				screen.getByRole("heading", { name: "React Basics" }),
			).toBeInTheDocument();
		});
	});

	it("should render resource description", async () => {
		mockFetchResourceById.mockResolvedValue({
			id: "1",
			title: "React Basics",
			description: "Learn the basics of React",
			type: "article",
			level: "beginner",
			tags: ["react", "frontend"],
			url: "https://example.com",
			created_at: "2024-01-01T00:00:00Z",
			updated_at: "2024-01-01T00:00:00Z",
		});

		renderResourceDetailPage();

		await waitFor(() => {
			expect(screen.getByText("Learn the basics of React")).toBeInTheDocument();
		});
	});

	it("should render resource tags", async () => {
		mockFetchResourceById.mockResolvedValue({
			id: "1",
			title: "React Basics",
			description: "Learn the basics of React",
			type: "article",
			level: "beginner",
			tags: ["react", "frontend"],
			url: "https://example.com",
			created_at: "2024-01-01T00:00:00Z",
			updated_at: "2024-01-01T00:00:00Z",
		});

		renderResourceDetailPage();

		await waitFor(() => {
			expect(screen.getByText("react")).toBeInTheDocument();
			expect(screen.getByText("frontend")).toBeInTheDocument();
		});
	});

	it("should render external resource link", async () => {
		mockFetchResourceById.mockResolvedValue({
			id: "1",
			title: "React Basics",
			description: "Learn the basics of React",
			type: "article",
			level: "beginner",
			tags: ["react", "frontend"],
			url: "https://example.com",
			created_at: "2024-01-01T00:00:00Z",
			updated_at: "2024-01-01T00:00:00Z",
		});

		renderResourceDetailPage();

		await waitFor(() => {
			expect(
				screen.getByRole("link", { name: /visit resource/i }),
			).toBeInTheDocument();
		});
	});

	it("should render back button", async () => {
		mockFetchResourceById.mockResolvedValue({
			id: "1",
			title: "React Basics",
			description: "Learn the basics of React",
			type: "article",
			level: "beginner",
			tags: ["react", "frontend"],
			url: "https://example.com",
			created_at: "2024-01-01T00:00:00Z",
			updated_at: "2024-01-01T00:00:00Z",
		});

		renderResourceDetailPage();

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: /back to resources/i }),
			).toBeInTheDocument();
		});
	});
});
