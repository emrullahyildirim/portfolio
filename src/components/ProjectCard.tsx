import { useState } from 'react';

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
								<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
								</svg>
							</button>
							<button
								onClick={nextImage}
								className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-bg/80 border border-border rounded-lg text-text-muted hover:text-text hover:bg-bg transition-all"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
								</svg>
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
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
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
						<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
						Live Demo
					</a>
				)}
			</div>
		</div>
	);
}
