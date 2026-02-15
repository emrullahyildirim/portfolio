import { GitHubCalendar } from 'react-github-calendar';
import { useState, useEffect } from 'react';

const blueTheme = {
	dark: ['#1a1a24', '#1e3a5f', '#2563eb', '#3b82f6', '#60a5fa'],
};

function Skeleton() {
	return (
		<div className="flex gap-1 animate-pulse w-full justify-between">
			{Array.from({ length: 53 }).map((_, weekIdx) => (
				<div key={weekIdx} className="flex flex-col gap-1">
					{Array.from({ length: 7 }).map((_, dayIdx) => (
						<div
							key={dayIdx}
							className="w-2.5 h-2.5 rounded-sm bg-bg-tertiary"
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default function GithubChart() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="relative min-h-[120px]">
			{loading && (
				<div className="absolute inset-0 flex items-center">
					<Skeleton />
				</div>
			)}
			<div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
				<GitHubCalendar
					username="emrullahyildirim"
					colorScheme="dark"
					theme={blueTheme}
					blockSize={11}
					blockMargin={4}
					fontSize={12}
				/>
			</div>
		</div>
	);
}
