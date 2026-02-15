import { useState } from 'react';
import { Icon } from '@iconify/react';

interface Project {
	title: string;
	description: string;
	tech: string[];
	github?: string;
	live?: string;
	images?: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
	const [currentImage, setCurrentImage] = useState(0);
	const hasImages = project.images && project.images.length > 0;
	const hasMultipleImages = project.images && project.images.length > 1;

	const nextImage = () => {
		if (project.images) {
			setCurrentImage((prev) => (prev + 1) % project.images!.length);
		}
	};

	const prevImage = () => {
		if (project.images) {
			setCurrentImage((prev) => (prev - 1 + project.images!.length) % project.images!.length);
		}
	};

	return (
		<div className="group flex flex-col p-5 bg-bg-secondary border border-border rounded-xl space-y-4 transition-all duration-200 hover:border-border-hover">
			{hasImages && (
				<div className="relative rounded-lg overflow-hidden bg-bg-tertiary">
					<img
						src={project.images![currentImage]}
						alt={`${project.title} screenshot ${currentImage + 1}`}
						className="w-full h-48 object-contain"
					/>
					{hasMultipleImages && (
						<>
							<button
								onClick={prevImage}
								className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-bg/80 border border-border rounded-lg text-text-muted hover:text-text hover:bg-bg transition-all"
							>
								<Icon icon="lucide:chevron-left" className="w-4 h-4" />
							</button>
							<button
								onClick={nextImage}
								className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-bg/80 border border-border rounded-lg text-text-muted hover:text-text hover:bg-bg transition-all"
							>
								<Icon icon="lucide:chevron-right" className="w-4 h-4" />
							</button>
							<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
								{project.images!.map((_, idx) => (
									<button
										key={idx}
										onClick={() => setCurrentImage(idx)}
										className={`w-1.5 h-1.5 rounded-full transition-all ${
											idx === currentImage ? 'bg-text' : 'bg-text-muted/50'
										}`}
									/>
								))}
							</div>
						</>
					)}
				</div>
			)}

			<div className="flex-1 space-y-3">
				<h3 className="text-lg font-semibold text-text">{project.title}</h3>
				<p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>
			</div>

			<div className="flex flex-wrap gap-2">
				{project.tech.map((t) => (
					<span
						key={t}
						className="px-2 py-1 text-xs text-text-muted bg-bg-tertiary border border-border rounded-md"
					>
						{t}
					</span>
				))}
			</div>

			<div className="flex items-center gap-3 pt-2">
				{project.github && (
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary bg-bg-tertiary border border-border rounded-lg hover:border-border-hover hover:text-text transition-all"
					>
						<Icon icon="simple-icons:github" className="w-4 h-4" />
						Source
					</a>
				)}
				{project.live && (
					<a
						href={project.live}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-3 py-1.5 text-sm text-text bg-accent border border-accent rounded-lg hover:bg-accent-hover transition-all"
					>
						<Icon icon="lucide:external-link" className="w-4 h-4" />
						Live Demo
					</a>
				)}
			</div>
		</div>
	);
}
