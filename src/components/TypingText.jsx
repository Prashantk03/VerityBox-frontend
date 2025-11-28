import { useState, useEffect } from "react";

export default function TypingText({ text, speed = 30}) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        setDisplayed("");

        const interval = setInterval(() => {
            setDisplayed((prev) => prev + text.charAt(i));
            i++;

            if (i >= text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <p>{displayed}</p>;
}