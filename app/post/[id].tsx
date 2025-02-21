import { ScrollView, StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, Link } from 'expo-router';
import { fetchPost, fetchComments, fetchUser } from '../services/api';
import Comment from "@/app/components/Comment";
import { capitalizeText } from "@/app/utils/text";

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
            <Text style={styles.title}>{capitalizeText(post.title)}</Text>
            {user && (
                <Link href={`/user/${user.id}`} asChild>
                    <TouchableOpacity>
                        <Text style={styles.author}>By: {user.name}</Text>
                    </TouchableOpacity>
                </Link>
            )}
            <Text style={styles.body}>{capitalizeText(post.body)}</Text>
            <Text style={styles.commentsTitle}>Comments:</Text>
            {comments?.map((comment) => {
                return <Comment {...comment}/>
            })}
        </ScrollView>
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
        marginBottom: 12,
        color: '#2c3e50',
        letterSpacing: 0.5
    },
    author: {
        fontSize: 16,
        color: '#3498db',
        marginBottom: 20,
        textDecorationLine: 'underline'
    },
    body: {
        fontSize: 17,
        lineHeight: 24,
        color: '#34495e',
        marginBottom: 32
    },
    commentsTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        color: '#2c3e50',
        letterSpacing: 0.3
    },
});
