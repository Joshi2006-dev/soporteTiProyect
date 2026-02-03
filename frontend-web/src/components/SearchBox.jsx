import { Input, InputGroup, InputGroupText } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchBox({ value, onChange }) {
  return (
    <div className="flex-grow-1 me-3">
      <InputGroup>
        <Input
          type="text"
          placeholder="Buscar servicio..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <InputGroupText>
          <i className="bi bi-search"></i>
        </InputGroupText>
      </InputGroup>
    </div>
  );
}
export default SearchBox;
