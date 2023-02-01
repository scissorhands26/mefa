import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [mission, setMission] = useState("");

  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [cert, setCert] = useState("");
  const [personnel, setPersonnel] = useState<any | null>([]);

  const [events, setEvents] = useState<any | null>([]);
  const [eventDetils, setEventDetails] = useState("");

  const [data, setData] = useState<any | null>({});

  function handleChange(e: any) {
    console.log(e.target.value);
    if (e.target.id === "MissionName") setMission(e.target.value.toUpperCase());
    if (e.target.id === "Name") setName(e.target.value.toUpperCase());
    if (e.target.id === "Rank") setRank(e.target.value.toUpperCase());
    if (e.target.id === "event") setEventDetails(e.target.value.toUpperCase());
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

  function addPersonnel(e: any, type: any) {
    e.preventDefault();
    let id = Math.floor(Math.random() * 999999999) + 1;

    let person = {
      id,
      rank,
      name,
      cert,
      type,
    };

    setPersonnel((prevPersonnel: any) => [...prevPersonnel, person]);
    console.log(personnel);
    e.target.reset();
  }

  function removePersonnel(id: any) {
    let updatedPersonnel = personnel.filter((person: any) => {
      return person.id !== id;
    });
    setPersonnel(updatedPersonnel);
  }

  useEffect(() => {
    const personnelString = localStorage.getItem("personnel");
    if (!personnelString) {
      localStorage.setItem("personnel", JSON.stringify([]));
    } else {
      const personnel = JSON.parse(personnelString);
      setPersonnel(personnel);
    }
  }, []);

  useEffect(() => {
    console.log(personnel.length);
    if (personnel.length > 0)
      localStorage.setItem("personnel", JSON.stringify(personnel));
  }, [personnel]);

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
            <div className="flex flex-row m-1">
              <label className="text-3xl font-bold mr-2">Personnel:</label>
              <form
                onSubmit={(e) => {
                  addPersonnel(e, "operator");
                }}
              >
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="Rank"
                  id="Rank"
                  onChange={handleChange}
                ></input>
                <input
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  type="text"
                  placeholder="Last Name"
                  id="Name"
                  onChange={handleChange}
                ></input>
                <select
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                  value={cert}
                  onChange={(e) => setCert(e.target.value)}
                >
                  <option value="MC">MC</option>
                  <option value="EA">EA</option>
                  <option value="ION">ION</option>
                  <option value="LCO">LCO</option>
                  <option value="MC Trainee">MC Trainee</option>
                  <option value="EA Trainee">EA Trainee</option>
                  <option value="ION Trainee">ION Trainee</option>
                  <option value="LCO Trainee">LCO Trainee</option>
                </select>
                <input
                  type="submit"
                  className="bg-gray-200 mx-1 py-2 px-4 rounded-lg shadow-md border border-gray-400 focus:outline-none focus:shadow-outline-blue"
                ></input>
              </form>
            </div>
            {personnel.map((personnel: any) => (
              <div key={personnel.id} className="flex flex-row text-center">
                {personnel.type === "operator" ? (
                  <>
                    <span>🟩</span>
                    <h4 className="text-xl font-bold mx-1">{personnel.rank}</h4>
                    <h4 className="text-xl font-bold mx-1">{personnel.name}</h4>
                    <h4 className="text-xl font-bold mx-1">{personnel.cert}</h4>
                    <h4 className="text-xl font-bold mx-1">{personnel.id}</h4>
                    <button onClick={() => removePersonnel(personnel.id)}>
                      🛑
                    </button>
                  </>
                ) : (
                  <></>
                )}
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
          <h1 className="text-5xl font-bold">Personnel:</h1>
          {personnel.map((person: any) => (
            <div key={person.id} className="flex flex-row text-center">
              <h5 className="text-xl font-bold mx-1">{person.rank}</h5>
              <h5 className="text-xl font-bold mx-1">{person.name}</h5>
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
