import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

export const Header = styled.View`
  background-color: #ffffff;
  padding: 10px 20px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #e33e36;
`;

export const PokedexTop = styled.View`
  background-color: #e33e36;
  padding-top: 20px;
  padding-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

export const SearchInput = styled.TextInput`
  height: 40px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #e33e36;
`;

export const PokedexAntenna = styled.View`
  width: 10px;
  height: 10px;
  background-color: #282828;
  border-radius: 50px;
  margin-bottom: 5px;
`;

export const PokedexTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
`;

export const PokedexButton = styled.View`
  width: 60px;
  height: 5px;
  background-color: #282828;
  border-radius: 5px;
`;

export const FavoriteCounter = styled.Text`
  font-size: 18px;
  color: #777777;
  text-align: center;
`;

export const PokemonList = styled.FlatList`
  padding: 20px;
`;

export const PokemonName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

export const PokemonDetailContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const PokemonDetailHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #e33e36;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #e33e36;
  border-radius: 5px;
  margin-right: 10px;
`;

export const CloseButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

export const PokemonDetail = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const PokemonImage = styled.Image`
  width: ${SCREEN_WIDTH / 2}px;
  height: ${SCREEN_WIDTH / 2}px;
  margin-bottom: 20px;
`;

export const PokemonInfo = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const InfoTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 10px;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

export const TypeList = styled.FlatList`
  margin-top: 10px;
`;

const TypeText = styled.Text`
  font-size: 16px;
  color: #333333;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const AbilityList = styled.FlatList`
  margin-top: 10px;
`;

export const AbilityText = styled.Text`
  font-size: 16px;
  color: #333333;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  background-color: #f0f0f0;
`;

export const StatList = styled.FlatList`
  margin-top: 10px;
`;

export const StatText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  padding: 5px;
  margin: 5px;
`;

export const ToggleFavoriteButton = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 10px;
  background-color: #e33e36;
  border-radius: 5px;
`;

export const ToggleFavoriteText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
`;

export const CardWrapper = styled.View`
  padding: 8px;
`;

export const Card = styled.View`
  padding: 24px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  margin-bottom: 16px;
`;
export const PokemonDetailWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #e33e36;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const PokemonImageWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-right: 20px;
`;

export const PokemonShinyImage = styled.Image`
  width: ${SCREEN_WIDTH / 2}px;
  height: ${SCREEN_WIDTH / 2}px;
  margin-bottom: 20px;
`;
