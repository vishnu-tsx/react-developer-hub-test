import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../app/layout/Layout";
import { FavoritesListPage } from "../features/faviorite-list-page/FavoritesListPage";
import { ResourceDetailPage } from "../features/resource-list-page/ResourceDetailPage";
import { ResourceListPage } from "../features/resource-list-page/ResourceListPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <ResourceListPage />,
			},
			{
				path: "favorites",
				element: <FavoritesListPage />,
			},
			{
				path: "resource/:id",
				element: <ResourceDetailPage />,
			},
		],
	},
]);
