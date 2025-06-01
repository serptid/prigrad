"use client";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import "@/app/globals.css";
import SPWMini from 'spwmini/client';
import { useEffect, useRef, useState } from "react";

type GameButton = {
  id: string;
  position: { x: number; y: number };
  scale: number;
  isReal: boolean;
};

export default function Home() {
  const [spm, setSpm] = useState<SPWMini | null>(null);
  const [buttons, setButtons] = useState<GameButton[]>([
    { id: "root", position: { x: 0, y: 0 }, scale: 1, isReal: false },
  ]);
  const buttonRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const spmInstance = new SPWMini('8346d39a-bc0e-48b8-9f4b-85c37a32e55a');
    setSpm(spmInstance);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const updated = buttons.map((btn) => {
      const ref = buttonRefs.current[btn.id];
      if (!ref) return btn;

      const rect = ref.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 250) {
        const angle = Math.atan2(dy, dx);
        const strength = Math.max(150 - distance, 30);
        const offsetX = Math.cos(angle) * -strength;
        const offsetY = Math.sin(angle) * -strength;

        const newX = Math.max(Math.min(btn.position.x + offsetX, window.innerWidth / 2 - 100), -window.innerWidth / 2 + 100);
        const newY = Math.max(Math.min(btn.position.y + offsetY, window.innerHeight / 2 - 100), -window.innerHeight / 2 + 100);
        const newScale = Math.max(0.1, distance / 300);

        return { ...btn, position: { x: newX, y: newY }, scale: newScale };
      } else {
        return { ...btn, scale: 1 };
      }
    });

    setButtons(updated);
  };

  const handleClick = (id: string, isReal: boolean) => {
    if (isReal) {
      spm?.openURL('https://discord.gg/R8D53fZFfD');
      window.open('https://discord.gg/R8D53fZFfD', '_blank', 'noopener,noreferrer');
      return;
    }

    const clickedButton = buttons.find((b) => b.id === id);
    if (!clickedButton) return;

    const children =
      id === "root"
        ? [
            {
              id: `${id}-1`,
              position: { x: clickedButton.position.x + 100, y: clickedButton.position.y + 100 },
              scale: 1,
              isReal: false,
            },
          ]
        : Array.from({ length: 3 }).map((_, i) => ({
            id: `${id}-child-${i}`,
            position: {
              x: clickedButton.position.x + (i - 1) * 120,
              y: clickedButton.position.y + 120,
            },
            scale: 1,
            isReal: i === Math.floor(Math.random() * 3),
          }));

    setButtons((prev) => [...prev, ...children]);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-gradient-to-b from-green-950 to-green-800 overflow-hidden flex flex-col items-center justify-center py-6 px-6 font-sans"
    >
      <div className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-cover opacity-20 animate-pulse"></div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-7xl font-extrabold mb-4 text-center text-green-100 drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] tracking-wide"
      >
        Прыград
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-[1.35rem] max-w-2xl text-center mb-8 text-green-200 leading-relaxed"
      >
        Добро пожаловать в Прыград — зелёный и тёплый город Minecraft, где деревья обнимают здания, а приключения начинаются за каждым холмом.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="🎮 Интерактив"
          description="Город очень внимателен к мелочам и скурпулёзно их прорабатывает. В любой декорацией есть какое-то взаимодействие, везде есть какие-то мини-игры, данжи или квесты от НПС или БОССЫ!"
        />
        <FeatureCard
          title="🏃 Паркур"
          description="На любую поверхность в городе можно запаркурить. Куда угодно вы можете попасть и это сделано иногда с помощью использования окружения."
        />
        <FeatureCard
          title="🎉 Ивенты"
          description="В городе куча заготовок для ивентов, из которых, как из кирпичиков лего, собираются ивенты. Благодаря всему этому, ивенты в Прыграде проходят минимум раз в неделю, не теряя при этом в качестве."
        />
      </div>

      {buttons.map((btn) => (
        <motion.div
          key={btn.id}
          ref={(el) => { buttonRefs.current[btn.id] = el; }}
          animate={{ x: btn.position.x, y: btn.position.y, scale: btn.scale }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute"
        >
          <Button
            color="success"
            radius="full"
            size="lg"
            className="bg-green-700 hover:bg-green-800 text-md font-bold py-3.5 px-7 shadow-xl"
            onClick={() => handleClick(btn.id, btn.isReal)}
          >
            {btn.isReal ? "Настоящий портал" : "Присоединиться к Прыграду"}
          </Button>
        </motion.div>
      ))}
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
      className="bg-green-800 rounded-2xl shadow-2xl p-7 border-4 border-green-600 text-center cursor-pointer"
    >
      <h2 className="text-[1.65rem] font-semibold mb-4 text-green-100 tracking-wide">{title}</h2>
      <p className="text-green-200 text-base leading-relaxed">{description}</p>
    </motion.div>
  );
}
