"use client";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import "@/app/globals.css";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-green-950 to-green-800 overflow-hidden flex flex-col items-center justify-center p-8 font-sans">
      <div className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-cover opacity-20 animate-pulse"></div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-7xl font-extrabold mb-8 text-center text-green-100 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] tracking-wide"
      >
        Прыград
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-2xl max-w-2xl text-center mb-12 text-green-200 leading-relaxed"
      >
        Добро пожаловать в Прыград — зелёный и тёплый город Minecraft, где деревья обнимают здания, а приключения начинаются за каждым холмом.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="mt-16"
      >
        <Button
          color="success"
          radius="full"
          size="lg"
          className="bg-green-700 hover:bg-green-800 text-lg font-bold py-4 px-8 shadow-xl"
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
      className="bg-green-800 rounded-3xl shadow-2xl p-8 border-4 border-green-600 text-center cursor-pointer"
    >
      <h2 className="text-3xl font-semibold mb-4 text-green-100 tracking-wide">{title}</h2>
      <p className="text-green-200 leading-relaxed">{description}</p>
    </motion.div>
  );
}
