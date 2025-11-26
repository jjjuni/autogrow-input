# autogrow-input (React/TypeScript)

**Auto-growing textarea** and **auto-width input** for React.

Tiny, dependency‑free components for:

* **AutoHeightTextarea**: height grows with content (span mirror technique)
* **AutoWidthInput**: width grows with content (span mirror technique)

Works with React 18+, SSR/Next.js safe.

### Notes

* Uses `useLayoutEffect` to avoid the one‑frame scroll flicker on updates *and* to be SSR‑safe in Next.js.
* Mirror `<span>` uses identical classes; **consumer must pass the same `className`** they want on the textarea, we reuse it for the mirror.
* Trailing `\n` is handled with a `\u00A0` shim.



## Install

```bash
pnpm add autogrow-input
# or npm i autogrow-input / yarn add autogrow-input
````

## Usage

```tsx
import { AutoHeightTextarea, AutoWidthInput } from "autogrow-input";

export default function Demo() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      <AutoHeightTextarea
        className="w-full p-3 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
        minHeight={100}
      />

      <AutoWidthInput
        className="p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        minWidth={80}
        placeholder="Your name"
      />
    </div>
  );
}
```

### Styling requirements

* The mirror element copies your `className`. Keep **font**, **line-height**, **padding**, **border**, **letter-spacing** identical between mirror and control for accurate sizing (Tailwind classes are fine).

## Tips

* To prevent layout jump on font load, consider setting a system font fallback or measuring after fonts are ready.
* If you need animation when growing, apply a CSS transition on `height`/`width` via `style` or class.
