import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import '../../assets/styles/pages/_dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <main className="dashboard-content">
          <h1>Conteúdo do Dashboard</h1>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;