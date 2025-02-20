import { View, FlatList, StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, Link } from 'expo-router';
import { fetchUserPosts, fetchUser } from '../services/api';

export default function UserPostsScreen() {
    const { id } = useLocalSearchParams();
    const userId = Number(id);

    const { data: posts, isLoading: postsLoading } = useQuery({
        queryKey: ['userPosts', userId],
        queryFn: () => fetchUserPosts(userId)
    });

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId)
    });

    if (postsLoading || userLoading) return <Text>Loading...</Text>;
    if (!user || !posts) return <Text>User not found</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Posts by {user.name}</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link href={`/post/${item.id}`} asChild>
                        <TouchableOpacity style={styles.postCard}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text numberOfLines={2}>{item.body}</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    postCard: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#f5f5f5'
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    }
});
