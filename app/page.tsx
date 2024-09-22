// pages/index.tsx
import React from 'react';
import QrScannerComponent from '../components/QrScanner';

const Home: React.FC = () => {
  return (
    <div>
      <h1>QR Code Reader</h1>
      <QrScannerComponent />
    </div>
  );
};

export default Home;


