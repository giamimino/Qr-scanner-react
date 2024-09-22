// components/QrScanner.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useRouter } from 'next/navigation'; // Adjust import if using pages directory
import styles from './Qrscanner.module.css';

const QrScannerComponent: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (videoRef.current) {
      // Start scanning from the video stream
      codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result) {
          setData(result.getText());
          router.push(result.getText()); // Navigate to the scanned data
        }
        if (err) {
          console.error(err);
        }
      });
    }

    // Cleanup the scanner and stop the video tracks when unmounting
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [router]);

  return (
    <div className={styles.container}>
      <video ref={videoRef} style={{ width: '50%' }} />
      {data && <p>Scanned QR Code Data: {data}</p>}
    </div>
  );
};

export default QrScannerComponent;
