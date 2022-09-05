import { page } from 'web-init'
import { useEffect, useState } from 'react'
import { Response } from 'types/openweather'
export default page({
  url: '/weather',
  component: ({}) => {
    const [city, setCity] = useState<string>("");
    const [responses, setResponses] = useState<Response[]>(JSON.parse(localStorage.getItem('responses') || '[]'));

    const handleAddCity =  async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
      if (response.ok){
        const data = await response.json();
        setResponses([...responses, data]);
        setCity("");
      }
    }

    const handleRemoveCity = (c: string) => {
      setResponses(prev => prev.filter(r => r.name !== c));
    }

    const handleRefresh = async () => {
      const newResponse = await Promise.all(responses.map(async r => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${r.name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
        if (response.ok){
          return await response.json();
        }
        return r;
      }));
      setResponses(newResponse);
    }

    useEffect(() => {
      localStorage.setItem("responses", JSON.stringify(responses));
    }, [responses]);

    return (
      <>
        <div className="min-h-screen w-full bg-primary flex flex-col items-center">
          <div className="w-1/3 space-y-3">
            <div className="text-white text-center text-3xl">Weathers App</div>
            <input placeholder="City" className="w-full rounded" type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            <div className="flex space-x-2">
              <button className="w-full rounded bg-blue-500 py-2 px-4 text-white" onClick={handleAddCity}>Add</button>
              <button className="w-full rounded bg-blue-500 py-2 px-4 text-white" onClick={handleRefresh}>Refresh Data</button>
            </div>
          </div>
          <div className="max-w-7xl grid grid-cols-4 gap-4 mt-12">
            {responses.map(response => (
              <div className="bg-secondary rounded p-4 flex flex-col" key={response.id}>
                <button onClick={()=>handleRemoveCity(response.name)} className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <div className="text-center text-2xl font-semibold">{response.name}</div>
                <div className="text-justify py-2">
                  <div>Temperature: {response.main.temp}</div>
                  <div>Humidity: {response.main.humidity}</div>
                  <div>Pressure: {response.main.pressure}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  },
})