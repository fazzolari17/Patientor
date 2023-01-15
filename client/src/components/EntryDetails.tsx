import { Card } from "@material-ui/core";
import { Favorite, Work, MedicalServices } from "@mui/icons-material";
import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member : ${JSON.stringify(value)}`
    );
  };

  const colorPicker = (rating: number): string => {
    switch (rating) {
      case 0:
        return "green";
        break;
      case 1:
        return "yellow";
        break;
      case 2:
        return "orange";
        break;
      case 3:
        return "red";
        break;
      default:
        return "blue";
    }
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Card variant="outlined">
          <p>
            {entry.date} <MedicalServices />
          </p>
          <p>{entry.description}</p>
          <p>diagnosed by: {entry.specialist}</p>
        </Card>
      );
      break;
    case "OccupationalHealthcare":
      return (
        <Card variant="outlined">
          <p>
            {entry.date} <Work /> {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>diagnosed by: {entry.specialist}</p>
        </Card>
      );
      break;
    case "HealthCheck":
      return (
        <Card variant="outlined">
          <p>
            {entry.date} <MedicalServices />{" "}
          </p>
          <p>{entry.description}</p>
          <Favorite
            style={{ color: `${colorPicker(entry.healthCheckRating)}` }}
          />
          <p>diagnosed by: {entry.specialist}</p>
        </Card>
      );
      break;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
