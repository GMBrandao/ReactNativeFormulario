import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    confirmEmail: '',
    documento: '',
    telefone: ''
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const { nome, email, confirmEmail, documento, telefone } = form;

    if (!nome || !email || !confirmEmail || !documento || !telefone) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      console.log("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    if(email !== confirmEmail){
      Alert.alert("Erro", "Email deve ser igual nos dois campos");
      console.log("Erro", "Email deve ser igual nos dois campos");
      return;
    }

    console.log("Dados do Formulário:", form);
    Alert.alert("Sucesso", "Formulário enviado com sucesso!");
    setForm({ nome: '', email: '', confirmEmail: '', documento: '' , telefone: ''});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={form.nome}
        onChangeText={(value) => handleInputChange('nome', value)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />

<Text style={styles.label}>Confirme o Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme seu email"
        keyboardType="email-address"
        value={form.confirmEmail}
        onChangeText={(value) => handleInputChange('confirmEmail', value)}
      />

      <Text style={styles.label}>Documento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu documento"
        keyboardType="numeric"
        value={form.documento}
        onChangeText={(value) => handleInputChange('documento', value)}
      />

<Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone"
        keyboardType="numeric"
        value={form.telefone}
        onChangeText={(value) => handleInputChange('telefone', value)}
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});