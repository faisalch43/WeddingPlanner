import React, { Component } from "react";
import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CreateVendor from "./createVendor";
import VendorCheckList from "./vendorCheckList";
const Drawer = createDrawerNavigator();

const vendorDrawer = (props) => {

	const dimensions = useWindowDimensions();

	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={CreateVendor} initialParams={props} />
			<Drawer.Screen name="CheckList" component={VendorCheckList} />

		</Drawer.Navigator>
	);
};

export default vendorDrawer;
