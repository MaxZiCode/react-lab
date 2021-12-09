import userInputValues from "@/constants/userInputValues";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function useStateWithValidation(
  initialValue: string,
  validateFn: (value: string) => boolean,
  validationMessage: string
): { value: string; setValue: (value: string) => void; validationProblem: string } {
  const [value, setValue] = useState(initialValue);
  const [validationProblem, setValidationProblem] = useState("");
  const isFirstChange = useRef(true);

  const onChangeCallback = useDebouncedCallback(() => {
    const isCorrect = validateFn(value);
    setValidationProblem(isCorrect ? "" : validationMessage);
  }, userInputValues.delayMs);

  useEffect(() => {
    if (isFirstChange.current) {
      isFirstChange.current = false;
      return;
    }
    onChangeCallback();
  }, [value]);

  return { value, setValue, validationProblem };
}
