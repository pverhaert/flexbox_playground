import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { FlexContainer } from './components/FlexContainer';
import { InfoPanel } from './components/InfoPanel';
import { FloatingControls } from './components/FloatingControls';
import { FlexToggle } from './components/FlexToggle';
import { FlexProvider } from './context/FlexContext';

function App() {
  const [zIndices, setZIndices] = useState({ sidebar: 40, info: 50, preview: 30 });

  const bringToFront = (panel: 'sidebar' | 'info' | 'preview') => {
    setZIndices({
      sidebar: panel === 'sidebar' ? 50 : 40,
      info: panel === 'info' ? 50 : 40,
      preview: panel === 'preview' ? 50 : 30
    });
  };

  return (
    <FlexProvider>
      <div className="flex h-screen w-full bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100 overflow-hidden relative transition-colors duration-300">
        <FlexToggle />
        <Sidebar zIndex={zIndices.sidebar} onFocus={() => bringToFront('sidebar')} />
        <FlexContainer zIndex={zIndices.preview} onFocus={() => bringToFront('preview')} />
        <InfoPanel zIndex={zIndices.info} onFocus={() => bringToFront('info')} />
        <FloatingControls />
      </div>
    </FlexProvider>
  );
}

export default App;
