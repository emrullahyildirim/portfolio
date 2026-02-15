import { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

export default function Spotlight() {
	const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
	const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

	const springConfig = { damping: 25, stiffness: 150 };
	const x = useSpring(mouseX, springConfig);
	const y = useSpring(mouseY, springConfig);

	const spotlightMask = useTransform([x, y], ([latestX, latestY]) => {
		return `radial-gradient(400px circle at ${latestX}px ${latestY}px, black 0%, rgba(0,0,0,0.3) 50%, transparent 100%)`;
	});

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [mouseX, mouseY]);

	return (
		<div className="fixed inset-0 z-[-1] pointer-events-none">
			<div
				className="absolute inset-0 bg-grid-faded"
				style={{
					maskImage: 'radial-gradient(ellipse 70% 70% at center, black 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
					WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
				}}
			/>
			<motion.div
				className="absolute inset-0 bg-grid-bright"
				style={{
					maskImage: spotlightMask,
					WebkitMaskImage: spotlightMask,
				}}
			/>
		</div>
	);
}
