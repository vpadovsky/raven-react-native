import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, Link } from 'expo-router';
import { fetchPost, fetchComments, fetchUser } from '../services/api';

export default function PostScreen() {
    const { id } = useLocalSearchParams();
    const postId = Number(id);

    const { data: post, isLoading: postLoading } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPost(postId)
    });

    const { data: comments, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId)
    });

    const { data: user } = useQuery({
        queryKey: ['user', post?.userId],
        queryFn: () => fetchUser(post!.userId),
        enabled: !!post
    });

    if (postLoading || commentsLoading) return <Text>Loading...</Text>;
    if (!post) return <Text>Post not found</Text>;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            {user && (
                <Link href={`/user/${user.id}`} asChild>
                    <TouchableOpacity>
                        <Text style={styles.author}>By: {user.name}</Text>
                    </TouchableOpacity>
                </Link>
            )}
            <Text style={styles.body}>{post.body}</Text>

            <Text style={styles.commentsTitle}>Comments:</Text>
            {comments?.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                    <Text style={styles.commentEmail}>{comment.email}</Text>
                    <Text>{comment.body}</Text>
                </View>
            ))}
        </ScrollView>
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
        marginBottom: 8
    },
    author: {
        color: 'blue',
        marginBottom: 16
    },
    body: {
        fontSize: 16,
        marginBottom: 24
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16
    },
    comment: {
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8
    },
    commentEmail: {
        fontWeight: 'bold',
        marginBottom: 4
    }
});
