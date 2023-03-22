import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components/native';

const Login = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: 'https://login.hikkary.com/users/login',
      data: {
        username: inputs.email,
        password: inputs.password,
      },
    })
      .then(res => {
        console.log(res.headers['x-access-token']);
        AsyncStorage.setItem('token', res.headers['x-access-token'])
          .then(() => {
            navigation.navigate('Pokedex');
          })
          .catch(err => {
            console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
          });
      })
      .catch(err => {
        console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
      });
  };

  return (
    <Container>
      <Title>Login</Title>
      <Touchable onPress={() => navigation.goBack()}>
        <ButtonText>Go Back</ButtonText>
      </Touchable>
      <InputContainer>
        <TextInputStyled
          placeholder="Email"
          value={inputs.email}
          onChangeText={text => setInputs({...inputs, email: text})}
        />
      </InputContainer>
      <InputContainer>
        <TextInputStyled
          placeholder="Password"
          value={inputs.password}
          onChangeText={text => setInputs({...inputs, password: text})}
        />
      </InputContainer>
      <LoginButton onPress={handleLogin}>
        <ButtonText>LOGIN</ButtonText>
      </LoginButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f7f7f7;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 64px;
  margin-bottom: 32px;
`;

const InputContainer = styled.View`
  margin-bottom: 16px;
`;

const TextInputStyled = styled.TextInput`
  background-color: #e0e0e0;
  padding: 16px;
  border-radius: 8px;
`;

const Touchable = styled.TouchableOpacity`
  margin-bottom: 16px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  text-align: center;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #202020;
  padding: 16px;
  border-radius: 8px;
`;

export default Login;
