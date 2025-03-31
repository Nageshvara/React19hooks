import { useState } from 'react';
import './App.css';
import UseFormStatusComponent from './components/FormStatusExample';
import BasicActionStateComponent from './components/ActionStateExample';
import OptimisticExample from './components/OptimisticExample';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('FormStatus');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'FormStatus':
        return <UseFormStatusComponent />;
      case 'ActionState':
        return <BasicActionStateComponent />;
      case 'Optimistic':
        return <OptimisticExample />;
    }
  };

  return (
    <div className="app-container">
      <h1 className="text-2xl font-bold">Choose a Component</h1>
      <select
        value={selectedComponent}
        onChange={(e) => setSelectedComponent(e.target.value)}
        className="p-2 border rounded-lg mb-4"
      >
        <option value="FormStatus">Form Status Example</option>
        <option value="ActionState">Action State Example</option>
        <option value="Optimistic">Optimistic Example</option>
      </select>
      
      {renderComponent()}
    </div>
  );
}

export default App;
