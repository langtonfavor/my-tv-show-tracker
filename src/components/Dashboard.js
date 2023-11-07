// src/components/Dashboard.js
import { connect } from 'react-redux';

const Dashboard = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <div>
      Hello!
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
