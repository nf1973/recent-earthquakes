const LargestEarthquake = ({ data }) => {
  function formatDate(timestamp) {
    // Check if timestamp is valid
    if (isNaN(timestamp)) {
      return "Invalid Timestamp";
    }

    const date = new Date(timestamp);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    const options = { day: "2-digit", month: "short" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} (${formattedDate})`;
  }

  return (
    <div className="w-full mx-auto place-items-center pb-8 px-2">
      <p className="mb-2 lg:mb-0">
        There have been {data.length} M2.5+ earthquakes in the past 24 hours
      </p>
      <p>
        Largest Earthquake in the Past 24 Hours: {data[0].properties.place} at{" "}
        {formatDate(data[0].properties.time)} (M
        {data[0].properties.mag.toFixed(1)})
      </p>
    </div>
  );
};

export default LargestEarthquake;
