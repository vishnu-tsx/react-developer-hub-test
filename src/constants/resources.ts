import type {
	ResourceType,
	SkillLevel,
} from "../api/resources/resources.types";

export const FILTER_OPTIONS = [
	{
		id: "resourceTypes",
		label: "Resource Type",
		options: ["Article", "Video", "Documentation", "GitHub"],
	},
	{
		id: "skillLevels",
		label: "Skill Levels",
		options: ["Beginner", "Intermediate", "Expert"],
	},
] as const;

export const RESOURCE_TYPE_MAP: Record<string, ResourceType> = {
	Article: "article",
	Video: "video",
	Documentation: "docs",
	GitHub: "github",
};

export const SKILL_LEVEL_MAP: Record<string, SkillLevel> = {
	Beginner: "beginner",
	Intermediate: "intermediate",
	Expert: "expert",
};
