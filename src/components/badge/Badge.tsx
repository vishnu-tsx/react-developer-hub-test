interface BadgeProps {
	children: React.ReactNode;
	variant?: "default" | "primary" | "success" | "warning" | "error";
	className?: string;
}

export const Badge = ({
	children,
	variant = "default",
	className = "",
}: BadgeProps) => {
	const variantStyles = {
		default: "bg-gray-100 text-gray-800",
		primary: "bg-blue-100 text-blue-800",
		success: "bg-green-100 text-green-800",
		warning: "bg-amber-100 text-amber-800",
		error: "bg-red-100 text-red-800",
	} as const;

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
		>
			{children}
		</span>
	);
};
