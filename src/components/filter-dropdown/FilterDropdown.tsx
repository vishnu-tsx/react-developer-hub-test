import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "../badge/Badge";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";

interface FilterDropdownProps {
	label: string;
	availableOptions: string[];
	selectedOptions: string[];
	onSelectionChange: (selected: string[]) => void;
}

export const FilterDropdown = ({
	label,
	availableOptions,
	selectedOptions,
	onSelectionChange,
}: FilterDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscapeKey);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isOpen]);

	const handleToggleOption = (option: string) => {
		const newSelection = selectedOptions.includes(option)
			? selectedOptions.filter((selectedOption) => selectedOption !== option)
			: [...selectedOptions, option];

		onSelectionChange(newSelection);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<Button
				variant="outline"
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-haspopup="true"
				aria-controls="filter-dropdown-menu"
			>
				<span className="font-medium">{label}</span>
				{selectedOptions.length > 0 && (
					<Badge variant="primary">{selectedOptions.length}</Badge>
				)}
				<ChevronDown
					className={`w-4 h-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
					aria-hidden="true"
				/>
			</Button>

			{isOpen && (
				<fieldset
					id="filter-dropdown-menu"
					className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2"
				>
					<legend className="sr-only">{label} filter options</legend>
					<ul className="list-none m-0">
						{availableOptions.map((availableOption) => (
							<li
								key={availableOption}
								className="px-3 py-2 mx-2 mb-1 hover:bg-blue-50 hover:border hover:border-blue-500 hover:text-blue-700 rounded transition-colors"
							>
								<Checkbox
									label={availableOption}
									checked={selectedOptions.includes(availableOption)}
									onChange={() => handleToggleOption(availableOption)}
								/>
							</li>
						))}
					</ul>
				</fieldset>
			)}
		</div>
	);
};
