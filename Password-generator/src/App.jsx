import { useCallback, useRef, useState } from "react";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [includeNum, setincludeNum] = useState(false);
  const [includeChar, setincludeChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePass = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "!@#$%^&*()<>?";

    if (includeNum) str += num;
    if (includeChar) str += char;

    for (let i = 1; i <= length; i++) {
      const randomNum = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomNum);
    }

    setPassword(pass);
  }, [length, includeNum, includeChar]);

  const copyPassToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePass();
  }, [length, includeNum, includeChar, generatePass]);

  // useRef hook

  return (
    <>
      <h1>Password generator</h1>
      <div className="main-container">
      <div className="flex-1">
      <input
        type="text"
        value={password}
        readOnly
        placeholder="Password"
        ref={passwordRef}
      />
      <button className="copy" onClick={copyPassToClip}>
        Copy
      </button>
      </div>

      <div className="flex-2">
        <input
          type="range"
          name="range"
          id="length"
          min={6}
          max={20}
          onChange={(e) => setLength(e.target.value)}
          value={length}
        />
        <label htmlFor="length">Length : {length}</label>

        <input
          type="checkbox"
          defaultChecked={includeNum}
          onChange={() => {
            setincludeNum((prev) => !prev);
          }}
        />
        <label htmlFor="numbers">Number</label>
        <input
          type="checkbox"
          defaultChecked={includeChar}
          onChange={() => {
            setincludeChar((prev) => !prev);
          }}
        />
        <label htmlFor="characters">Characters</label>
      </div>
      </div>
    </>
  );
}

export default App;
