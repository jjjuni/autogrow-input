import { TextareaHTMLAttributes, useLayoutEffect, useRef, useState, forwardRef } from "react";

interface AutoHeightTextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  value: string;
  minHeight?: number;
  maxHeight?: number;
  spanClassName?: string;
  containerClassName?: string;
}

export const AutoHeightTextarea = forwardRef<HTMLTextAreaElement, AutoHeightTextAreaProps>(
  ({ minHeight = 100, maxHeight = 500, value: inputValue, spanClassName, containerClassName, ...props }, ref) => {
    const [textareaHeight, setTextareaHeight] = useState(minHeight);
    const spanRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
      if (spanRef.current) {
        const textHeight = spanRef.current.getBoundingClientRect().height;
        const calculatedHeight = Math.min(Math.max(minHeight, textHeight), maxHeight);
        setTextareaHeight(calculatedHeight);
      }
    }, [inputValue, minHeight]);

    return (
      <div className={`${containerClassName} relative`} style={{ width: `100%`, height: `${textareaHeight}px` }}>
        <span
          ref={spanRef}
          className={`${props.className} ${spanClassName}`}
          style={{
            pointerEvents: "none",
            position: "absolute",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            opacity: 0,
          }}
        >
          {inputValue || ""}
          {inputValue?.endsWith("\n") ? "\u00A0" : null}
        </span>
        <textarea
          ref={ref}
          className={`${props.className}`}
          style={{ height: `${textareaHeight}px` }}
          value={inputValue}
          {...props}
        />
      </div>
    );
  }
);

AutoHeightTextarea.displayName = "AutoHeightTextarea";
