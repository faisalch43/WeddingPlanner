import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Picker,
	FlatList
} from "react-native";

import {
	Button,
	Left,
	Right,
	Body,
	Card,
	CardItem,
	Container,
	Header,
	Segment,
	Content,
	Icon
} from "native-base";
import axios from 'react-native-axios';
const instance = axios.create({
	baseURL: "https://demo-ajmal.herokuapp.com/api"
})

const vendorCheckList = (props) => {
	let _id = props.route.params.route.params.user_id
	let vendorChecklist = []
	let vendorCheck = []

	React.useEffect(() => {
		async function fetchData() {

			const res = await instance.post('/getAllbook/services', { vendor_id: _id })
			if (res.status == 200) {
				let data = res.data.message;

				data.map((text, index) => {

					vendorChecklist.push({
						venueName: text.venueName,
						venueType: text.serviceName,
						perPerson: text.perPerson,
						totalGuest: text.totalGuest,
						CustomerName: text.user_id.fullName,
						CustomerPhoneNumber: text.user_id.phone,
						TotaltBudget: text.perPerson * text.totalGuest
					})

				})
				setListData(vendorChecklist)
				setLoading(true)
			}


		}
		fetchData();

	}, []);

	React.useEffect(() => {
		async function fetchList() {

			const res = await instance.post('/service/get', { vendor_id: _id })
			if (res.status == 200) {
				let data = res.data.message;
				// console.log(data)
				data.map((text, index) => {

					vendorCheck.push({
						phone: text.phone,
						serviceName: text.serviceName,
						perPersonCharge: text.perPersonCharge,
						address: text.address,
						venueName: text.venueName
					})
					// console.log("ajmal", vendorCheck)
				})
				setListService(vendorCheck)
				setLoading(true)
			}


		}
		fetchList()

	}, []);

	const [activeBookedServices, setActiveBookedServices] = useState(false);
	const [activeServices, setActiveServices] = useState(true);
	const [loading, setLoading] = useState(false);
	const [listData, setListData] = useState(

		vendorChecklist
	);
	const [listService, setListService] = useState(

		vendorCheck
	);

	const tabHandler = type => {
		if (type == "Booked Services") {
			setActiveBookedServices(true);
			setActiveServices(false);
		} else if (type == "Services") {
			setActiveServices(true);
			setActiveBookedServices(false);
		}
	};

	return (
		<Container>
			<Header hasSegment>
				<Left>
					<Button transparent onPress={() => props.navigation.goBack()}>
						<Icon name="arrow-back" />
					</Button>
				</Left>
				<Body style={{ marginRight: "15%", flex: 1 }}>
					<Segment>
						<Button
							first
							active={activeBookedServices}
							onPress={() => tabHandler("Booked Services")}
						>
							<Text style={{ paddingLeft: "2%" }}>Booked Services </Text>
						</Button>
						<Button
							last
							active={activeServices}
							onPress={() => tabHandler("Services")}
							style={{ flex: 1 }}
						>
							<Text style={{ paddingLeft: "25%" }}>Services</Text>
						</Button>
					</Segment>
				</Body>
			</Header>
			{activeBookedServices ? (
				<Content>
					<View style={styles.body}>
						<View style={styles.title}>
							<Text style={styles.textTitle}>Booked Services</Text>
						</View>
						<View style={{ flex: 1 }}>

							<FlatList
								data={listData}
								keyExtractor={(item, index) => item.id}
								renderItem={({ item }) => (

									<Card id={item.id} >
										<CardItem>
											<Body>
												<View>
													<Text style={styles.servicesText}>
														<Text style={styles.checklist}> Customer Name </Text>: {item.CustomerName}
													</Text>
													<Text style={styles.servicesText}>
														<Text style={styles.checklist}> Phone Number </Text>  : {item.CustomerPhoneNumber}
													</Text>
													<Text style={styles.servicesText}>
														<Text style={styles.checklist}> Venue Name </Text>: {item.venueName}
													</Text>
													<Text style={styles.servicesText}>
														<Text style={styles.checklist}> Venue Type </Text>: {item.venueType}
													</Text>
													<Text style={styles.servicesText}>
														<Text style={styles.checklist}> Per Price </Text>: {item.perPerson}
													</Text>
													<Text style={styles.servicesText}>
														<Text style={styles.checklist}> Total Guest </Text>: {item.totalGuest}
													</Text>
													<Text style={styles.totalBudget}>
														<Text style={styles.budget}> Total Budget </Text> : {item.TotaltBudget}
													</Text>
												</View>
											</Body>
										</CardItem>
									</Card>
								)}
								keyExtractor={item => item.id}
							/>
						</View>
					</View>
				</Content>
			) : activeServices ? (
				<Content>
					<View style={styles.body}>
						<View style={styles.title}>
							<Text style={styles.textTitle}>Services</Text>
						</View>
						<View style={{ flex: 1 }}>
							<FlatList
								data={listService}
								renderItem={({ item }) => (
									<Card>
										<CardItem>
											<Body>
												<Text style={styles.servicesText}>
													<Text style={styles.checklist}> Address  </Text>: {item.address}
												</Text>
												<Text style={styles.servicesText}>
													<Text style={styles.checklist}>	Phone </Text> : {item.phone}
												</Text>
												<Text style={styles.servicesText}>
													<Text style={styles.checklist}> Venue Name </Text>: {item.venueName}
												</Text>
												<Text style={styles.servicesText}>
													<Text style={styles.checklist}> Venue Type </Text> : {item.serviceName}
												</Text>
												<Text style={styles.servicesText}>
													<Text style={styles.checklist}>	Per Price </Text> : {item.perPersonCharge}
												</Text>

											</Body>
										</CardItem>
									</Card>
								)}
								keyExtractor={item => item.id}
							/>
						</View>
					</View>
				</Content>
			) : null}
		</Container>
	);
};

styles = StyleSheet.create({
	body: {
		flex: 1,
		// padding: "5%",
		backgroundColor: "white"
	},

	title: {
		marginTop: "10%",
		marginBottom: "10%",
		alignItems: "center"
	},
	textTitle: {
		fontSize: 30,
		fontWeight: "bold",
		color: "black"
	},
	servicesText: {
		padding: "3%"
	},
	checklist: {
		fontSize: 15,
		fontWeight: "bold"

	},
	totalBudget: {
		textAlign: "center",
		fontSize: 15,
		marginTop: 10,
		marginBottom: 10
	},
	budget: {
		fontSize: 20,
		fontWeight: "bold"

	}
});

export default vendorCheckList;
