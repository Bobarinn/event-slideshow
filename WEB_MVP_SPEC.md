# Web-Based Slide Builder MVP – Project Specification

## Goal
Build a web-based slide builder (React, Next.js) that allows users to:
1. Generate slide layouts via AI prompts
2. Edit slide elements visually (drag/drop + sidebar forms)
3. Store slides as coordinate-based JSON
4. Export slides later (not in MVP scope)

## Tech Stack
| Layer         | Choice                                 | Reason |
|---------------|----------------------------------------|--------|
| Framework     | Next.js 14 (App Router)                | Matches existing project |
| Styling       | Tailwind CSS + shadcn/ui               | Fast, consistent, modern |
| State Mgmt    | Zustand                                | Simple global store |
| Drag & Drop   | @dnd-kit/core + sortable + utilities   | Modern, flexible |
| Forms         | react-hook-form + zod                  | Declarative validation |
| Icons         | lucide-react                           | Lightweight |
| Animations    | Framer Motion                          | Already in project |
| AI API        | OpenAI (or Anthropic)                  | Replaceable backend |

---

## Feature Breakdown (MVP)

### 1. AI Generation
- Prompt input + Generate button
- Call `/api/generate-slide` with prompt
- AI returns JSON describing slide elements
- JSON structure stored in Zustand
- Rendered immediately on canvas

### 2. Canvas Editor (React DOM)
- Canvas is a `div` (1920x1080, scaled)
- Elements rendered as absolutely-positioned `div`s
- `@dnd-kit` handles drag, resize handles optional
- Selection outline (blue glow)
- Delete/Duplicate via keyboard or sidebar

### 3. Sidebar Editor
- Shows inputs for selected element
- Properties depend on element type
  - Text: content, font family, font weight, font size, color, alignment
  - Image: URL, fit (cover/contain), border radius
  - Shape: background color, border radius, opacity
- Form built with shadcn `Form`, `Input`, `Textarea`, `Slider`, `ColorPicker`
- `react-hook-form` + `zod` for validation + real-time updates

### 4. Slide JSON Storage
```ts
interface SlideData {
  id: string;
  name: string;
  background: string;      // CSS color/gradient
  width: number;           // 1920
  height: number;          // 1080
  elements: SlideElement[];
}

type ElementType = "text" | "image" | "shape";

interface SlideElement {
  id: string;
  type: ElementType;
  position: { x: number; y: number };      // px
  size: { width: number; height: number }; // px
  rotation?: number;                       // deg
  zIndex: number;
  locked?: boolean;
  style: ElementStyle;                     // CSS-like
  content?: string;                        // for text
  src?: string;                            // for image
}

interface ElementStyle {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  textAlign?: "left" | "center" | "right";
  boxShadow?: string;
  opacity?: number;
}
```

### 5. Future Export (Not MVP)
- Use existing Puppeteer pipeline or html2canvas
- Ensure data structure supports high fidelity export later

---

## API Contract – `/api/generate-slide`

**Request**
```ts
POST /api/generate-slide
{
  prompt: string;
  style?: "modern" | "minimal" | "corporate" | "vibrant";
}
```

**Response**
```ts
{
  slide: SlideData; // Must include elements with coordinates & styles
}
```

**AI Prompt Requirements**
- Provide background color/gradient
- Provide 3–6 elements with absolute positions
- Return hex colors, px sizes, Tailwind-friendly fonts (`"Inter"`, `"Space Grotesk"`, etc.)
- Use descriptive IDs (`"title"`, `"bullet-1"`) when possible

---

## Component Architecture

```
app/
 └─ editor/
     └─ page.tsx
components/
 ├─ editor/
 │   ├─ PromptBar.tsx
 │   ├─ Canvas.tsx
 │   ├─ SlideElement.tsx
 │   ├─ ElementSelectionOverlay.tsx
 │   ├─ Sidebar.tsx
 │   └─ SidebarPanels/
 │        ├─ TextPanel.tsx
 │        ├─ ImagePanel.tsx
 │        └─ ShapePanel.tsx
 └─ ui/ (shadcn components)
store/
 └─ useSlideStore.ts
types/
 └─ slide.ts
utils/
 ├─ aiClient.ts
 ├─ elementUtils.ts
 └─ colorUtils.ts
```

---

## Zustand Store (Pseudo-code)

```ts
interface SlideStore {
  slide: SlideData | null;
  selectedElementId: string | null;
  isGenerating: boolean;

  setSlide: (slide: SlideData) => void;
  setSelectedElement: (id: string | null) => void;
  updateElement: (id: string, data: Partial<SlideElement>) => void;
  addElement: (el: SlideElement) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  generateSlide: (prompt: string) => Promise<void>;
}
```

