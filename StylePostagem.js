import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3FCE7',
  },
  square: {
    width: 320,
    height: 320,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderRadius: 10,
    borderColor: '#161B31',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default styles;
