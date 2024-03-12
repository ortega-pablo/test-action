import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {orangeYellow} from '../styles/GlobalStyle';
import {getUserByEmailAsync, loginUserAsync} from '../redux/userSlice';
import SVGBackground from '../components/Background';
import CustomButton from '../components/Button';
import CustomInput from '../components/Input&Label';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  const validateFields = () => {
    if (email === '') {
      setErrorMessage('Complete todos los campos');
      return;
    }
    if (passwd === '') {
      setErrorMessage('Complete todos los campos');
      return;
    }
    return true;
  };

  const onSubmit = async () => {
    if (validateFields()) {
      const loginResult = await dispatch(
        loginUserAsync({
          email: email,
          password: passwd,
        }),
      ).unwrap();

      if (!loginResult.success || loginResult.status !== 200) {
        setErrorMessage('Usuario y/o contraseña incorrectos');
        return;
      }

      const getUserRes = await dispatch(getUserByEmailAsync(email)).unwrap();
      if (!getUserRes.success || getUserRes.status !== 200) {
        setErrorMessage(
          'Hubo un problema al iniciar sesión. Intente nuevamente',
        );
        return;
      }
      navigation.replace('GeneralPanel');
    }
  };

  return (
    <SVGBackground>
      <View style={styles.container}>
        <View style={styles.loginFormContainer}>
          <Text style={styles.title}>INICIO DE SESION</Text>
          <CustomInput
            labelTitle={'Email'}
            placeHolderText={'Ingresar email'}
            onChangeText={setEmail}
            autoCapitalize={'none'}
          />
          <CustomInput
            isPasswordType={true}
            labelTitle={'Contraseña'}
            placeHolderText={'Igresar contraseña'}
            onChangeText={setPasswd}
            autoCapitalize={'none'}
          />
          <Text style={styles.errorMessage}>
            {errorMessage ? errorMessage : null}
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              title={'Iniciar Sesion'}
              type={'primary'}
              size={'large'}
              onPress={onSubmit}
            />
          </View>
        </View>
      </View>
    </SVGBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginFormContainer: {
    width: 584,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 24,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 48,
  },
  title: {
    color: orangeYellow,
    fontSize: 42,
    fontFamily: 'dredd',
    lineHeight: 58.8,
    letterSpacing: 0.42,
  },
  errorMessage: {
    marginVertical: 4,
    fontFamily: 'Goldman-Regular',
    fontSize: 16,
    color: '#Ff3c38',
  },
});

export default Login;
