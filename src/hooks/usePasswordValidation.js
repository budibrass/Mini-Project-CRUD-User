import { useState, useEffect } from "react";

export const usePasswordValidation = ({ firstPassword = "", secondPassword = "" }) => {
const [validLength, setValidLength] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);
const [specialChar, setSpecialChar] = useState(null);
const [match, setMatch] = useState(null);

  useEffect(() => {
    setValidLength(firstPassword.length === 6 ? true : false);
    setUpperCase(firstPassword.toLowerCase() !== firstPassword);
    setLowerCase(firstPassword.toUpperCase() !== firstPassword);
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword));
    setMatch(firstPassword && firstPassword === secondPassword);
  }, [firstPassword, secondPassword]);
  return [validLength, upperCase, lowerCase, match, specialChar];
}
