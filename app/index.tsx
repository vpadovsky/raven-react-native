import { View, FlatList, StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { fetchPosts } from './services/api';
import { Link } from 'expo-router';

const queryClient = new QueryClient();

function PostsList() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading posts</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Blog Posts</Text>
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

export default function PostsScreen() {
    return (
        <QueryClientProvider client={queryClient}>
            <PostsList />
        </QueryClientProvider>
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
