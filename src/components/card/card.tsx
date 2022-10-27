import * as React from "react";
import { useRef } from "react";
import styles from "./styles.module.css";

interface Props {
	color: string;
	index: number;
	handleSwipe: (index: number, dorection: "up" | "down") => void;
	onClick: (index: number) => void;
}

export const Card: React.FC<Props> = ({
	color,
	index,
	onClick,
	handleSwipe,
}) => {
	const cardName = "card" + index;
	const startPoint = useRef<number>();
	const lastPoint = useRef<number>();
	const start: React.TouchEventHandler<HTMLDivElement> = (event) => {
		startPoint.current = event.touches?.[0].clientY;
	};
	const end: React.TouchEventHandler<HTMLDivElement> = (event) => {
		const diff = lastPoint.current - startPoint.current;
		if (Math.abs(diff) > 100 && diff < 0) {
			handleSwipe(index, "up");
		} else if (Math.abs(diff) > 100 && diff > 0) {
			handleSwipe(index, "down");
		}
		startPoint.current = undefined;
		lastPoint.current = undefined;
	};
	const move: React.TouchEventHandler<HTMLDivElement> = (event) => {
		lastPoint.current = event.touches[0].clientY;
	};

	return (
		<div
			className={styles.card}
			onClick={() => onClick(index)}
			id={cardName}
			onTouchMove={move}
			onTouchStart={start}
			onTouchEnd={end}
			style={{
				background: `linear-gradient(45deg, rgba(150,146,214,1) 45%, ${color}, rgba(0,212,255,1) 100%)`,
			}}>
			<div className={styles.balance}>$ 2134</div>
			<div className={styles.card_number}>6104 3375 1675 2134</div>
		</div>
	);
};
