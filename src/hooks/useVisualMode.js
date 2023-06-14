import { useState } from 'react';


export default function useVisualMode(initialMode) {
    const [mode, setMode] = useState(initialMode);
    const [history, setHistory] = useState([initialMode]);

    const transition = (newMode, replace = false) => {
        if (replace) {
            setMode(newMode);
            setHistory((prevHistory) => {
                const newHistory = [...prevHistory];
                newHistory[newHistory.length - 1] = newMode;
                return newHistory;
            });
        } else {
            setMode(newMode);
            setHistory((prevHistory) => [...prevHistory, newMode]);
        }
    };

    const back = () => {
        if (history.length > 1) {
            const newHistory = [...history.slice(0, -1)];
            setMode(newHistory[newHistory.length - 1]);
            setHistory(newHistory);
        }
    };

    return {
        mode,
        transition,
        back
    };
}
