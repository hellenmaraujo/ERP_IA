import DashboardOperacional from './dashboard_operacional';
import DashboardMotorista from './dashboard_motorista';
import '../../assets/styles/pages/_dashboard.css';
import PageLayout from '../../components/layout/PageLayout';

function Dashboard() {
  const perfil = localStorage.getItem('perfil');

  const renderDashboard = () => {
    if (perfil === 'motorista') {
      return <DashboardMotorista />;
    } else {
      return <DashboardOperacional />;
    }
  };

  return (
    <PageLayout pageTitle="Dashboard">
      {renderDashboard()}
    </PageLayout>
  );
}

export default Dashboard;