import React, { useState, useCallback } from "react";
import FlashcardProps from "../../interfaces/IFlashcard";
import "./Flashcard.scss";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Excalidraw } from "@excalidraw/excalidraw";

/**
 * Safe content renderer component
 */
const ContentRenderer = ({
  content,
  className = "",
  style = {},
  enableLatex = false,
  enableExcalidraw = false,
  renderOptions = {},
}: {
  content: string | JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  enableLatex?: boolean;
  enableExcalidraw?: boolean;
  renderOptions?: { [key: string]: any };
}) => {
  // If content is already a JSX element, just render it
  if (typeof content !== "string") {
    return (
      <div className={`FlashcardWrapper__item--content ${className}`} style={style}>
        {content}
      </div>
    );
  }

  // For string content, render with appropriate options
  const renderContent = () => {
    if (enableLatex) {
      // Detect if content is inline or block math based on delimiters
      const isBlockMath = 
        (content.startsWith('$$') && content.endsWith('$$')) ||
        (renderOptions.displayMode === true);
      
      // Extract the LaTeX content without delimiters
      let latexContent = content;
      if (content.startsWith('$$') && content.endsWith('$$')) {
        latexContent = content.substring(2, content.length - 2);
      } else if (content.startsWith('$') && content.endsWith('$')) {
        latexContent = content.substring(1, content.length - 1);
      }
      
      try {
        if (isBlockMath) {
          return <BlockMath math={latexContent} />;
        } else {
          return <InlineMath math={latexContent} />;
        }
      } catch (error) {
        console.error("Error rendering LaTeX:", error);
        return <div className="latex-error">Error rendering LaTeX: {content}</div>;
      }
    } else if (enableExcalidraw) {
      // Try to parse content as Excalidraw data
      try {
        let excalidrawData = content;
        if (typeof content === 'string' && content.trim().startsWith('{')) {
          excalidrawData = JSON.parse(content);
        }
        
        return (
          <div style={{ height: 300, width: '100%' }}>
            <Excalidraw
              initialData={excalidrawData}
              viewModeEnabled={true}
              {...renderOptions.excalidrawProps}
            />
          </div>
        );
      } catch (error) {
        console.error("Error rendering Excalidraw:", error);
        return <div className="excalidraw-error">Error rendering drawing: {content}</div>;
      }
    } else {
      // Regular text content
      return <div>{content}</div>;
    }
  };

  return (
    <div className={`FlashcardWrapper__item--content ${className}`} style={style}>
      {renderContent()}
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
  enableLatex = false,
  enableExcalidraw = false,
  renderOptions = {},
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
      style={{
        height: height,
        width: width,
        ...style,
      }}
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
            enableLatex={enableLatex}
            enableExcalidraw={enableExcalidraw}
            renderOptions={renderOptions}
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
            enableLatex={enableLatex}
            enableExcalidraw={enableExcalidraw}
            renderOptions={renderOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
