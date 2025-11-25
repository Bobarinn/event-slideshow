export type ElementType = 'text' | 'image' | 'shape';

export interface ElementStyle {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  textAlign?: 'left' | 'center' | 'right';
  boxShadow?: string;
  opacity?: number;
}

export interface SlideElement {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation?: number;
  zIndex: number;
  locked?: boolean;
  style: ElementStyle;
  content?: string;
  src?: string;
}

export interface SlideData {
  id: string;
  name: string;
  background: string;
  width: number;
  height: number;
  elements: SlideElement[];
}


