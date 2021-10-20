import React from "react";
import {
	View,
	Text,
	Modal,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { localInfo } from "../utils";

interface PopupProps {
	isPopupVisible: boolean;
	onCancel: () => void;
	onSelectItem: (data: Object) => void;
}

export default function Popup({
	isPopupVisible,
	onCancel,
	onSelectItem,
}: PopupProps) {
	return (
		<Modal
			visible={isPopupVisible}
			animated
			transparent
			animationType={"fade"}
			statusBarTranslucent
		>
			<View style={styles.container}>
				<View style={styles.cardContainer}>
					<TouchableOpacity
						style={styles.cardIcon}
						activeOpacity={0.8}
						onPress={onCancel}
					>
						<Ionicons
							name={"close"}
							size={28}
							color={colors.white}
						/>
					</TouchableOpacity>

					<FlatList
						data={localInfo}
						keyExtractor={(item, index) => String(index)}
						renderItem={({ item, index }) => {
							return (
								<>
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={() =>
											onSelectItem({
												local: item.local,
												plural: item.plural,
											})
										}
									>
										<Text style={styles.cardItem}>
											{item.local}
										</Text>
									</TouchableOpacity>

									{index !== localInfo.length - 1 ? (
										<View style={styles.cardDivider} />
									) : (
										<></>
									)}
								</>
							);
						}}
					/>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.fade,
	},
	cardContainer: {
		padding: 14,
		width: "50%",
		borderRadius: 12,
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		backgroundColor: colors.green,
	},

	cardIcon: {
		top: 4,
		right: 8,
		position: "absolute",
	},

	cardItem: {
		fontSize: 16,
		marginVertical: 8,
		color: colors.white,
		textAlign: "center",
		fontFamily: fonts.semiBold,
	},

	cardDivider: {
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: colors.green_light,
	},
});
