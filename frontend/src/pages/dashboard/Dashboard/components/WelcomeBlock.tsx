import { useEffect, useState } from 'react';

const h1Texts = [
  (name: string) => `Вітаємо в ReadyFox, ${name}! 🦊`,
  (name: string) => `З поверненням, ${name}! ⚡`,
  (name: string) => `Час для нових досягнень, ${name}! 🏆`,
  (name: string) => `Готові до нових знань, ${name}? 📚`,
  (name: string) => `Раді бачити вас, ${name}! 🌟`,
  (name: string) => `Вперед до нових результатів, ${name}! 🎯`,
  (name: string) => `Ваш успіх починається тут, ${name}! ✨`,
  (name: string) => `Новий день — нові можливості, ${name}! 🚀`,
];

const pTexts = [
  'Вирушаємо у мандрівку світом знань разом з ReadyFox!',
  'Час розкрити свій потенціал та досягти нових висот.',
  'Відкривайте нові горизонти знань та можливостей.',
  'Ваш шлях до великих результатів починається зараз.',
  'Готуйтеся до цікавих матеріалів та нових відкриттів!',
  'Разом створимо вашу власну історію успіху.',
  'Час діяти та підкорювати нові вершини!',
];

export const WelcomeBlock = ({ firstName }: { firstName: string }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    const randomH1 = h1Texts[Math.floor(Math.random() * h1Texts.length)];
    const randomP = pTexts[Math.floor(Math.random() * pTexts.length)];

    setTitle(randomH1(firstName));
    setSubtitle(randomP);
  }, [firstName]);

  if (!title) {
    return (
      <section className="mb-8 min-h-[88px]">
        <h1 className="text-4xl font-bold text-foreground">
          Вітаємо в ReadyFox, {firstName}! 🦊
        </h1>
        <p className="mt-2 text-lg text-foreground-secondary">
          Завантаження вашого робочого простору...
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h1 className="text-4xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 text-lg text-foreground-secondary">{subtitle}</p>
    </section>
  );
};