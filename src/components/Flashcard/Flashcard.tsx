import React, { useState, useCallback } from "react";
import FlashcardProps from "../../interfaces/IFlashcard";
import "./Flashcard.scss";

/**
 * Safe content renderer component
 */
const ContentRenderer = ({
  content,
  className = "",
  style = {},
}: {
  content: string | JSX.Element;
  className?: string;
  style?: React.CSSProperties;
}) => {
  // If content is already a JSX element, just render it
  if (typeof content !== "string") {
    return (
      <div className={`FlashcardWrapper__item--content ${className}`} style={style}>
        {content}
      </div>
    );
  }

  // For string content, render normally
  return (
    <div className={`FlashcardWrapper__item--content ${className}`} style={style}>
      <div>{content}</div>
    </div>
  );
};

function Flashcard({
  frontHTML,
  frontCardStyle,
  frontContentStyle,
  frontContentClassName = "",
  backHTML,
  backCardStyle,
  backContentStyle,
  backContentClassName = "",
  className = "",
  style,
  height,
  borderRadius = "1rem",
  width,
  onCardFlip = (state = false) => {},
  manualFlipRef = { current: null },
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function onManualFlip() {
    setIsFlipped(!isFlipped);
    onCardFlip(!isFlipped);
  }

  if (manualFlipRef.current !== null) {
    manualFlipRef.current = onManualFlip;
  }

  return (
    <div
      className={`FlashcardWrapper ${className}`}
      style={Object.assign(
        {},
        {
          height: height,
          width: width
        },
        style || {}
      )}
    >
      <div
        className={`FlashcardWrapper__item ${
          isFlipped ? "FlashcardWrapper__item--flip" : ""
        }`}
        style={{
          borderRadius: borderRadius,
        }}
        onClick={() => {
          if (manualFlipRef.current) return;
          setIsFlipped(!isFlipped);
          onCardFlip(!isFlipped);
        }}
      >
        <div
          className="FlashcardWrapper__item--front"
          style={{
            ...frontCardStyle,
            cursor: manualFlipRef.current ? "default" : "pointer",
          }}
        >
          <ContentRenderer
            content={frontHTML}
            className={frontContentClassName}
            style={frontContentStyle}
          />
        </div>
        <div
          className="FlashcardWrapper__item--back"
          style={{
            ...backCardStyle,
            cursor: manualFlipRef.current ? "default" : "pointer",
          }}
        >
          <ContentRenderer
            content={backHTML}
            className={backContentClassName}
            style={backContentStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
