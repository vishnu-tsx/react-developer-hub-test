import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Resource } from "../../../api/resources/resources.types";
import { Badge } from "../../../components/badge/Badge";
import { Card, CardBody } from "../../../components/card/Card";

interface ResourceCardProps {
	resource: Resource;
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/resource/${resource.id}`);
	};

	return (
		<Card
			hover
			onClick={handleCardClick}
			aria-label={`View details for ${resource.title}`}
		>
			<CardBody className="flex flex-col h-full">
				<h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3">
					{resource.title}
				</h3>

				<p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
					{resource.description}
				</p>

				<div className="flex flex-wrap gap-2 mb-3">
					<Badge variant="default">{resource.type}</Badge>
					<Badge variant="default">{resource.level}</Badge>
				</div>

				<div className="flex flex-wrap gap-1.5 mb-3">
					{resource.tags.slice(0, 4).map((tag) => (
						<Badge key={tag} variant="default" className="text-xs">
							{tag}
						</Badge>
					))}
					{resource.tags.length > 4 && (
						<Badge variant="default" className="text-xs">
							+{resource.tags.length - 4}
						</Badge>
					)}
				</div>

				<a
					href={resource.url}
					target="_blank"
					rel="noopener noreferrer"
					onClick={(event) => event.stopPropagation()}
					className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
				>
					Visit Resource
					<ExternalLink className="w-4 h-4" />
				</a>
			</CardBody>
		</Card>
	);
};
