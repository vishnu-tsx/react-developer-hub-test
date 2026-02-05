import { useState } from "react";
import { FilterDropdown } from "../../components/filter-dropdown/FilterDropdown";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { FILTER_OPTIONS } from "../../constants/resources";

export const ResourceListPage = () => {
	const [filters, setFilters] = useState<Record<string, string[]>>({});

	const handleFilterChange = (filterId: string, selected: string[]) => {
		setFilters((prev) => ({
			...prev,
			[filterId]: selected,
		}));
	};

	return (
		<div className="space-y-5">
			<h1 className="text-3xl font-bold text-center text-gray-900">
				React Resource Hub
			</h1>
			<p className="text-gray-600 text-center ">
				Discover high-quality React learning resources
			</p>
			<div className="flex justify-center">
				<SearchBar />
			</div>
			<div className="flex justify-start gap-3">
				{FILTER_OPTIONS.map((filter) => (
					<FilterDropdown
						key={filter.id}
						label={filter.label}
						availableOptions={filter.options}
						selectedOptions={filters[filter.id] || []}
						onSelectionChange={(selected) =>
							handleFilterChange(filter.id, selected)
						}
					/>
				))}
			</div>
		</div>
	);
};