Implementation notes:
- `updateElement`: deep merge style objects
- `duplicateElement`: offset position by +20px, new ID
- `bringForward`/`sendBackward`: reorder `zIndex`
- All actions should be undoable later (keep history stack optional)

---

## Canvas Implementation Details

### Positioning
```tsx
<div
  className={cn("absolute", selected && "ring-2 ring-blue-500")}
  style={{
    left: element.position.x,
    top: element.position.y,
    width: element.size.width,
    height: element.size.height,
    transform: `rotate(${element.rotation ?? 0}deg)`
  }}
>
  {/* Element content */}
</div>
```

### Drag & Drop (dnd-kit)
```tsx
import { useDraggable } from "@dnd-kit/core";

function DraggableElement({ element }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {/* Element */}
    </div>
  );
}
```

### Selection Overlay
- Show handles (top-left, top-right, bottom-left, bottom-right)
- Resize handles optional for MVP (drag-only)
- Delete/duplicate buttons appear near selection

---

## Sidebar Panels

### Common Controls
- Name field (optional)
- Position (x, y): number inputs
- Size (width, height): number inputs
- Rotation: slider (0–360°)
- Layer controls: Bring to front/back
- Visibility toggle
- Lock toggle

### Text Panel
- Content (textarea)
- Font family (select)
- Font weight (select)
- Font size (slider)
- Line height (slider)
- Letter spacing (slider)
- Text color (color picker)
- Text align (toggle group)
- Background color (optional)
- Padding (slider)

### Image Panel
- Image URL (input + upload)
- Fit mode (select: cover/contain/fill)
- Border radius (slider)
- Shadow preset (select)
- Opacity (slider)

### Shape Panel
- Fill color
- Border color
- Border width
- Corner radius
- Opacity
- Shadow

---

## Prompt & AI Generation Flow

1. User enters prompt (e.g., “Modern slide about AI ethics”)
2. Optional style dropdown (Modern, Minimal, Corporate, Vibrant)
3. Frontend calls `/api/generate-slide`
4. API constructs system prompt (include JSON schema)
5. AI returns JSON
6. Backend validates JSON (zod)
7. IDs/zIndex assigned
8. Store updated, canvas re-renders

**Example System Prompt Snippet**
```
You are a presentation designer. Return ONLY valid JSON with this schema:
{
  "background": "#0f172a linear-gradient(...)",
  "elements": [
    {
      "type": "text",
      "content": "string",
      "position": { "x": 120, "y": 200 },
      "size": { "width": 600, "height": 120 },
      "style": { "fontSize": 64, "fontWeight": 700, "color": "#f8fafc" }
    },
    ...
  ]
}
```

---

## UI/UX Notes
- Canvas background: checkerboard pattern or dark gray when empty
- Zoom/pan controls (optional)
- Keyboard shortcuts:
  - Delete → delete element
  - Cmd/Ctrl + D → duplicate
  - Arrow keys → nudge 1px
  - Shift + Arrow → nudge 10px
- Toast notifications for success/error
- Loading overlay during AI generation
- Empty state illustration when no slide

---

## Implementation Milestones

### Milestone 1 – Core Infrastructure
1. Next.js page at `/editor`
2. Zustand store with mock slide
3. Canvas renders mock elements
4. Sidebar shows element properties (read-only)

### Milestone 2 – Editing UX
1. Click to select element
2. Sidebar inputs update element
3. Drag & drop using dnd-kit
4. Delete & duplicate actions

### Milestone 3 – AI Generation
1. Prompt input + button
2. API route calling OpenAI
3. JSON validation + store update
4. Loading states & errors

### Milestone 4 – Polish
1. Keyboard shortcuts
2. Better selection overlay
3. Element outline while dragging
4. Undo/Redo (optional)
5. Save/Load (optional, localStorage)

---

## Testing Checklist
- [ ] Render mock slide successfully
- [ ] Select/deselect elements via click
- [ ] Drag element updates coordinates
- [ ] Sidebar edits update the canvas
- [ ] Duplicate/delete functions work
- [ ] AI prompt generates a new slide
- [ ] Invalid AI response handled gracefully
- [ ] Loading/error states visible
- [ ] Keyboard shortcuts function
- [ ] Layout responsive on standard breakpoints

---

## Future Extensions (Post-MVP)
- Export (PNG/PDF) using Puppeteer/html2canvas
- Multi-slide presentations
- Templates gallery
- Asset library (icons, stickers)
- Collaboration & commenting
- Version history/undo-redo stack
- Animations & transitions
- Voice/gesture controls

---

This document contains everything required to build the Phase 1 web-based MVP using React components plus coordinate-based JSON. Use it as the blueprint for implementation and for guiding AI-assisted coding. 


