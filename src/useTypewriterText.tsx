import { useCallback, useEffect, useRef, useState } from "react";
import { Items, Options } from "./types";

export default function useTypewriterText(
  items: Items,
  {
    enable = true,
    loop = true,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenItems = 1500,
    onComplete,
  }: Options = {}
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [displayedText, setDisplayedText] = useState("");
  const [isRunning, setIsRunning] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  //   const [status, setStatus] = useState<Status>(enable ? "typing" : "idle");

  const stateRef = useRef({
    currentText: items[currentTextIndex % items.length],
    isLast: currentTextIndex >= items.length - 1,
    onComplete,
  });
  stateRef.current = {
    currentText: items[currentTextIndex % items.length],
    isLast: currentTextIndex >= items.length - 1,
    onComplete,
  };

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);
  const stop = useCallback(() => {
    setIsRunning(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);
  const nextItem = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDeleting(false);
    setCharIndex(0);
    setDisplayedText("");
    setCurrentTextIndex((prev) => prev + 1);
  }, []);
  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayedText("");
    setCharIndex(0);
    setIsDeleting(false);
    setCurrentTextIndex(0);
  }, []);
  const goTo = useCallback((index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayedText("");
    setCharIndex(0);
    setIsDeleting(false);
    setCurrentTextIndex(index);
  }, []);

  useEffect(() => {
    if (!enable || !isRunning) {
      //   setStatus("paused");
      return;
    }

    const { currentText, isLast, onComplete } = stateRef.current;

    if (!isDeleting && charIndex < currentText.length) {
      //   setStatus("typing");
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenItems);
    } else if (isDeleting && charIndex > 0) {
      //   setStatus("deleting");
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      if (!loop && isLast) {
        // setStatus("idle");
        onComplete?.();
        return;
      }
      //   setStatus("typing");
      setIsDeleting(false);
      setCurrentTextIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timeoutRef.current!);
  }, [
    isRunning,
    enable,
    loop,
    charIndex,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    delayBetweenItems,
  ]);
  return [
    displayedText,
    { start, stop, nextItem, reset, goTo },
    // status
  ] as const;
}
