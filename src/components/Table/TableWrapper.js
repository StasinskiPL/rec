import { Container } from "react-bootstrap";
import Table from "./Table";
import TableHeader from "./TableHeader";

const TableWrapper = () => {
  return (
    <Container fluid className="mt-5 border border-light ">
      <TableHeader />
      <Table />
    </Container>
  );
};

export default TableWrapper;
