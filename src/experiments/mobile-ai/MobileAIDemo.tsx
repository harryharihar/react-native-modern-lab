import React, { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import {streamAI} from '../../services/ai/AIService';

export default function MobileAIDemo() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAskAI = async () => {
        const trimmedPrompt = prompt.trim();

        if (!trimmedPrompt || loading) {
          return;
        }

        setLoading(true);
        setResponse('');
        setError('');

        try {
          await streamAI(trimmedPrompt, chunk => {
            setResponse(current => current + chunk);
          });
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to connect to the AI service.';

          setError(message);
        } finally {
          setLoading(false);
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled">
                <View style={styles.content}>
                    <Text style={styles.title}>Mobile AI</Text>

                    <Text style={styles.subtitle}>
                        Experiment 14 — LLM Integration
                    </Text>

                    <Text style={styles.description}>
                        Send a prompt from React Native to an AI service and display the
                        generated response.
                    </Text>

                    <TextInput
                        value={prompt}
                        onChangeText={setPrompt}
                        placeholder="Ask something..."
                        multiline
                        style={styles.input}
                        editable={!loading}
                    />

                    <Pressable
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleAskAI}
                        disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Ask AI</Text>
                        )}
                    </Pressable>

                    {error.length > 0 && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorTitle}>Error</Text>
                            <Text style={styles.error}>{error}</Text>
                        </View>
                    )}

                    {response.length > 0 && (
                        <View style={styles.responseContainer}>
                            <Text style={styles.responseTitle}>AI Response</Text>

                            <Text style={styles.response}>{response}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollContent: {
        padding: 24,
    },

    content: {
        width: '100%',
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },

    input: {
        minHeight: 120,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        textAlignVertical: 'top',
        marginBottom: 16,
    },

    button: {
        minHeight: 52,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111111',
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '600',
    },

    errorContainer: {
        marginTop: 24,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#ffe5e5',
    },

    errorTitle: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 8,
    },

    error: {
        fontSize: 15,
        lineHeight: 22,
    },

    responseContainer: {
        marginTop: 24,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#f2f2f2',
    },

    responseTitle: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 8,
    },

    response: {
        fontSize: 16,
        lineHeight: 24,
    },
});
