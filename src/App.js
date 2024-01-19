import './App.css';
import Table from './components/Table';
import 'reactjs-popup/dist/index.css';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <div className="App">
      <CreateUser />
      <Table />
    </div>
  );
}

export default App;
