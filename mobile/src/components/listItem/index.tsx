import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from "react-native";

type ListItemProps = {
  title: string;
  subtitle?: string;
  image?: string | ImageSourcePropType; // aceita URL ou require()
  price?: string;
  onPress?: () => void;
};

export default function ListItem({ title, subtitle, image, price, onPress }: ListItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress || (() => {})}>
      {image && (
        typeof image === "string" 
          ? <Image source={{ uri: image }} style={styles.image} />
          : <Image source={image} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {price && <Text style={styles.price}>{price}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  price: { fontSize: 14, fontWeight: "bold", marginTop: 4, color: "#4CAF50" },
});
