import { useState } from "react";
import "./styles.css";

export default function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [ldata, setLdata] = useState([]);

  const passwordHandler = () => {
    setPassShow(!passShow);
  };

  const validationHandler = (e) => {
    e.preventDefault();

    let errorObject = {};
    setIsError(false);

    if (!name.trim()) {
      errorObject.name = "Name is required";
    }

    if (!password.trim()) {
      errorObject.password = "Password is required";
    }

    if (Object.keys(errorObject).length > 0) {
      setError(errorObject);
      setIsError(true);
    } else {
      const newUser = {
        name: name.trim(),
        pass: password.trim(),
      };

      // Get existing users from localStorage
      let existingUsers = JSON.parse(localStorage.getItem("user"));

      if (!Array.isArray(existingUsers)) {
        existingUsers = [];
      }

      existingUsers.push(newUser);
      localStorage.setItem("user", JSON.stringify(existingUsers));

      alert("Form submitted!");
      setError({});
      setName("");
      setPassword("");
    }
  };

  const dataHandler = () => {
    const users = JSON.parse(localStorage.getItem("user")) || [];
    if (Array.isArray(users)) {
      setLdata(users);
    }
  };

  return (
    <div className="App">
      <label htmlFor="Name">Name: </label>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br />
      {isError && error.name && (
        <span style={{ color: "red" }}>{error.name}</span>
      )}
      <br />
      <label htmlFor="Password">Password:</label>
      <input
        type={passShow ? "text" : "password"}
        placeholder="password"
        minLength={8}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="button" onClick={passwordHandler}>
        {passShow ? "Hide" : "Show"}
      </button>
      <br />
      {isError && error.password && (
        <span style={{ color: "red" }}>{error.password}</span>
      )}
      <br />
      <button onClick={validationHandler}>Submit</button>

      <h2>Getting data from localStorage</h2>
      <button onClick={dataHandler}>Show Data</button>

      <div>
        {ldata.map((user, index) => (
          <div
            key={index}
            style={{
              margin: "10px 0",
              padding: "6px",
              border: "1px solid gray",
            }}
          >
            <span>
              <strong>Name:</strong> {user.name}
            </span>{" "}
            <br />
            <span>
              <strong>Password:</strong> {user.pass}
            </span>
          </div>
        ))}
        <span>Total Users: {ldata.length}</span>
      </div>
    </div>
  );
}
