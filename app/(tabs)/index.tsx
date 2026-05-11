import React, { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { styles } from "../../constants/styles";
import { supabase } from "../../supabase";

interface Modele {
	id: string;
	marque: string;
	nom_modele: string;
	intervalle_km: number;
}

export default function Page() {
	const [modeles, setModeles] = useState<Modele[]>([]);
	const [loading, setLoading] = useState(true);

	// États pour le calcul
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [kmDernierEntretien, setKmDernierEntretien] = useState<string>("");
	const [kmActuel, setKmActuel] = useState<string>("");

	// États pour l'ajout
	const [newMarque, setNewMarque] = useState("");
	const [newNom, setNewNom] = useState("");
	const [newIntervalle, setNewIntervalle] = useState("");

	// Récupération des données avec useCallback pour éviter l'erreur Biome
	const fetchModeles = useCallback(async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("modeles_voitures")
			.select("*")
			.order("marque", { ascending: true });

		if (error) Alert.alert("Erreur", error.message);
		else setModeles(data || []);
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchModeles();
	}, [fetchModeles]);

	// --- ACTIONS ---

	async function ajouterModele() {
		if (!newMarque || !newNom || !newIntervalle) {
			Alert.alert("Champs vides", "Merci de compléter le formulaire d'ajout.");
			return;
		}
		const { error } = await supabase.from("modeles_voitures").insert([
			{
				marque: newMarque,
				nom_modele: newNom,
				intervalle_km: parseInt(newIntervalle),
				intervalle_mois: 12,
			},
		]);

		if (error) {
			Alert.alert("Erreur", error.message);
		} else {
			setNewMarque("");
			setNewNom("");
			setNewIntervalle("");
			fetchModeles();
			Alert.alert("Succès", "Nouveau modèle ajouté !");
		}
	}

	async function supprimerModele(id: string) {
		Alert.alert("Supprimer", "Voulez-vous retirer ce modèle de la liste ?", [
			{ text: "Annuler", style: "cancel" },
			{
				text: "Supprimer",
				style: "destructive",
				onPress: async () => {
					const { error } = await supabase
						.from("modeles_voitures")
						.delete()
						.eq("id", id);
					if (!error) fetchModeles();
				},
			},
		]);
	}

	const calculerEntretien = () => {
		const voiture = modeles.find((m) => m.id === selectedId);
		const dernierKM = parseInt(kmDernierEntretien);
		const actuelKM = parseInt(kmActuel);

		if (!voiture || isNaN(dernierKM) || isNaN(actuelKM)) {
			Alert.alert(
				"Erreur",
				"Sélectionnez un véhicule et remplissez les kilométrages.",
			);
			return;
		}

		const prochainKM = dernierKM + voiture.intervalle_km;
		const reste = prochainKM - actuelKM;

		Alert.alert(
			"Résultat",
			`Prochain entretien à : ${prochainKM} km\n\n` +
				(reste > 0
					? `Il vous reste environ ${reste} km.`
					: `⚠️ Retard de ${Math.abs(reste)} km !`),
		);
	};

	if (loading)
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color="#007AFF" />
			</View>
		);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView
				style={styles.container}
				contentContainerStyle={{ paddingBottom: 60 }}
				showsVerticalScrollIndicator={false}
			>
				<Text style={styles.headerTitle}>AutoMaintenance</Text>

				{/* SECTION 1 : CHOIX DU VÉHICULE */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						1. Sélectionnez votre véhicule
					</Text>
					{modeles.map((item) => (
						<View key={item.id} style={styles.itemRow}>
							<TouchableOpacity
								style={[
									styles.modeleCard,
									selectedId === item.id && styles.selectedCard,
								]}
								onPress={() => setSelectedId(item.id)}
							>
								<Text
									style={[
										styles.modeleText,
										selectedId === item.id && styles.selectedText,
									]}
								>
									{item.marque} {item.nom_modele}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => supprimerModele(item.id)}
								style={styles.deleteBtn}
							>
								<Text>🗑️</Text>
							</TouchableOpacity>
						</View>
					))}
				</View>

				<View style={styles.divider} />

				{/* SECTION 2 : AJOUT DE VÉHICULE (NOUVEL EMPLACEMENT) */}
				<View style={styles.addSection}>
					<Text style={styles.sectionTitle}>➕ Ajouter un nouveau modèle</Text>
					<TextInput
						style={styles.smallInput}
						placeholder="Marque (ex: Peugeot)"
						value={newMarque}
						onChangeText={setNewMarque}
					/>
					<TextInput
						style={styles.smallInput}
						placeholder="Modèle (ex: 208)"
						value={newNom}
						onChangeText={setNewNom}
					/>
					<TextInput
						style={styles.smallInput}
						placeholder="Intervalle KM (ex: 15000)"
						keyboardType="numeric"
						value={newIntervalle}
						onChangeText={setNewIntervalle}
					/>
					<TouchableOpacity style={styles.addButton} onPress={ajouterModele}>
						<Text style={styles.addButtonText}>AJOUTER À LA LISTE</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.divider} />

				{/* SECTION 3 : CALCUL DE L'ÉCHÉANCE */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>2. Calculer l'entretien</Text>

					<View
						style={[
							styles.input,
							{ backgroundColor: "#FFF9E6", borderColor: "#FFECC0" },
						]}
					>
						<Text
							style={{ fontSize: 11, fontWeight: "bold", color: "#8A6D3B" }}
						>
							KILOMÉTRAGE DERNIER ENTRETIEN
						</Text>
						<TextInput
							placeholder="0"
							keyboardType="numeric"
							value={kmDernierEntretien}
							onChangeText={setKmDernierEntretien}
							style={{ fontSize: 18, marginTop: 5 }}
						/>
					</View>

					<View style={styles.input}>
						<Text
							style={{ fontSize: 11, fontWeight: "bold", color: "#8E8E93" }}
						>
							KILOMÉTRAGE ACTUEL
						</Text>
						<TextInput
							placeholder="0"
							keyboardType="numeric"
							value={kmActuel}
							onChangeText={setKmActuel}
							style={{ fontSize: 18, marginTop: 5 }}
						/>
					</View>

					<TouchableOpacity
						style={styles.calcButton}
						onPress={calculerEntretien}
					>
						<Text style={styles.calcButtonText}>VOIR MON ÉCHÉANCE</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
