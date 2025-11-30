'use client'

import { TextareaHTMLAttributes, useLayoutEffect, useRef, useState } from "react";

interface AutoHeightTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
  value: string;
  spanClassName?: string;
  containerClassName?: string;
}

export const AutoHeightTextarea: React.FC<AutoHeightTextAreaProps> = ({
  minHeight = 100,
  maxHeight = 500,
  value: inputValue,
  spanClassName,
  containerClassName,
  ...props
}) => {
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