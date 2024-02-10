import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaExternalLinkAlt } from "react-icons/fa";

const DataTable = ({ data }) => {
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
    return `${formattedDate} ${hours}:${minutes}`;
  }

  //console.log(data);

  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableCell className="font-bold text-base">Time</TableCell>
          <TableCell className="font-bold text-center text-base">
            <span className="hidden md:inline">Magnitude</span>
            <span className="inline md:hidden">Mag</span>
          </TableCell>
          <TableCell className="font-bold text-base">Location</TableCell>
          <TableCell className="font-bold text-right text-base w-2">
            Details
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{formatDate(row.properties.time)}</TableCell>
            <TableCell className="text-center">
              {row.properties.mag.toFixed(1)}
            </TableCell>
            <TableCell>{row.properties.place}</TableCell>

            <TableCell className="text-right hover:text-slate-400 ">
              <a href={row.properties.url} target="_blank">
                <FaExternalLinkAlt className="ml-6" />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
