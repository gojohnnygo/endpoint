import { ChangeEvent, FormEvent, useState } from "react";
import TodoList from "./components/TodoList";
import { useApiKey } from "./hooks/useApiKey";

import "./App.css";

function App() {
  const { apiKey, setApiKey } = useApiKey();
  const [apiKeyValue, setApiKeyValue] = useState<string>("");

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    setApiKey(apiKeyValue);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKeyValue(e.target.value);
  };

  return (
    <div className="App">
      {!apiKey && (
        <div>
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              value={apiKey}
              onChange={handleOnChange}
              placeholder="Enter api key"
            />
            <button type="submit">Submit</button>
          </form>
          <p>Input API to work around Github blocking commits with API keys.</p>
        </div>
      )}
      {apiKey && <TodoList />}
    </div>
  );
}

export default App;
