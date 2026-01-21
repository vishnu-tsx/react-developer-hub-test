import type { Resource } from "../../../api/resources/resources.types";
import { EmptyState } from "../../../components/empty-state/EmptyState";
import { Spinner } from "../../../components/spinner/Spinner";
import { ResourceCard } from "./ResourceCard";

interface ResourceListProps {
	resources: Resource[];
	isLoading: boolean;
}

export const ResourceList = ({ resources, isLoading }: ResourceListProps) => {
	if (isLoading) {
		return (
			<div className="flex justify-center py-12">
				<Spinner size="lg" />
			</div>
		);
	}

	if (resources.length === 0) {
		return (
			<EmptyState
				variant="search"
				title="No resources found"
				description="Try adjusting your filters or search query."
			/>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{resources.map((resource) => (
				<ResourceCard key={resource.id} resource={resource} />
			))}
		</div>
	);
};
