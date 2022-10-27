import styles from "./styles.module.css";
import * as React from "react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { Card } from "./components/card/card";

interface CardProps {
	color: string;
}

const data: CardProps[] = [
	{ color: "red" },
	{ color: "blue" },
	{ color: "green" },
];
function App() {
	const [cards, setCards] = useState<CardProps[]>(data);
	const [isRunning, setIsRunning] = useState(false);
	const [selected, setSelected] = useState<number>();
	const handleSelect = (index: number) => {
		const selectAnimation = {
			scale: 1.2,
			y: "-100",
			filter: "drop-shadow(0px 0px 80px black)",
		};
		const currentTarget = "#card" + index;

		const tl = gsap.timeline();
		if (selected === index) {
			console.log("back");
			tl.to(currentTarget, {
				scale: 1,
				filter: "drop-shadow(0px 0px 0px black)",
				y: 0,
			});
			setSelected(-1);
			return;
		}
		setSelected(index);
		tl.to(currentTarget, selectAnimation);
	};

	const handleSwipe = (index: number, direction: "up" | "down") => {
		if (isRunning) {
			// return;
		}
		setSelected(-1);

		const tl = gsap.timeline();
		const currentTarget = "#card" + index;
		tl.to(currentTarget, {
			y: direction === "up" ? "-270" : "270",
			rotate: direction === "up" ? "-15" : "15",
			scale: 1.1,
			duration: 0.2,
			onStart: () => {
				setIsRunning(true);
			},
			onComplete: () => {
				setCards((prevState) => {
					const new_cards = [...prevState];
					new_cards.push(new_cards.splice(0, 1)[0]);
					return new_cards;
				});
			},
		})
			.set(currentTarget, { zIndex: 0 })
			.to(currentTarget, {
				y: "0",
				rotate: "0",
				scale: 1,
				onComplete: () => {
					setIsRunning(false);
				},
			});
	};

	useEffect(() => {
		console.table(cards);
		cards.forEach((c, index) => {
			const cardName = "card" + index;
			const target = "#" + cardName;
			gsap.to(target, {
				zIndex: 100 - index,

				y: 200 * (1 - Math.pow(0.9, index * 1)),
				scale: Math.pow(0.9, index),
				// opacity: Math.pow(0.9, index),
			});
		});
	}, [cards]);

	return (
		<div className={styles.app}>
			<p className={styles.title}>Swipe up or down and tap to choose a card</p>
			<p className={styles.message}>بفرمایید جنگولک بازی:)</p>
			{cards.map((c, index) => (
				<Card
					handleSwipe={handleSwipe}
					key={c.color}
					onClick={handleSelect}
					color={c.color}
					index={index}
				/>
			))}
			{/*<p className={styles.footer}>by lifeDebugger</p>*/}
			<div className={styles.fader} />
		</div>
	);
}

export default App;
