import { useState, useMemo } from "react";
import { useFilteredResources } from "../../api/resources/resources.queries";
import type { ResourceFilters } from "../../api/resources/resources.types";
import { FilterDropdown } from "../../components/filter-dropdown/FilterDropdown";
import { SearchBar } from "../../components/search-bar/SearchBar";
import {
	FILTER_OPTIONS,
	RESOURCE_TYPE_MAP,
	SKILL_LEVEL_MAP,
} from "../../constants/resources";
import { ResourceList } from "./components/ResourceList";

export const ResourceListPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilters, setSelectedFilters] = useState<
		Record<string, string[]>
	>({});

	const handleFilterChange = (filterId: string, selectedOptions: string[]) => {
		setSelectedFilters((prev) => ({
			...prev,
			[filterId]: selectedOptions,
		}));
	};

	const apiFilters: ResourceFilters = useMemo(() => {
		const selectedTypes = selectedFilters.resourceTypes ?? [];
		const selectedLevels = selectedFilters.skillLevels ?? [];

		return {
			searchQuery: searchQuery || undefined,
			types:
				selectedTypes.length > 0
					? selectedTypes.map((typeLabel) => RESOURCE_TYPE_MAP[typeLabel])
					: undefined,
			levels:
				selectedLevels.length > 0
					? selectedLevels.map((levelLabel) => SKILL_LEVEL_MAP[levelLabel])
					: undefined,
		};
	}, [searchQuery, selectedFilters]);

	const { data: resources = [], isLoading } = useFilteredResources(apiFilters);

	return (
		<div className="space-y-5">
			<h1 className="text-3xl text-center font-bold text-gray-900">
				React Resource Hub
			</h1>
			<p className="text-gray-600 text-center">
				Discover high-quality React learning resources
			</p>

			<div className="flex justify-center">
				<SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />
			</div>

			<div className="flex gap-3">
				{FILTER_OPTIONS.map((filter) => (
					<FilterDropdown
						key={filter.id}
						label={filter.label}
						availableOptions={filter.options}
						selectedOptions={selectedFilters[filter.id] || []}
						onSelectionChange={(selected) =>
							handleFilterChange(filter.id, selected)
						}
					/>
				))}
			</div>
			<ResourceList resources={resources} isLoading={isLoading} />
		</div>
	);
};
