import React from "react";
import { SafeAreaView, View, ImageBackground, ScrollView, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ImageBackground 
				source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/nexxslft_expires_30_days.png"}} 
				resizeMode = {'stretch'}
				style={{
					flex: 1,
				}}
				>
				<ScrollView  
					style={{
						flex: 1,
					}}>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}