import { View, FlatList, StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, Link } from 'expo-router';
import { fetchUserPosts, fetchUser } from '../services/api';
import { IPost, IUser } from "@/app/types/blog";
import { capitalizeText } from '../utils/text';

export default function UserPostsScreen() {
    const { id } = useLocalSearchParams();
    const userId = Number(id);

    const { data: posts, isLoading: postsLoading } = useQuery<IPost[]>({
        queryKey: ['userPosts', userId],
        queryFn: () => fetchUserPosts(userId)
    });

    const { data: user, isLoading: userLoading } = useQuery<IUser>({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId)
    });

    if (postsLoading || userLoading) return <Text>Loading...</Text>;
    if (!user || !posts) return <Text>User not found</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Posts by {capitalizeText(user.name)}</Text>
            <FlatList
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa'
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
