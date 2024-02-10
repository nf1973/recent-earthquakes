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

export default function MostRecentMap({ data }) {
  const fillRedOptions = { fillColor: "red" };
  return (
    <>
      <h2 className="text-sm">Most Recent Earthquake (M2.5+)</h2>
      <MapContainer
        className="h-full"
        center={[
          data[0].geometry.coordinates[1],
          data[0].geometry.coordinates[0],
        ]}
        zoom={3}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayerGroup>
          {data.slice(0, 1).map((row, index) => (
            <CircleMarker
              key={index}
              center={[
                row.geometry.coordinates[1],
                row.geometry.coordinates[0],
              ]}
              pathOptions={fillRedOptions}
              radius={10}
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
