import { InputHTMLAttributes, useEffect, useRef, useState } from "react";

interface AutoWidthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  minWidth?: number;
  value: string;
  spanClassName?: string;
}

export const AutoWidthInput: React.FC<AutoWidthInputProps> = ({
  minWidth = 0,
  value,
  spanClassName,
  ...props
}) => {

  const [inputWidth, setInputWidth] = useState(minWidth);

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      const textWidth = spanRef.current.getBoundingClientRect().width;
      const calculatedWidth = Math.max(minWidth, textWidth);
      setInputWidth(calculatedWidth);
    }
  }, [value]);

  return (
    <div className={`relative`}>
      <span
        ref={spanRef}
        className={`${props.className} ${spanClassName} pointer-events-none opacity-0 absolute`}>
        {value}
      </span>
      <input 
        {...props}
        style={{ width: `${inputWidth}px` }}/>
    </div>
  )
}