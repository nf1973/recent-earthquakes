"use client";

import {
  MapContainer,
  TileLayer,
  Popup,
  LayerGroup,
  CircleMarker,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

export default function WorldMap({ data }) {
  const fillRedOptions = { fillColor: "red" };
  return (
    <>
      <h2 className="text-sm">Earthquakes in past 24 hours (M2.5+)</h2>
      <MapContainer
        className="h-full"
        center={[35, 0]}
        zoom={1}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayerGroup>
          {data.map((row, index) => (
            <CircleMarker
              key={index}
              center={[
                row.geometry.coordinates[1],
                row.geometry.coordinates[0],
              ]}
              pathOptions={fillRedOptions}
              radius={row.properties.mag * 1.8}
              fillColor="red"
              color="#fff"
              weight={1}
              opacity={1}
              fillOpacity={0.8}
            >
              <Popup>
                <div>
                  <b>Time:</b> {new Date(row.properties.time).toLocaleString()}
                </div>
                <div>
                  <b>Magnitude:</b> {row.properties.mag.toFixed(1)}
                </div>
                <div>
                  <b>Location:</b> {row.properties.place}
                </div>

                <div className="mt-1">
                  <a href={row.properties.url} target="_blank">
                    <p className="text-slate-800 hover:text-slate-600">
                      More info
                    </p>
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </LayerGroup>
      </MapContainer>
    </>
  );
}
