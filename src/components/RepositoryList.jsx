import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router-native";
import { useState } from 'react';
import { Searchbar, Menu, Button } from 'react-native-paper';
import { useDebounce } from 'use-debounce'


const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
  },

  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },

  searchBar: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
  },

  searchInput: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 0,
  },

  orderSelector: {
    marginHorizontal: 16,
    marginBottom: 8,
  },

  selector: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectorText: {
    fontSize: 16,
    color: '#1C1C1E',
  },

  selectorArrow: {
    fontSize: 18,
    color: '#8E8E93',
    marginLeft: 8,
  },

  separator: {
    height: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderSelector = ({ selected, setSelected }) => {
  const [visible, setVisible] = useState(false);

  const options = {
    latest: 'Latest repositories',
    highest: 'Highest rated repositories',
    lowest: 'Lowest rated repositories',
  };

  const handleSelect = (value) => {
    setSelected(value);
    setVisible(false);
  };

  return (
    <View style={styles.orderSelector}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Pressable
            style={styles.selector}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.selectorText}>
              {options[selected]}
            </Text>
          </Pressable>
        }
      >
        <Menu.Item
          onPress={() => handleSelect('latest')}
          title="Latest repositories"
        />

        <Menu.Item
          onPress={() => handleSelect('highest')}
          title="Highest rated repositories"
        />

        <Menu.Item
          onPress={() => handleSelect('lowest')}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

const SearchBarComponent = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder="Search repositories"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        contentStyle={{ height: 48 }}
        placeholderTextColor="#8E8E93"
        iconColor="#8E8E93"
      />
    </View>
  );
};
 
export const RepositoryListContainer = ({ repositories, selected, setSelected, searchQuery, setSearchQuery }) => {
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
        <View style={styles.header}>
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
      renderItem={({ item }) => (
        <Pressable onPress={() => repoView(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
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

  const { repositories } = useRepositories({
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
    />
  );
};

export default RepositoryList;