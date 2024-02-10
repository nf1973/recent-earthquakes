"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import Loading from "@/components/Loading";
import Accreditation from "@/components/Accreditation";

import dynamic from "next/dynamic";
const DynamicWorldMap = dynamic(() => import("@/components/WorldMap"), {
  loading: () => <p>Loading...</p>,
});

const DynamicMostRecentMap = dynamic(
  () => import("@/components/MostRecentMap"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  const now = new Date();
  const yesterday = new Date(now - 24 * 60 * 60 * 1000); // 24 hours ago

  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState(yesterday.toISOString());
  const [endTime, setEndTime] = useState(now.toISOString());
  const [minMagnitude, setMinMagnitude] = useState(2.5);

  useEffect(() => {
    async function fetchData() {
      const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=${minMagnitude}`;

      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData.features);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    }

    fetchData();
  }, [startTime, endTime, minMagnitude]);

  // Handlers for updating state values - not yet implemented
  const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime.toISOString());
  };

  const handleEndTimeChange = (newEndTime) => {
    setEndTime(newEndTime.toISOString());
  };

  const handleMinMagnitudeChange = (newMinMagnitude) => {
    setMinMagnitude(newMinMagnitude);
  };

  return data.length > 0 ? (
    <main className="w-7xl max-w-7xl mx-auto flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col lg:flex-row w-full lg:gap-4 mx-auto place-items-center">
        <div className="w-5/6 lg:w-2/3 h-96 ml-2 mr-2 lg:mr-0">
          <DynamicWorldMap data={data} />
        </div>
        <div className="w-5/6 lg:w-1/3 h-96 mr-2 ml-2 lg:ml-0 mt-12 lg:mt-0 lg:mb-0">
          <DynamicMostRecentMap data={data} />
        </div>
      </div>
      <Accreditation />
      <div className="w-full pb-16 px-4 lg:px-0">
        <DataTable data={data} />
      </div>
    </main>
  ) : (
    <Loading />
  );
}
