import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router-native";
import { useState } from 'react';
import { Searchbar, Menu} from 'react-native-paper';
import { useDebounce } from 'use-debounce'


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#1c1c1e',
  },
  controls: {
    backgroundColor: '#f2f2f7',
    paddingVertical: 12,
  },
  pickerContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 0,
    marginHorizontal: 16,
  },
  menuButton: {
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d1d6',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButtonText: {
    fontSize: 16,
    color: '#1c1c1e'
  },
  menuArrow: {
    fontSize: 20,
    color: '#8e8e93',
  }
});

// add gap between items
const ItemSeparator = () => <View style={styles.separator} />;

const OrderSelector = ({ selected, setSelected }) => {
  const [visible, setVisible] = useState(false);

  const options = [
    { label: 'Latest', value: 'latest' },
    { label: 'Highest rated repositories', value: 'highest' },
    { label: 'Lowest rated repositories', value: 'lowest' },
  ];

  const selectedLabel = options.find(
    (option) => option.value === selected
  )?.label;

  return (
    <View style={styles.pickerContainer}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Pressable style={styles.menuButton} onPress={() => setVisible(true)}>
            <Text style={styles.menuButtonText}>
              {selectedLabel}
            </Text>
            <Text style={styles.menuArrow}>⌄</Text>
          </Pressable>
        }
      >
        {options.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => {
              setSelected(option.value);
              setVisible(false);
            }}
            title={option.label}
          />
        ))}
      </Menu>
    </View>
  ) 
}

const SearchBarComponent = ({searchQuery, setSearchQuery}) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchBar}
      inputStyle={{ fontSize: 16 }}
      iconColor="#8e8e93"
    />
  );
}
 
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
        <View style={styles.controls}>
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
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
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