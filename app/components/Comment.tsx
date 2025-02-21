import { StyleSheet, Text, View } from "react-native";
import { IComment } from "../types/blog";

export default function Comment(comment: IComment) {
    const {email, body} = comment;
    return (
        <View style={styles.comment}>
            <Text style={styles.commentEmail}>{email}</Text>
            <Text>{body}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    comment: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#eaeaea'
    },
    commentEmail: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#666',
        letterSpacing: 0.2
    }
});
