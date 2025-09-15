import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image } from "react-native";

export default (props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#7B0909",
        }}
      >
        {/* Cabeçalho */}
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#5E0808",
            borderColor: "#000000",
            borderWidth: 1,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              color: "#EEFF00",
              fontSize: 40,
            }}
          >
            {"Cardápio "}
          </Text>
        </View>

        {/* Conteúdo principal */}
        <View style={{ flexDirection: "row" }}>
          {/* Coluna esquerda */}
          <View
            style={{
              alignItems: "center",
              marginRight: 24,
            }}
          >
            <View
              style={{
                backgroundColor: "#1F451A",
                borderColor: "#000000",
                borderWidth: 2,
                paddingTop: 42,
                paddingBottom: 27,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 19,
                  marginLeft: 39,
                }}
              >
                {"Pizzas"}
              </Text>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/uulzo8g5_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={{
                  width: 120,
                  height: 112,
                  marginBottom: 32,
                }}
              />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 19,
                  marginLeft: 31,
                }}
              >
                {"Bebidas"}
              </Text>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/88znwjll_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={{
                  width: 120,
                  height: 112,
                  marginBottom: 55,
                }}
              />
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/snpswyio_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={{
                  width: 120,
                  height: 112,
                  marginBottom: 28,
                }}
              />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 19,
                  marginBottom: 4,
                  marginHorizontal: 23,
                }}
              >
                {"Favoritos"}
              </Text>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/d174b2pj_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={{
                  width: 120,
                  height: 112,
                }}
              />
            </View>
            <Text
              style={{
                position: "absolute",
                bottom: 314,
                right: -2,
                color: "#FFFFFF",
                fontSize: 19,
              }}
            >
              {"Sobremesas"}
            </Text>
          </View>

          {/* Coluna direita */}
          <View
            style={{
              alignItems: "center",
              marginTop: 68,
            }}
          >
            {/* Rodízios */}
            <View
              style={{
                alignItems: "center",
                marginBottom: 60,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFF89E",
                  borderColor: "#000000",
                  borderRadius: 23,
                  borderWidth: 1,
                  paddingTop: 4,
                  paddingBottom: 118,
                  paddingHorizontal: 27,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 19,
                  }}
                >
                  {"Rodízios"}
                </Text>
              </View>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/z9p8vx67_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 52,
                  width: 122,
                  height: 106,
                }}
              />
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/cvkt9dbl_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={{
                  position: "absolute",
                  bottom: -30,
                  right: -22,
                  width: 79,
                  height: 88,
                }}
              />
            </View>

            {/* Acompanhamentos */}
            <View
              style={{
                alignItems: "center",
                marginBottom: 61,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "#FFF89E",
                  borderColor: "#000000",
                  borderRadius: 23,
                  borderWidth: 1,
                  paddingTop: 4,
                  paddingBottom: 25,
                  paddingHorizontal: 27,
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 19,
                    marginBottom: 3,
                  }}
                >
                  {"Acompanhamentos"}
                </Text>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/alzgc0j5_expires_30_days.png",
                  }}
                  resizeMode="stretch"
                  style={{
                    width: 90,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
