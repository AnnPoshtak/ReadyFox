import { useEffect } from "react";

export const WelcomeBlock = ({ firstName }: { firstName: string }) => {
    const h1Texts = [
        `Привіт, ${firstName}!👋`,
        `З поверненням, ${firstName}! ⚡`,
        `Час для нових перемог, ${firstName}! 🏆`,
        `Вітаємо в ReadyFox, ${firstName}! 🦊`,
        `Готові до нових знань, ${firstName}? 📚`,
        `Раді бачити тебе, ${firstName}! 🌟`,
        `Вперед до нових результатів, ${firstName}! 🎯`,
        `Чудово, що ти з нами, ${firstName}! 👋`,
        `Твій успіх починається тут, ${firstName}! ✨`,
        `Готуйся до великих результатів, ${firstName}! 💥`,
        `Новий день — нові досягнення, ${firstName}! 🚀`,
    ]

    const pTexts = [
        `Вирушаємо у мандрівку світом знань разом з ReadyFox!`,
        `Готові до нових викликів та перемог?`,
        `Твоя подорож до успіху починається тут!`,
        `Час розкрити свій потенціал та досягти нових висот!`,
        `Відкрий для себе нові горизонти знань та можливостей!`,
        `Твій шлях до великих результатів починається зараз!`,
        `Готуйся до неймовірних відкриттів та досягнень!`,
        `Разом ми створимо твою історію успіху!`,
        `Час діяти та досягати нових вершин!`,
        `Твоя подорож до знань та перемог починається тут!`,
    ]

    const randomH1Text = h1Texts[Math.floor(Math.random() * h1Texts.length)];
    const randomPText = pTexts[Math.floor(Math.random() * pTexts.length)];

    return (
        <section className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">
                {randomH1Text}
            </h1>
            <p className="mt-2 text-lg text-foreground-secondary">
                {randomPText}
            </p>
        </section>
    );
}