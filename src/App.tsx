import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isTouchDevice } from './utils/deviceDetection';
import { Canvas } from './components/Canvas';
import './logux';

function App() {
  // Choose backend based on device capabilities
  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;
  const backendOptions = isTouchDevice() ? {
    enableMouseEvents: true,
    delayTouchStart: 0,
    ignoreContextMenu: true,
    enableHoverOutsideTarget: true,
    touchSlop: 5,
  } : {};

  return (
    <DndProvider backend={backend} options={backendOptions}>
      <Canvas />
    </DndProvider>
  );
}

export default App
