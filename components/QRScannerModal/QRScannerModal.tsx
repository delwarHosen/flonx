import { H6 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { BarcodeScanningResult, CameraView } from 'expo-camera';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

interface QRScannerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ isVisible, onClose, onScan }) => {
  
  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    // Ekbar scan hole modal bondho hoye data pathiye dibe
    onScan(result.data);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
        
        {/* Close Overlay */}
        <View style={styles.overlay}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <H6 color={Colors.NEUTRAL0}>Cancel Scan</H6>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlay: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  }
});

export default QRScannerModal;