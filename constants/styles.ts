import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	// Conteneurs principaux
	container: {
		flex: 1,
		backgroundColor: "#F2F2F7",
		paddingHorizontal: 20,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F2F2F7",
	},

	// Titres et Textes
	headerTitle: {
		fontSize: 28,
		fontWeight: "900",
		color: "#1C1C1E",
		textAlign: "center",
		marginTop: 60,
		marginBottom: 25,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#3A3A3C",
		marginBottom: 12,
		marginTop: 10,
	},
	emptyText: {
		color: "#8E8E93",
		fontStyle: "italic",
		textAlign: "center",
		padding: 20,
	},

	// Cartes et Liste
	section: {
		marginBottom: 25,
	},
	itemRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	modeleCard: {
		flex: 1,
		backgroundColor: "#FFF",
		padding: 16,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#D1D1D6",
		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.05,
				shadowRadius: 4,
			},
			android: { elevation: 2 },
		}),
	},
	selectedCard: {
		backgroundColor: "#007AFF",
		borderColor: "#007AFF",
	},
	modeleText: {
		fontSize: 16,
		color: "#1C1C1E",
		fontWeight: "500",
	},
	selectedText: {
		color: "#FFF",
		fontWeight: "700",
	},
	deleteBtn: {
		padding: 12,
		marginLeft: 8,
		backgroundColor: "#FFF",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#FFD6D4",
	},

	// Formulaires et Inputs
	input: {
		backgroundColor: "#FFF",
		padding: 16,
		borderRadius: 14,
		fontSize: 18,
		borderWidth: 1,
		borderColor: "#D1D1D6",
		marginBottom: 15,
	},
	addSection: {
		backgroundColor: "#FFF",
		padding: 20,
		borderRadius: 20,
		marginBottom: 40,
		borderWidth: 1,
		borderColor: "#E5E5EA",
	},
	smallInput: {
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5EA",
		paddingVertical: 12,
		marginBottom: 10,
		fontSize: 16,
		color: "#1C1C1E",
	},
	lastServiceCard: {
		backgroundColor: "#FFF9E6", // Une couleur légèrement différente (jaune pâle) pour distinguer
		padding: 15,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#FFECC0",
		marginBottom: 15,
	},
	// Boutons
	calcButton: {
		backgroundColor: "#007AFF",
		padding: 18,
		borderRadius: 14,
		alignItems: "center",
		marginTop: 5,
	},
	calcButtonText: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 17,
	},
	addButton: {
		backgroundColor: "#34C759",
		padding: 15,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 15,
	},
	addButtonText: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 15,
	},

	// Divers
	divider: {
		height: 1,
		backgroundColor: "#D1D1D6",
		marginVertical: 30,
		width: "100%",
	},
});
