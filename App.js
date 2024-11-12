import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";

const ip = "192.168.0.127";

export default function App() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    confirmEmail: "",
    documento: "",
    telefone: "",
  });

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://${ip}:7148/api/users`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao carregar os usuários." + error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { nome, email, confirmEmail, documento, telefone } = form;

    if (!nome || !email || !confirmEmail || !documento || !telefone) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      console.log("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    if (email !== confirmEmail) {
      Alert.alert("Erro", "Email deve ser igual nos dois campos");
      console.log("Erro", "Email deve ser igual nos dois campos");
      return;
    }

    try {
      const response = await fetch(`http://${ip}:7148/api/users`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, documento, telefone }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }

      Alert.alert("Sucesso", "Formulário enviado com sucesso!");
      fetchUsers();
      setForm({
        nome: "",
        email: "",
        confirmEmail: "",
        documento: "",
        telefone: "",
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar o formulário.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>Nome: {item.nome}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Documento: {item.documento}</Text>
      <Text>Telefone: {item.telefone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled = {true}>
        {/* Formulário */}
        <View style={styles.insideContainer}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={form.nome}
            onChangeText={(value) => handleInputChange("nome", value)}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />

          <Text style={styles.label}>Confirme o Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme seu email"
            keyboardType="email-address"
            value={form.confirmEmail}
            onChangeText={(value) => handleInputChange("confirmEmail", value)}
          />

          <Text style={styles.label}>Documento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu documento"
            keyboardType="numeric"
            value={form.documento}
            onChangeText={(value) => handleInputChange("documento", value)}
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu telefone"
            keyboardType="numeric"
            value={form.telefone}
            onChangeText={(value) => handleInputChange("telefone", value)}
          />
          <Button title="Enviar" onPress={handleSubmit} />
        </View>

      {/* Lista de Usuários */}
      <View style={styles.insideContainer}>
        <Text style={styles.header}>Lista de Usuários</Text>
        <FlatList
          scrollEnabled = {false}
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Não há ninguém cadastrado</Text>
          }
        />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  insideContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
