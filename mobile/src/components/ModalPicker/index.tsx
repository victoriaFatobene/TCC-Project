import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

type Option = {
  id: string;
  label: string;
  value: any;
};

type ModalPickerProps = {
  visible: boolean;
  options: Option[];
  onClose: () => void;
  onSelect: (option: Option) => void;
  title?: string;
};

export default function ModalPicker({ visible, options, onClose, onSelect, title }: ModalPickerProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}

          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  container: { width: "80%", backgroundColor: "#fff", borderRadius: 12, padding: 20, maxHeight: "70%" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  option: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  optionText: { fontSize: 16 },
  closeButton: { marginTop: 15, backgroundColor: "#4CAF50", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  closeText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
