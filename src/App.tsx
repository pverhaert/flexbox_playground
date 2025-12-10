
import { Sidebar } from './components/Sidebar';
import { FlexContainer } from './components/FlexContainer';
import { InfoPanel } from './components/InfoPanel';
import { FloatingControls } from './components/FloatingControls';
import { FlexProvider } from './context/FlexContext';

function App() {
  return (
    <FlexProvider>
      <div className="flex h-screen w-full bg-neutral-50 font-sans text-neutral-900 overflow-hidden relative">
        <Sidebar />
        <FlexContainer />
        <InfoPanel />
        <FloatingControls />
      </div>
    </FlexProvider>
  );
}

export default App;
