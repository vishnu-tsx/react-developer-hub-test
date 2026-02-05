import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className = "", id: providedId, ...props }, ref) => {
		const generatedId = useId();
		const inputId = providedId || generatedId;
		const errorId = `${inputId}-error`;

		return (
			<div>
				{label && (
					<label
						htmlFor={inputId}
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={inputId}
					className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
						error ? "border-red-500" : ""
					} ${className}`}
					aria-invalid={error ? "true" : "false"}
					aria-describedby={error ? errorId : undefined}
					{...props}
				/>
				{error && (
					<p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
						{error}
					</p>
				)}
			</div>
		);
	},
);
