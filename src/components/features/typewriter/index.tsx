import { ITypography, Typography } from "@/components/features/typography";
import { useState, useEffect, ReactElement } from "react";

const useTypewriter = (text: string, speed: number): string => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prevText => prevText + text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => {
            clearInterval(typingInterval);
        };
    }, [text, speed]);

    return displayText;
};

interface ITypewriterProps extends ITypography {
    text: string;
    speed?: number;
}

const Typewriter = ({ text, speed = 50, ...props }: ITypewriterProps): ReactElement => {
    const displayText = useTypewriter(text, speed);

    return <Typography {...props}>{displayText}</Typography>;
};

export default Typewriter;
