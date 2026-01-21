import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useResourceById } from "../../api/resources/resources.queries";
import { Badge } from "../../components/badge/Badge";
import { Button } from "../../components/button/Button";
import { Card, CardBody } from "../../components/card/Card";
import { ErrorState } from "../../components/error-state/ErrorState";
import { Spinner } from "../../components/spinner/Spinner";

export const ResourceDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { data: resource, isLoading, isError } = useResourceById(id ?? "");

	const handleBack = () => {
		navigate(-1);
	};

	if (isLoading) {
		return (
			<div className="flex justify-center py-12">
				<Spinner size="lg" />
			</div>
		);
	}

	if (isError) {
		return (
			<ErrorState
				title="Error loading resource"
				message="Please try again later"
				action={
					<Button variant="outline" onClick={handleBack}>
						Go Back
					</Button>
				}
			/>
		);
	}

	if (!resource) {
		return (
			<ErrorState
				variant="info"
				title="Resource not found"
				message="The resource you're looking for doesn't exist or has been removed."
				action={
					<Button variant="outline" onClick={handleBack}>
						Go Back
					</Button>
				}
			/>
		);
	}

	const formattedDate = new Date(resource.created_at).toLocaleDateString(
		"en-US",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	);

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<Button variant="ghost" onClick={handleBack} className="gap-2">
				<ArrowLeft className="w-4 h-4" />
				Back to Resources
			</Button>

			<Card>
				<CardBody className="space-y-6">
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<h1 className="text-3xl font-bold text-gray-900 mb-3">
								{resource.title}
							</h1>
							<div className="flex flex-wrap gap-2">
								<Badge variant="default">{resource.type}</Badge>
								<Badge variant="default">{resource.level}</Badge>
							</div>
						</div>
					</div>

					<div>
						<h2 className="text-lg font-semibold text-gray-900 mb-2">
							Description
						</h2>
						<p className="text-gray-700 leading-relaxed whitespace-pre-line">
							{resource.description}
						</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold text-gray-900 mb-3">Tags</h2>
						<div className="flex flex-wrap gap-2">
							{resource.tags.map((tag) => (
								<Badge key={tag} variant="default">
									{tag}
								</Badge>
							))}
						</div>
					</div>

					<div className="pt-4 border-t border-gray-200">
						<a
							href={resource.url}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
						>
							Visit Resource
							<ExternalLink className="w-4 h-4" />
						</a>
					</div>

					<div className="text-sm text-gray-500">Added on {formattedDate}</div>
				</CardBody>
			</Card>
		</div>
	);
};
