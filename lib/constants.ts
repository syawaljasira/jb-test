interface IWalkthrough {
  slide: number;
  text: string;
}

export const WALKTHROUGH: IWalkthrough[] = [
  {
    slide: 1,
    text: "Professionals around the world shared how they feel about technology and I’ve listened. Now it’s your turn.",
  },
  {
    slide: 2,
    text: "I’ll ask you a handful of meaningful questions and compare your responses with people in your industry.",
  },
  {
    slide: 3,
    text: "You’ll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
  },
] as const;

export const HOME_FEATURES: string[] = [
  "WA businesses feel confident about future growth",
  "AI cant replace creativity",
  "Sales measure true success",
  "Human connection drives WA business",
  "The primary barrier to digital transformation is financial investment",
] as const;
