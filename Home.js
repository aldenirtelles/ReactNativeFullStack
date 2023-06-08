import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import styles from './StyleHome';

function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [imageUrls, setImageUrls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFABPress = () => {
    navigation.navigate('Postagem');
  };

  const fetchData = () => {
    fetch('http://10.0.0.200:3000/images')
      .then(response => response.json())
      .then(data => {
        setImageUrls(data);
      })
      .catch(error => {
        console.error('Erro ao obter URLs das imagens:', error);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container2}>
        <ScrollView>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Text style={styles.text}>#dicasdeBike</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>#trilhas</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>#pedalando</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>#healthyactivelifestyle</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>#bikelifestyle</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            {imageUrls.map((imageUrl, index) => (
              <Image key={index} style={styles.image} source={{ uri: imageUrl }} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <FAB
        onPress={handleFABPress}
        style={styles.fab}
        small={false}
        icon={({ size }) => (
          <Icon style={{ alignSelf: 'center' }} name="plus" size={size} color="#F3FCE7" />
        )}
        theme={{ colors: { accent: '#F3FCE7' } }}
      />
    </View>
  );
}

export default Home;
