export interface Card {
  title: string;
  subTitle: string;
  cardType: 'Question' | 'Poll' | 'Comment';
  content: string;
  options?: string[]
}
