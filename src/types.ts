export type Items = string[];
export type Options = {
  enable?: boolean;
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenItems?: number;
  onComplete?: VoidFunction;
};
export type Status = "typing" | "deleting" | "paused" | "idle";
