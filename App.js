import { SafeAreaView, StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './Style';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import Home from './Home';
import Postagem from './Postagem';

const store = createStore(reducer);

const Stack = createStackNavigator();

const GreenBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={{ paddingLeft: 10 }}>
        <Image source={require('./assets/seta-verde.png')} style={{ width: 20, height: 20 }} />
      </View>
    </TouchableOpacity>
  );
};

const CircleImage = () => (
  <View style={{ paddingRight: 10 }}>
    <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: '#98C065', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./assets/zendaya.jpg')} style={{ width: 38, height: 38, borderRadius: 29, }} />
    </View>
  </View>
);

const myOptions = {
  title: 'Comunidade',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#161B31',
    height: 110,
  },
  headerLeft: () => <GreenBackButton />,
  headerRight: () => <CircleImage />,
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component ={Home} options={myOptions}/>
        <Stack.Screen name="Postagem" component={Postagem} options={{ ...myOptions, title: 'Postagem' }}/>
      </Stack.Navigator>
    </View>
  );
}

export default function RootComponent() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
}