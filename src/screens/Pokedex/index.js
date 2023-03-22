import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  Modal,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';

import axios from 'axios';
import {
  Header,
  Container,
  PokedexTop,
  SearchInput,
  PokedexAntenna,
  PokedexTitle,
  PokedexButton,
  FavoriteCounter,
  PokemonList,
  PokemonName,
  Card,
  CardWrapper,
  PokemonDetailContainer,
  PokemonDetailWrapper,
  PokemonImageWrapper,
  PokemonShinyImage,
  PokemonDetailHeader,
  CloseButton,
  CloseButtonText,
  PokemonDetail,
  PokemonImage,
  PokemonInfo,
  InfoTitle,
  InfoText,
  TypeList,
  AbilityList,
  AbilityText,
  StatList,
  StatText,
  ToggleFavoriteButton,
  ToggleFavoriteText,
} from './styledComponents';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [sortMode, setSortMode] = useState('favorites');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=151',
        );
        const {results} = response.data;
        const pokemonData = await Promise.all(
          results.map(async result => {
            const pokemonResponse = await axios.get(
              `${result.url}?language=fr`,
            );
            return pokemonResponse.data;
          }),
        );
        setPokemonList(pokemonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
  }, []);

  const filterPokemonList = search => {
    const lowerCaseSearch = search.toLowerCase();
    return pokemonList.filter(pokemon => {
      const frenchNameObj =
        pokemon.species.names &&
        pokemon.species.names.find(name => name.language.name === 'fr');
      const frenchName = frenchNameObj ? frenchNameObj.name : pokemon.name;
      return (
        pokemon.name.toLowerCase().includes(lowerCaseSearch) ||
        frenchName.toLowerCase().includes(lowerCaseSearch)
      );
    });
  };

  const sortByType = (a, b) => {
    const aType = a.types[0].type.name;
    const bType = b.types[0].type.name;
    return aType.localeCompare(bType);
  };

  useEffect(() => {
    setFilteredPokemonList(filterPokemonList(searchValue));
  }, [pokemonList, searchValue]);

  const openModal = pokemon => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setModalVisible(false);
  };

  const toggleFavorite = pokemon => {
    if (favorites.includes(pokemon)) {
      setFavorites(favorites.filter(fav => fav !== pokemon));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  const isFavorite = pokemon => {
    return favorites.includes(pokemon);
  };

  const TypeBadge = ({typeName}) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };

    return (
      <View
        style={{
          backgroundColor: typeColors[typeName],
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
          marginRight: 4,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{typeName}</Text>
      </View>
    );
  };

  const TypeText = ({typeName}) => {
    return <TypeBadge typeName={typeName} />;
  };

  const renderItem = ({item}) => {
    const isFav = isFavorite(item);
    const backgroundColor = isFav ? '#FDE68A' : '#FFFFFF';
    const frenchNameObj =
      item.species.names &&
      item.species.names.find(name => name.language.name === 'fr');
    const frenchName = frenchNameObj ? frenchNameObj.name : item.name;
    return (
      <CardWrapper>
        <Card style={{backgroundColor}}>
          <TouchableOpacity onPress={() => openModal(item)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
                  }}
                  style={{width: 100, height: 100, marginRight: 10}}
                />
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${item.id}.png`,
                  }}
                  style={{width: 100, height: 100, marginRight: 10}}
                />
              </View>
              <View>
                <Text
                  style={{fontWeight: isFav ? 'bold' : 'normal', fontSize: 24}}>
                  {frenchName}
                </Text>
                <Text style={{fontSize: 18}}>#{item.id}</Text>
                <View style={{flexDirection: 'row'}}>
                  {item.types.map(typeObj => (
                    <TypeBadge
                      key={typeObj.type.name}
                      typeName={typeObj.type.name}
                    />
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </CardWrapper>
    );
  };

  const sortPokemon = (a, b) => {
    const isAFav = isFavorite(a);
    const isBFav = isFavorite(b);

    const primaryTypeA = a.types[0].type.name;
    const primaryTypeB = b.types[0].type.name;

    if (isAFav && isBFav) {
      if (sortMode === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (sortMode === 'type') {
        const typeCompare = primaryTypeA.localeCompare(primaryTypeB);
        if (typeCompare === 0) {
          return a.id - b.id;
        }
        return typeCompare;
      } else {
        return a.id - b.id;
      }
    } else if (isAFav) {
      return -1;
    } else if (isBFav) {
      return 1;
    } else {
      if (sortMode === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (sortMode === 'type') {
        const typeCompare = primaryTypeA.localeCompare(primaryTypeB);
        if (typeCompare === 0) {
          return a.id - b.id;
        }
        return typeCompare;
      } else {
        return a.id - b.id;
      }
    }
  };

  return (
    <Container>
      <PokedexTop>
        <PokedexAntenna />
        <PokedexTitle>Pokédex</PokedexTitle>
        <PokedexButton />
      </PokedexTop>
      <Header>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FavoriteCounter>{favorites.length} favoris</FavoriteCounter>
          <TouchableOpacity
            onPress={() => {
              if (sortMode === 'id') {
                setSortMode('alphabetical');
              } else if (sortMode === 'alphabetical') {
                setSortMode('type');
              } else {
                setSortMode('id');
              }
            }}>
            <Text style={{marginLeft: 10}}>
              {sortMode === 'id'
                ? 'Tri par nom'
                : sortMode === 'alphabetical'
                ? 'Tri par type'
                : 'Tri par ID'}
            </Text>
          </TouchableOpacity>
        </View>
        <SearchInput
          onChangeText={text => setSearchValue(text)}
          value={searchValue}
          placeholder="Rechercher un Pokémon..."
          clearButtonMode="always"
          returnKeyType="search"
          autoCorrect={false}
        />
      </Header>
      <PokemonList
        data={filteredPokemonList.sort(sortPokemon)}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        numColumns={1}
        contentContainerStyle={{paddingBottom: 30}}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        {selectedPokemon && (
          <PokemonDetailContainer>
            <PokemonDetailHeader>
              <CloseButton onPress={closeModal}>
                <CloseButtonText>X</CloseButtonText>
              </CloseButton>
              <PokemonName>{selectedPokemon.name.toUpperCase()}</PokemonName>
              <View />
            </PokemonDetailHeader>
            <PokemonDetail>
              <PokemonDetailWrapper>
                <PokemonImageWrapper>
                  <PokemonImage
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`,
                    }}
                    style={{width: 150, height: 150, marginBottom: 10}}
                  />
                  <PokemonShinyImage
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${selectedPokemon.id}.png`,
                    }}
                    style={{width: 150, height: 150, marginBottom: 10}}
                  />
                </PokemonImageWrapper>
                <PokemonInfo>
                  <InfoTitle>Nom</InfoTitle>
                  <InfoTitle>#{selectedPokemon.id}</InfoTitle>
                  <InfoTitle>Taille</InfoTitle>
                  <InfoText>{selectedPokemon.height} m</InfoText>
                  <InfoTitle>Poids</InfoTitle>
                  <InfoText>{selectedPokemon.weight} kg</InfoText>
                  <InfoTitle>Type(s)</InfoTitle>
                  <TypeList
                    data={selectedPokemon.types.map(
                      typeObj => typeObj.type.name,
                    )}
                    keyExtractor={item => item}
                    renderItem={({item}) => <TypeText typeName={item} />}
                    numColumns={2}
                  />
                  <InfoTitle>Capacités</InfoTitle>
                  <AbilityList
                    data={selectedPokemon.abilities}
                    keyExtractor={item => item.slot.toString()}
                    renderItem={({item}) => (
                      <AbilityText>{item.ability.name}</AbilityText>
                    )}
                  />
                  <InfoTitle>Statistiques</InfoTitle>
                  <StatList
                    data={selectedPokemon.stats}
                    keyExtractor={item => item.stat.name}
                    renderItem={({item}) => (
                      <StatText>
                        {item.stat.name}: {item.base_stat}
                      </StatText>
                    )}
                  />
                  <ToggleFavoriteButton
                    onPress={() => toggleFavorite(selectedPokemon)}>
                    <ToggleFavoriteText>
                      {isFavorite(selectedPokemon)
                        ? 'Retirer des favoris'
                        : 'Ajouter aux favoris'}
                    </ToggleFavoriteText>
                  </ToggleFavoriteButton>
                </PokemonInfo>
              </PokemonDetailWrapper>
            </PokemonDetail>
          </PokemonDetailContainer>
        )}
      </Modal>
    </Container>
  );
};

export default Pokedex;
