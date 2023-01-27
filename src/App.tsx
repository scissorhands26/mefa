import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [mission, setMission] = useState("");
  const [operatorCount, setOperatorCount] = useState(1);
  const [operatorName, setOperatorName] = useState("");
  const [operatorRank, setOperatorRank] = useState("");
  const [operatorCert, setOperatorCert] = useState("");
  const [operators, setOperators] = useState<any | null>([]);

  const [eaCount, setEACount] = useState(1);
  const [eaName, setEAName] = useState("");
  const [eaRank, setEARank] = useState("");
  const [eaCert, setEACert] = useState("");
  const [eas, setEAs] = useState<any | null>([]);

  const [events, setEvents] = useState<any | null>([]);
  const [eventDetils, setEventDetails] = useState("");

  function handleChange(e: any) {
    console.log(e.target.value);
    if (e.target.id === "MissionName") setMission(e.target.value.toUpperCase());
    if (e.target.id === "OperatorName")
      setOperatorName(e.target.value.toUpperCase());
    if (e.target.id === "OperatorRank")
      setOperatorRank(e.target.value.toUpperCase());
    if (e.target.id === "OperatorCert")
      setOperatorCert(e.target.value.toUpperCase());
    if (e.target.id === "EAName") setEAName(e.target.value.toUpperCase());
    if (e.target.id === "EARank") setEARank(e.target.value.toUpperCase());
    if (e.target.id === "EACert") setEACert(e.target.value.toUpperCase());
    if (e.target.id === "event") setEventDetails(e.target.value.toUpperCase());
  }

  function addOperator(e: any) {
    e.preventDefault();
    setOperatorCount(operatorCount + 1);
    let id = Math.floor(Math.random() * 999999999) + 1;
    let rank = operatorRank;
    let name = operatorName;
    let cert = operatorCert;

    let operator = {
      id,
      rank,
      name,
      cert,
    };

    setOperators((prevOperators: any) => [...prevOperators, operator]);
    e.target.reset();
  }

  function addEA(e: any) {
    e.preventDefault();
    setEACount(eaCount + 1);
    let id = Math.floor(Math.random() * 999999999) + 1;
    let rank = eaRank;
    let name = eaName;
    let cert = eaCert;

    let ea = {
      id,
      rank,
      name,
      cert,
    };

    setEAs((prevEAs: any) => [...prevEAs, ea]);
    e.target.reset();
  }

  function addEvent(e: any) {
    e.preventDefault();

    let details = eventDetils;
    let date = new Date();
    let time = date.toUTCString();

    let event = {
      details,
      time,
    };

    setEvents((prevEvents: any) => [...prevEvents, event]);
  }

  useEffect(() => {
    console.log(operatorCount);
  }, [operatorCount, operators, eas]);

  function removeOperator(id: any) {
    let updatedOperators = operators.filter((operator: any) => {
      return operator.id !== id;
    });
    setOperators(updatedOperators);
  }

  function removeEA(id: any) {
    let updatedEAs = eas.filter((ea: any) => {
      return ea.id !== id;
    });
    setEAs(updatedEAs);
  }

  return (
    <div className="w-screen">
      <div className="grid grid-cols-2">
        <section className="border-4 border-black h-screen text-left p-2">
          <div>
            <div className="flex flex-row m-1">
              <label className="text-3xl font-bold mr-2">Mission:</label>
              <input
                className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                type="text"
                placeholder="Enter your text here..."
                id="MissionName"
                value={mission}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mx-1 my-5">Personnel</h2>
            <div className="flex flex-row m-1">
              <label className="text-3xl font-bold mr-2">Operators:</label>
              <form onSubmit={addOperator}>
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="Operator Rank"
                  id="OperatorRank"
                  onChange={handleChange}
                ></input>
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="Operator Name"
                  id="OperatorName"
                  onChange={handleChange}
                ></input>
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="Operator Cert"
                  id="OperatorCert"
                  onChange={handleChange}
                ></input>
                <input
                  type="submit"
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                ></input>
              </form>
            </div>
            {operators.map((operator: any) => (
              <div key={operator.id} className="flex flex-row text-center">
                <span>🟩</span>
                <h4 className="text-xl font-bold mx-1">{operator.rank}</h4>
                <h4 className="text-xl font-bold mx-1">{operator.name}</h4>
                <h4 className="text-xl font-bold mx-1">{operator.cert}</h4>
                <button onClick={() => removeOperator(operator.id)}>🛑</button>
              </div>
            ))}
            <div className="flex flex-row m-1">
              <label className="text-3xl font-bold mr-2">EAs:</label>
              <form onSubmit={addEA}>
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="EA Rank"
                  id="EARank"
                  onChange={handleChange}
                ></input>
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="EA Name"
                  id="EAName"
                  onChange={handleChange}
                ></input>
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="EA Cert"
                  id="EACert"
                  onChange={handleChange}
                ></input>
                <input
                  type="submit"
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                ></input>
              </form>
            </div>
            {eas.map((ea: any) => (
              <div key={ea.id} className="flex flex-row text-center">
                <span>🟩</span>
                <h4 className="text-xl font-bold mx-1">{ea.rank}</h4>
                <h4 className="text-xl font-bold mx-1">{ea.name}</h4>
                <h4 className="text-xl font-bold mx-1">{ea.cert}</h4>
                <button onClick={() => removeEA(ea.id)}>🛑</button>
              </div>
            ))}

            <div className="flex flex-row m-1">
              <label className="text-3xl font-bold mr-2">Event:</label>
              <form onSubmit={addEvent}>
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="event"
                  id="event"
                  onChange={handleChange}
                ></input>
                <input
                  type="submit"
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                ></input>
              </form>
            </div>
          </div>
        </section>

        <section className="border-4 border-black h-screen p-2">
          <h1 className="text-7xl font-bold">MISSION: {mission}</h1>
          <h1 className="text-5xl font-bold">Operators:</h1>
          {operators.map((operator: any) => (
            <div key={operator.id} className="flex flex-row text-center">
              <h5 className="text-xl font-bold mx-1">{operator.rank}</h5>
              <h5 className="text-xl font-bold mx-1">{operator.name}</h5>
              <h5 className="text-xl font-bold mx-1">{operator.cert}</h5>
            </div>
          ))}
          <h1 className="text-5xl mt-10 font-bold">Events:</h1>
          {events.map((e: any) => (
            <div key={e.time} className="flex flex-row text-center">
              <h5 className="text-xl font-bold mx-1">{e.time}</h5>
              <h5 className="text-xl font-bold mx-1">{e.details}</h5>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
