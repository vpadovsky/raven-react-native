import { View, FlatList, StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './services/api';
import { Link } from 'expo-router';
import Header from './components/Header';
import { capitalizeText } from "@/app/utils/text";

function PostsList() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    if (isLoading) return (
        <View style={styles.container}>
            <Header title="Blog Posts" showBack={false} />
            <Text>Loading...</Text>
        </View>
    );
    if (error) return (
        <View style={styles.container}>
            <Header title="Blog Posts" showBack={false} />
            <Text>Error loading posts</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Blog Posts" showBack={false} />
            <FlatList
                style={styles.content}
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link href={`/post/${item.id}`} asChild>
                        <TouchableOpacity style={styles.postCard}>
                            <Text style={styles.postTitle}>{capitalizeText(item.title)}</Text>
                            <Text numberOfLines={2}>{capitalizeText(item.body)}</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

export default function PostsScreen() {
    return <PostsList />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#1a1a1a',
        letterSpacing: 0.5
    },
    postCard: {
        padding: 18,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#eaeaea'
    },
    postTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color: '#2c3e50',
        lineHeight: 24
    }
});
