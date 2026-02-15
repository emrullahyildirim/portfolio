import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'dark' | 'light'>('dark');

	useEffect(() => {
		const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
		const initial = stored || 'dark';
		setTheme(initial);
		document.documentElement.classList.toggle('light', initial === 'light');
	}, []);

	const toggle = () => {
		const next = theme === 'dark' ? 'light' : 'dark';
		setTheme(next);
		localStorage.setItem('theme', next);
		document.documentElement.classList.toggle('light', next === 'light');
	};

	return (
		<button
			onClick={toggle}
			className="fixed top-6 right-6 p-2.5 bg-bg-secondary border border-border rounded-lg text-text-muted hover:text-text hover:border-border-hover transition-all z-50 cursor-pointer"
			aria-label="Toggle theme"
		>
			<Icon
				icon={theme === 'dark' ? 'lucide:sun' : 'lucide:moon'}
				className="w-5 h-5"
			/>
		</button>
	);
}
