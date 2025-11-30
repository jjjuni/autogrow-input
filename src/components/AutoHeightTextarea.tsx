'use client'

import { TextareaHTMLAttributes, useLayoutEffect, useRef, useState } from "react";

interface AutoHeightTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  value: string;
  spanClassName?: string;
}

export const AutoHeightTextarea: React.FC<AutoHeightTextAreaProps> = ({
  minHeight = 100,
  value: inputValue,
  spanClassName,
  ...props
}) => {
  const [textareaHeight, setTextareaHeight] = useState(minHeight);
  const spanRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (spanRef.current) {
      const textHeight = spanRef.current.getBoundingClientRect().height;
      const calculatedHeight = Math.max(minHeight, textHeight);
      setTextareaHeight(calculatedHeight);
    }
  }, [inputValue, minHeight]);

  return (
    <div className="relative" style={{ height: `${textareaHeight}px` }}>
      <span
        ref={spanRef}
        className={`${props.className} ${spanClassName}`}
        style={{
          pointerEvents: "none",
          position: "absolute",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          opacity: 0,
        }}>
        {inputValue || ""}
        {inputValue?.endsWith("\n") ? "\u00A0" : null}
      </span>
      <textarea
        className={`${props.className}`}
        style={{ height: `${textareaHeight}px` }}
        value={inputValue}
        {...props}
      />
    </div>
  );
};