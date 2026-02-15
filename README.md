# react-typewriter-text

Lightweight and customizable typewriter effect hook and component for
React.

`react-typewriter-text` provides a fully controlled typewriter animation
with support for looping, speed customization, manual controls, and
completion callbacks.

---

## ✨ Features

- Typewriter typing effect
- Deleting animation
- Loop support
- Fully configurable speeds
- Imperative controls (start, stop, reset, next, goTo)
- TypeScript support
- Lightweight and dependency-free

---

## 📦 Installation

```bash
npm install react-typewriter-text
```

or

```bash
yarn add react-typewriter-text
```

---

## 🚀 Basic Usage

### Using the Component

```tsx
import { TypewriterText } from "react-typewriter-text";

export default function Example() {
  return (
    <TypewriterText
      items={["Hello World", "React Developer", "Open Source Lover"]}
    />
  );
}
```

---

### Using the Hook

```tsx
import { useTypewriterText } from "react-typewriter-text";

export default function Example() {
  const [text, controls] = useTypewriterText(["First", "Second", "Third"], {
    typingSpeed: 120,
    deletingSpeed: 60,
    delayBetweenItems: 2000,
  });

  return (
    <div>
      <p>{text}</p>
      <button onClick={controls.stop}>Stop</button>
      <button onClick={controls.start}>Start</button>
    </div>
  );
}
```

---

## ⚙️ API

```ts
type Items = string[];

type Options = {
  enable?: boolean;
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenItems?: number;
  onComplete?: VoidFunction;
};
```

### Props

---

Prop Type Default Description

---

items `string[]` required List of texts to animate

enable `boolean` `true` Enable / disable animation

loop `boolean` `true` Loop animation

typingSpeed `number` `100` Typing speed in ms

deletingSpeed `number` `50` Deleting speed in ms

delayBetweenItems `number` `1500` Delay before deleting

onComplete `() => void` --- Called when finished (if
loop = false)

---

---

## 🎛 Hook Return Value

```ts
const [displayedText, controls] = useTypewriterText(items, options);
```

### displayedText

Currently rendered animated string.

### controls

Method Description

---

`start()` Resume animation
`stop()` Pause animation
`nextItem()` Immediately move to next item
`reset()` Reset animation to first item
`goTo(index: number)` Jump to specific item index

---

## 📄 License

MIT
