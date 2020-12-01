import React, { Component } from "react";
import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CreateVendor from "./createVendor";
import CreateService from "./createService";
const Drawer = createDrawerNavigator();

const vendorDrawer = (props) => {
	const dimensions = useWindowDimensions();

	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={CreateVendor} />
			<Drawer.Screen name="CreateService" component={CreateService} initialParams={{ props }} />

		</Drawer.Navigator>
	);
};

export default vendorDrawer;