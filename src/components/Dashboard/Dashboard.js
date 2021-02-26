import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import DashboardTable from "../Table/TableWrapper";

const Dashboard = () => {
  return (
    <Container className="mt-5 p-0">
      <Header />
      <DashboardTable />
    </Container>
  );
};

export default Dashboard;
