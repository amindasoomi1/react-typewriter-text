import { Items, Options } from "./types";
import useTypewriterText from "./useTypewriterText";

type Props = {
  items: Items;
} & Options;

export default function TypewriterText({ items, ...options }: Props) {
  const [displayedText] = useTypewriterText(items, options);
  return <>{displayedText}</>;
}
