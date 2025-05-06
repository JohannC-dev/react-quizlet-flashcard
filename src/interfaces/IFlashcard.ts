export default interface FlashcardProps {
  /**
   * Content to be displayed on the front of the card (string or JSX element)
   */
  frontHTML: string | JSX.Element;
  /**
   * CSS styles to be applied to the front side of the card
   */
  frontCardStyle?: React.CSSProperties;
  /**
   *  CSS styles to be applied to the content of the front side of the card
   */
  frontContentStyle?: React.CSSProperties;
  /**
   * Additional CSS classes for the front content
   */
  frontContentClassName?: string;
  /**
   * Content to be displayed on the back of the card (string or JSX element)
   */
  backHTML: string | JSX.Element;
  /**
   * CSS styles to be applied to the back side of the card
   */
  backCardStyle?: React.CSSProperties;
  /**
   * CSS styles to be applied to the content of the back side of the card
   */
  backContentStyle?: React.CSSProperties;
  /**
   * Additional CSS classes for the back content
   */
  backContentClassName?: string;
  /**
   * CSS class to be applied to the wrapper div
   */
  className?: string;
  /**
   * CSS height of the wrapper div
   */
  height?: string;
  /**
   * CSS border-radius of the wrapper div
   */
  borderRadius?: string;
  /**
   * CSS width of the wrapper div
   */
  width?: string;
  /**
   * CSS styles to be applied to the wrapper div
   */
  style?: React.CSSProperties;
  /**
   *  Callback function to be called when the card is flipped
   */
  onCardFlip?: (state: boolean) => void;
  /**
   * when passed with a ref, ref.current object will contain reference to `flipCard()` function
   */
  manualFlipRef?: React.MutableRefObject<() => void>;
}
