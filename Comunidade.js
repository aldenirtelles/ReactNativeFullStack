import { SafeAreaView, StatusBar, Text, View, Image} from 'react-native';
import styles from './Style';

export default function App() {
  return (
    <View style={styles.container}>

        <SafeAreaView style={styles.container2}>
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
        </SafeAreaView>
    </View>
  );
}