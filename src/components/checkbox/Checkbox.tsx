import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface CheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: string;
	error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, error, className = "", id: providedId, ...props }, ref) => {
		const generatedId = useId();
		const inputId = providedId || generatedId;
		const errorId = `${inputId}-error`;

		return (
			<div>
				<label
					htmlFor={inputId}
					className="flex items-center gap-3 cursor-pointer"
				>
					<input
						ref={ref}
						type="checkbox"
						id={inputId}
						className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors ${
							error ? "border-red-500" : ""
						} ${className}`}
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? errorId : undefined}
						{...props}
					/>
					{label && <span className="text-gray-700">{label}</span>}
				</label>
				{error && (
					<p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
						{error}
					</p>
				)}
			</div>
		);
	},
);
