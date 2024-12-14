export interface TextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface ParagraphBlock {
  type: 'paragraph';
  text: string;
  children: TextChild[];
}

interface HeadingBlock {
  type: 'heading';
  text: string;
  level?: number; // Niveau du titre, comme h1, h2, etc.
  children: TextChild[];
}

interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: string[];
  children: TextChild[];
}

interface ImageBlock {
  type: 'image';
  url: string;
  alt?: string;
}

interface QuoteBlock {
  type: 'quote';
  text: string;
  author?: string;
  children: TextChild[];
}

interface CodeBlock {
  type: 'code';
  text: string;
  children: TextChild[];
}

interface LineBreakBlock {
  type: 'line_break';
}

// Union de tous les types possibles de blocs
export type Block =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | ImageBlock
  | QuoteBlock
  | CodeBlock
  | LineBreakBlock;
