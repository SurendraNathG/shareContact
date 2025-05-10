import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const PhoneNumberModal = ({ isVisible, numbers, onSelect, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Continue with</Text>
          <FlatList
            data={numbers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.numberContainer}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.numberText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.noneButton} onPress={onClose}>
            <Text style={styles.noneText}>NONE OF THE ABOVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  numberContainer: {
    width: '100%',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 16,
  },
  noneButton: {
    marginTop: 16,
    padding: 12,
  },
  noneText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default PhoneNumberModal;
