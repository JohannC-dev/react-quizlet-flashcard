import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
const stories = storiesOf("Flashcard", module);
import "./storyStyle.scss";
import "katex/dist/katex.min.css";
import "@excalidraw/excalidraw/dist/excalidraw.min.css";

import Flashcard from "../components/Flashcard/Flashcard";

stories.add("Basic Flashcard", () => {
  return (
    <div className="storyContainer">
      <Flashcard frontHTML="<h1>Front</h1>" backHTML={<h1>Back</h1>} />
    </div>
  );
});

stories.add("Manual flip", () => {
  type FlipRefType = { current: (() => void) | null };
  const flipRef: FlipRefType = { current: null };

  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Front</h1>"
        backHTML={<h1>Back</h1>}
        // @ts-ignore - Le composant accepte cette structure même si TypeScript n'est pas content
        manualFlipRef={flipRef}
      />
      <button onClick={() => flipRef.current && flipRef.current()}>Flip</button>
    </div>
  );
});

stories.add("Custom styles", () => {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML={
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              4
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              5
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              6
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              7
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              8
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              9
            </span>
          </>
        }
        backHTML={<h1>Back</h1>}
        backContentStyle={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        frontContentStyle={{
          backgroundColor: "turquoise",
          color: "white",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          fontSize: "2rem",
        }}
      />
    </div>
  );
});

stories.add("Card flip callback", () => {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Check console</h1>"
        backHTML={<h1>Back</h1>}
        onCardFlip={(state) => {
          if (state) console.log("Card is flipped");
          else console.log("Card is not flipped");
        }}
      />
    </div>
  );
});

stories.add("Custom Card size", () => {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Front</h1>"
        backHTML={<h1>Back</h1>}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
});

stories.add("LaTeX Support", () => {
  return (
    <div className="storyContainer">
      <h3>LaTeX Support Example</h3>
      <Flashcard
        frontHTML="Quelle est la formule d'Einstein? $E = mc^2$"
        backHTML="$$E = mc^2$$"
        frontContentStyle={{
          padding: "20px",
          fontSize: "1.2rem",
        }}
        backContentStyle={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        enableLatex={true}
        style={{ width: "400px", height: "250px" }}
      />
      
      <h3 style={{ marginTop: "40px" }}>Équation mathématique complexe</h3>
      <Flashcard
        frontHTML="La formule pour résoudre une équation quadratique:"
        backHTML="$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$"
        frontContentStyle={{
          padding: "20px",
          fontSize: "1.2rem",
        }}
        backContentStyle={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        enableLatex={true}
        style={{ width: "400px", height: "250px" }}
      />
    </div>
  );
});

stories.add("Excalidraw Support", () => {
  // Exemple de données Excalidraw simple
  const simpleDiagram = JSON.stringify({
    elements: [
      {
        type: "rectangle",
        x: 100,
        y: 100,
        width: 200,
        height: 100,
        strokeColor: "#000000",
        backgroundColor: "#4285f4",
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 1,
      },
      {
        type: "ellipse",
        x: 300,
        y: 150,
        width: 150,
        height: 100,
        strokeColor: "#000000",
        backgroundColor: "#0f9d58",
        fillStyle: "solid",
        strokeWidth: 1,
        roughness: 1,
      },
      {
        type: "arrow",
        x: 200,
        y: 150,
        width: 100,
        height: 0,
        strokeColor: "#000000",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        roughness: 1,
      }
    ],
    appState: {
      viewBackgroundColor: "#ffffff"
    }
  });

  return (
    <div className="storyContainer">
      <h3>Excalidraw Integration Example</h3>
      <Flashcard
        frontHTML="Qu'est-ce que montre ce diagramme?"
        backHTML={simpleDiagram}
        frontContentStyle={{
          padding: "20px",
          fontSize: "1.2rem",
        }}
        enableExcalidraw={true}
        style={{ width: "600px", height: "400px" }}
      />
    </div>
  );
});
