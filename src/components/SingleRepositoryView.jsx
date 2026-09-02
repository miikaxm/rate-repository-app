import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const RepositoryView = () => {
  const { id } = useParams();

  const { repositories } = useRepositories({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });

  const repository = repositories?.edges.find(
    (edge) => edge.node.id === id
  )?.node;

  if (!repository) {
    return null;
  }

  return (
    <RepositoryItem
      item={repository}
      showGitHubButton
    />
  );
};

export default RepositoryView;