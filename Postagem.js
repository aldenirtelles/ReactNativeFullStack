import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './StylePostagem';
import axios from 'axios';

function Postagem() {
  const [legenda, setLegenda] = useState('');
  const [imagem, setImagem] = useState(null);
  const navigation = useNavigation();
  const [valor, setValor] = useState('');
  const [url, setUrl] = useState('');
  var imagemUrl = url;
  var legendaImagem = legenda;

  const handleCarregarFoto = async () => {
      // Verificar e solicitar permissão para acessar a galeria
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            // Selecionar imagem da galeria
            let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            });
            if (!data.cancelled) {
            // Manipular a imagem selecionada
            let newfile = {
                uri: data.uri,
                type: `test/${data.uri.split('.')[1]}`,
                name: `test.${data.uri.split('.')[1]}`,
            };
            const url = await handleUpload(newfile);
            setUrl(url);
            
            setImagem(data.uri);
            navigation.navigate('Home');
            }
        } else {
            Alert.alert('Você precisa de permissão para acessar a galeria');
        }
  };

  const handleTirarFoto = async () => {
      // Verificar e solicitar permissão para acessar a câmera
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            // Capturar imagem da câmera
            let data = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            });
            if (!data.cancelled) {
            // Manipular a imagem capturada
            let newfile = {
                uri: data.uri,
                type: `test/${data.uri.split('.')[1]}`,
                name: `test.${data.uri.split('.')[1]}`,
            };
            const url = await handleUpload(newfile);
            setUrl(url);
            
            setImagem(data.uri);
            navigation.navigate('Home');
            }
        } else {
            Alert.alert('Você precisa de permissão para acessar a câmera');
        }
  };

  const handlePublicar = async (imagemUrl, legendaImagem) => {
    console.log("teste1");
    try {
        console.log("teste2");
        await cadastrarUsuario(imagemUrl, legendaImagem);
        console.log("teste3");
        // Navegar para a tela "home" (substitua o código abaixo com a lógica de navegação adequada)
        navigation.navigate('Home');
        console.log("teste4");
      } catch (error) {
        console.error('Erro ao publicar:', error.message);
        // Retornar erro simplificado
      }
  };

  const handleUpload = async (imagem) => {
    const data = new FormData();
    data.append('file', imagem);
    data.append('upload_preset', 'urbtech_app');
    data.append('cloud_name', 'dweli7gti');
  
    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dweli7gti/image/upload', {
          method: 'post',
          body: data,
        });
        const jsonResponse = await response.json();
        return jsonResponse.url;
      } catch (error) {
        console.log(jsonResponse);
        console.log(jsonResponse.imageUrl);
        console.error('Error during image upload:', error);
        throw error;
      }
  };

  const CircularJSON = require('circular-json');

  const cadastrarUsuario = async (url1, legenda1) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: CircularJSON.stringify({ url1, legenda1}),
    };

    console.log(requestOptions.body);
    console.log(typeof(requestOptions.body));
  
    fetch('http://10.0.0.200:3000/usuario', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Erro ao cadastrar usuário:', error));
  }



  /*const cadastrarUsuario = async (url1, legenda1) => {
    const requestBody = {
      url1,
      legenda1
    };
  
    try {
      const response = await axios.post('http://localhost:3000/usuario', {url1, legenda1});
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  }*/

  return (
    <View style={styles.container}>
      <Image style={styles.square} source={{uri: imagem}} />

      <TextInput
        style={styles.input}
        placeholder="Digite aqui sua legenda"
        value={legenda}
        onChangeText={text => setLegenda(text)}
      />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Carregar Foto" onPress={handleCarregarFoto} />
        <Button style={styles.button} title="Tirar Foto" onPress={handleTirarFoto} />
      </View>
    </View>
  );
}

export default Postagem;
