import React from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Text, Image } from "react-native";

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
          backgroundColor: "#6D1E1E",
        }}
      >
        <View
          style={{
            paddingBottom: 77,
          }}
        >
          <View
            style={{
              marginBottom: 3,
            }}
          >
            <ImageBackground
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/4imazfu8_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                alignItems: "center",
                paddingBottom: 113,
              }}
            >
              <View
                style={{
                  alignSelf: "stretch",
                  marginBottom: 57,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#5B0000",
                    borderColor: "#000000",
                    borderWidth: 1,
                    paddingTop: 11,
                    paddingBottom: 28,
                    marginBottom: 47,
                  }}
                >
                  <Text
                    style={{
                      color: "#EEFF00",
                      fontSize: 40,
                    }}
                  >
                    {"Carrinho\n"}
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                  }}
                >
                  <View>
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: "#5B0000",
                        borderRadius: 29,
                        paddingTop: 27,
                        paddingBottom: 6,
                        paddingHorizontal: 67,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 24,
                          marginBottom: 30,
                        }}
                      >
                        {"Pizza de Calabresa"}
                      </Text>
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 24,
                          marginBottom: 19,
                        }}
                      >
                        {"R$ 50,00"}
                      </Text>
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 24,
                          textAlign: "center",
                          width: 220,
                        }}
                      >
                        {"Quantidade: 1"}
                      </Text>
                    </View>

                    <Image
                      source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/h659ljj5_expires_30_days.png",
                      }}
                      resizeMode={"stretch"}
                      style={{
                        position: "absolute",
                        bottom: -36,
                        right: -18,
                        width: 85,
                        height: 88,
                      }}
                    />
                  </View>

                  <Image
                    source={{
                      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/p7d8owvi_expires_30_days.png",
                    }}
                    resizeMode={"stretch"}
                    style={{
                      position: "absolute",
                      top: -49,
                      left: -20,
                      width: 100,
                      height: 98,
                    }}
                  />
                </View>
              </View>

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 24,
                  marginBottom: 5,
                }}
              >
                {"Adicionar itens"}
              </Text>

              <View
                style={{
                  width: 185,
                  height: 1,
                  backgroundColor: "#FFFFFF",
                }}
              />
            </ImageBackground>

            <View
              style={{
                position: "absolute",
                bottom: -29,
                right: 108,
                left: 108,
                alignItems: "center",
                backgroundColor: "#FFF89E",
                borderRadius: 29,
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontSize: 36,
                  marginTop: 21,
                  marginBottom: 20,
                }}
              >
                {"Pagar"}
              </Text>
            </View>

            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/rc4pnjgk_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                position: "absolute",
                bottom: -73,
                left: 72,
                width: 85,
                height: 88,
              }}
            />
          </View>

          <View
            style={{
              alignItems: "center",
              marginLeft: 169,
            }}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/pwx346j1_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                width: 224,
                height: 368,
              }}
            />

            <Text
              style={{
                position: "absolute",
                top: 83,
                right: 70,
                color: "#FFFFFF",
                fontSize: 36,
              }}
            >
              {"Total: R$ 50,00"}
            </Text>

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 393,
                alignItems: "center",
                backgroundColor: "#5B0000",
                borderColor: "#000000",
                borderWidth: 1,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
