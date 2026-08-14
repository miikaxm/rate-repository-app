import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from './Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  top: {
    flexDirection: 'row',
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: '#666',
    marginTop: 8,
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    alignSelf: 'flex-start',
    padding: 8,
    marginTop: 16,
    borderRadius: 4,
    fontSize: 18,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return count;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.avatar}
          source={{ uri: item.ownerAvatarUrl }}
        />

        <View style={styles.info}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>


      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{formatCount(item.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>{formatCount(item.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>{formatCount(item.reviewCount)}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>{formatCount(item.ratingAverage)}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;