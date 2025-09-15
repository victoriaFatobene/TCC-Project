import React from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Image, Text } from "react-native";

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
            paddingBottom: 79,
          }}
        >
          <View>
            <ImageBackground
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/cbtdhd5x_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                paddingBottom: 89,
                marginBottom: 258,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 34,
                }}
              >
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/dax3emux_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={{
                    width: 91,
                    height: 91,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 392,
                    alignItems: "center",
                    backgroundColor: "#5B0000",
                    borderColor: "#000000",
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      marginTop: 7,
                      marginBottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: "#6D1E1E",
                        fontSize: 40,
                      }}
                    >
                      {"Ver Mais"}
                    </Text>
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 5,
                        left: 4,
                        color: "#EEFF00",
                        fontSize: 40,
                      }}
                    >
                      {"Ver Mais"}
                    </Text>
                  </View>
                </View>
              </View>

              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/hrg2wzvs_expires_30_days.png",
                }}
                resizeMode={"stretch"}
                style={{
                  width: 100,
                  height: 98,
                  marginBottom: 80,
                  marginLeft: 11,
                }}
              />
              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/n5fes69k_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={{
                    width: 85,
                    height: 88,
                  }}
                />
              </View>
            </ImageBackground>

            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/z647ysch_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                width: 41,
                height: 34,
                marginLeft: 9,
              }}
            />
          </View>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/87umyq51_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={{
              position: "absolute",
              bottom: 267,
              left: 17,
              width: 85,
              height: 88,
            }}
          />

          <View
            style={{
              position: "absolute",
              top: 157,
              right: 43,
              left: 43,
              backgroundColor: "#5B0000",
              borderRadius: 53,
            }}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/8nfj1czy_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                height: 154,
                marginTop: 55,
                marginBottom: 29,
                marginHorizontal: 45,
              }}
            />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                marginBottom: 32,
                marginLeft: 32,
              }}
            >
              {"Valor: R$ 50,00"}
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                marginBottom: 49,
                marginHorizontal: 31,
              }}
            >
              {"Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod"}
            </Text>
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 201,
              right: 105,
              left: 105,
              alignItems: "center",
              backgroundColor: "#FFF89E",
              borderRadius: 15,
              paddingHorizontal: 11,
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: 16,
                marginTop: 18,
                marginBottom: 4,
              }}
            >
              {"Adicionar ao carrinho"}
            </Text>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/2j5d47xj_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{
                width: 35,
                height: 35,
                marginBottom: 7,
              }}
            />
          </View>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/jfligyag_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 224,
              height: 368,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
