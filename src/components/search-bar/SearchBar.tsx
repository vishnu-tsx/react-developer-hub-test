import { useState } from "react";
import { CircleX, Search } from "lucide-react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

interface SearchBarProps {
	searchQuery?: string;
	placeholder?: string;
	label?: string;
	showClearButton?: boolean;
	onChange?: (searchQuery: string) => void;
}

export const SearchBar = ({
	searchQuery: controlledValue,
	placeholder = "Search by title, description, or tags...",
	label = "Search",
	showClearButton = true,
	onChange,
}: SearchBarProps) => {
	const [internalValue, setInternalValue] = useState("");
	const searchQuery =
		controlledValue !== undefined ? controlledValue : internalValue;

	const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const updatedSearchQuery = event.target.value;
		if (controlledValue === undefined) {
			setInternalValue(updatedSearchQuery);
		}
		onChange?.(updatedSearchQuery);
	};

	const handleClearSearch = () => {
		if (controlledValue === undefined) {
			setInternalValue("");
		}
		onChange?.("");
	};

	return (
		<div>
			<label htmlFor="search-input" className="sr-only">
				{label}
			</label>

			<div className="relative">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
					aria-hidden="true"
				/>

				<Input
					id="search-input"
					type="text"
					placeholder={placeholder}
					className="pl-10 pr-10 bg-white w-96"
					autoComplete="off"
					value={searchQuery}
					onChange={handleSearchInputChange}
				/>

				{showClearButton && searchQuery && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full"
						aria-label="Clear search"
						onClick={handleClearSearch}
					>
						<CircleX className="w-4 h-4" />
					</Button>
				)}
			</div>
		</div>
	);
};
