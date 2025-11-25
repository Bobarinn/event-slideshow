import { create } from 'zustand';
import { SlideData, SlideElement } from '@/types/slide';

const MOCK_SLIDE: SlideData = {
  id: 'mock-slide',
  name: 'AI Generated Concept',
  background: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
  width: 1920,
  height: 1080,
  elements: [
    {
      id: 'title',
      type: 'text',
      position: { x: 160, y: 160 },
      size: { width: 1200, height: 160 },
      zIndex: 2,
      style: {
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 700,
        fontSize: 96,
        color: '#ffffff',
        textAlign: 'left',
      },
      content: 'Creative Media Vision 2025',
    },
    {
      id: 'subtitle',
      type: 'text',
      position: { x: 160, y: 320 },
      size: { width: 960, height: 120 },
      zIndex: 2,
      style: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: 36,
        color: '#c7d2fe',
        lineHeight: 1.4,
      },
      content: 'AI-enhanced storytelling, immersive visuals, and bold creative strategy.',
    },
    {
      id: 'accent',
      type: 'shape',
      position: { x: 1400, y: 140 },
      size: { width: 320, height: 320 },
      zIndex: 1,
      style: {
        backgroundColor: 'rgba(248, 113, 113, 0.25)',
        borderRadius: 160,
        boxShadow: '0 20px 60px rgba(248, 113, 113, 0.35)',
      },
    },
    {
      id: 'card-1',
      type: 'shape',
      position: { x: 160, y: 520 },
      size: { width: 520, height: 340 },
      zIndex: 2,
      style: {
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        borderRadius: 32,
        boxShadow: '0 16px 40px rgba(15, 23, 42, 0.6)',
        padding: 32,
      },
      content: 'Story Beats\n• Concept Co-Creation\n• AI-assisted Editing\n• Immersive Delivery',
    },
  ],
};

interface SlideStore {
  slide: SlideData | null;
  selectedElementId: string | null;
  isGenerating: boolean;
  setSlide: (slide: SlideData) => void;
  setSelectedElement: (id: string | null) => void;
  updateElement: (id: string, data: Partial<SlideElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  generateSlide: (prompt: string) => Promise<void>;
}

export const useSlideStore = create<SlideStore>((set) => ({
  slide: MOCK_SLIDE,
  selectedElementId: null,
  isGenerating: false,

  setSlide: (slide) => set({ slide }),

  setSelectedElement: (id) => set({ selectedElementId: id }),

  updateElement: (id, data) =>
    set((state) => {
      if (!state.slide) return state;
      return {
        slide: {
          ...state.slide,
          elements: state.slide.elements.map((el) =>
            el.id === id
              ? {
                  ...el,
                  ...data,
                  style: { ...el.style, ...data.style },
                  position: data.position ?? el.position,
                  size: data.size ?? el.size,
                }
              : el
          ),
        },
      };
    }),

  deleteElement: (id) =>
    set((state) => {
      if (!state.slide) return state;
      return {
        slide: {
          ...state.slide,
          elements: state.slide.elements.filter((el) => el.id !== id),
        },
        selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
      };
    }),

  duplicateElement: (id) =>
    set((state) => {
      if (!state.slide) return state;
      const element = state.slide.elements.find((el) => el.id === id);
      if (!element) return state;
      const newElement: SlideElement = {
        ...element,
        id: `${element.id}-${Date.now()}`,
        position: {
          x: element.position.x + 24,
          y: element.position.y + 24,
        },
        zIndex: element.zIndex + 1,
      };
      return {
        slide: {
          ...state.slide,
          elements: [...state.slide.elements, newElement],
        },
        selectedElementId: newElement.id,
      };
    }),

  bringForward: (id) =>
    set((state) => {
      if (!state.slide) return state;
      const elements = [...state.slide.elements];
      const index = elements.findIndex((el) => el.id === id);
      if (index === -1 || index === elements.length - 1) return state;
      [elements[index], elements[index + 1]] = [elements[index + 1], elements[index]];
      return { slide: { ...state.slide, elements } };
    }),

  sendBackward: (id) =>
    set((state) => {
      if (!state.slide) return state;
      const elements = [...state.slide.elements];
      const index = elements.findIndex((el) => el.id === id);
      if (index <= 0) return state;
      [elements[index], elements[index - 1]] = [elements[index - 1], elements[index]];
      return { slide: { ...state.slide, elements } };
    }),

  generateSlide: async (prompt: string) => {
    if (!prompt.trim()) return;
    set({ isGenerating: true });
    try {
      const response = await fetch('/api/generate-slide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate slide');
      }

      const data = await response.json();
      set({ slide: data.slide, selectedElementId: null });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isGenerating: false });
    }
  },
}));

