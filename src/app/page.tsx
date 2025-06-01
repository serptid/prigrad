"use client";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import "@/app/globals.css";
import SPWMini from 'spwmini/client';
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [spm, setSpm] = useState<SPWMini | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spmInstance = new SPWMini('8346d39a-bc0e-48b8-9f4b-85c37a32e55a');
    setSpm(spmInstance);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      const angle = Math.atan2(dy, dx);
      const offsetX = Math.cos(angle) * -100;
      const offsetY = Math.sin(angle) * -100;

      setPosition(prev => {
        let newX = prev.x + offsetX;
        let newY = prev.y + offsetY;

        // Ограничим по краям экрана
        newX = Math.max(Math.min(newX, window.innerWidth / 2 - 100), -window.innerWidth / 2 + 100);
        newY = Math.max(Math.min(newY, window.innerHeight / 2 - 100), -window.innerHeight / 2 + 100);

        return { x: newX, y: newY };
      });
    }
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

      <motion.div
        ref={buttonRef}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mt-12 absolute"
      >
        <Button
          color="success"
          radius="full"
          size="lg"
          className="bg-green-700 hover:bg-green-800 text-md font-bold py-3.5 px-7 shadow-xl"
          onClick={() => {
            spm?.openURL('https://discord.gg/R8D53fZFfD');
            window.open('https://discord.gg/R8D53fZFfD', '_blank', 'noopener,noreferrer');
          }}
        >
          Присоединиться к Прыграду
        </Button>
      </motion.div>
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
