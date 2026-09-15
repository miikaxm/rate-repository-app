import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router-native";
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker'
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce'


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    padding:10
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderSelector = ({ selected, setSelected }) => {
  return (
    <Picker
      selectedValue={selected}
      onValueChange={setSelected}
      style={styles.picker}
    >
      <Picker.Item label="Latest" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
}

const SearchBarComponent = ({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};
 
export const RepositoryListContainer = ({ repositories, selected, setSelected, searchQuery, setSearchQuery, onEndReached }) => {
  const navigate = useNavigate()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  
  const repoView = (id) => {
    navigate(`/srv/${id}`)
  }
  
  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <>
          <SearchBarComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <OrderSelector
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Pressable onPress={() => repoView(item.id)}><RepositoryItem item={item} /></Pressable>}
    />
  );
};

const RepositoryList = () => {
  const [selected, setSelected] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';

  if (selected === 'highest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  }

  if (selected === 'lowest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }

  const { repositories, fetchMore } = useRepositories({
    first: 5,
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selected={selected}
      setSelected={setSelected}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReached={fetchMore}
    />
  );
};

export default RepositoryList;