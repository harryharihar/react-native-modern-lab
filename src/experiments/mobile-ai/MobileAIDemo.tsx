import React, {
    Fragment,
    useEffect,
    useRef,
    useState,
  } from 'react';
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
  import {
    useMarkdown,
    type useMarkdownHookOptions,
  } from 'react-native-marked';

  import {streamAI} from '../../services/ai/AIService';

  const STREAM_UPDATE_INTERVAL = 80;

  export default function MobileAIDemo() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /*
     * Chunks can arrive extremely quickly.
     *
     * Instead of updating React state for every tiny chunk,
     * we temporarily buffer them and update the UI every
     * ~80ms.
     */
    const responseBufferRef = useRef('');
    const streamTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /*
     * Parse the current Markdown response into native
     * React Native elements.
     */
    const markdownOptions: useMarkdownHookOptions = {};

    const markdownElements = useMarkdown(
      response,
      markdownOptions,
    );

    /*
     * Flush buffered chunks into React state.
     */
    const flushResponseBuffer = () => {
      if (!responseBufferRef.current) {
        return;
      }

      const bufferedResponse = responseBufferRef.current;

      responseBufferRef.current = '';

      setResponse(current => current + bufferedResponse);
    };

    /*
     * Schedule one UI update.
     */
    const scheduleResponseUpdate = () => {
      if (streamTimerRef.current !== null) {
        return;
      }

      streamTimerRef.current = setTimeout(() => {
        streamTimerRef.current = null;

        flushResponseBuffer();
      }, STREAM_UPDATE_INTERVAL);
    };

    /*
     * Clean up any pending timer when the component unmounts.
     */
    useEffect(() => {
      return () => {
        if (streamTimerRef.current !== null) {
          clearTimeout(streamTimerRef.current);
        }
      };
    }, []);

    const handleAskAI = async () => {
      const trimmedPrompt = prompt.trim();

      if (!trimmedPrompt || loading) {
        return;
      }

      /*
       * Clear any previous stream state.
       */
      if (streamTimerRef.current !== null) {
        clearTimeout(streamTimerRef.current);
        streamTimerRef.current = null;
      }

      responseBufferRef.current = '';

      setLoading(true);
      setResponse('');
      setError('');

      try {
        await streamAI(trimmedPrompt, chunk => {
          /*
           * Receive tiny chunks from XMLHttpRequest.
           */
          responseBufferRef.current += chunk;

          /*
           * Update the UI approximately every 80ms
           * instead of once for every network chunk.
           */
          scheduleResponseUpdate();
        });

        /*
         * Make sure the final buffered text is rendered.
         */
        if (streamTimerRef.current !== null) {
          clearTimeout(streamTimerRef.current);
          streamTimerRef.current = null;
        }

        flushResponseBuffer();
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Unable to connect to the AI service.';

        setError(message);

        /*
         * Don't leave buffered content waiting after
         * an error.
         */
        if (streamTimerRef.current !== null) {
          clearTimeout(streamTimerRef.current);
          streamTimerRef.current = null;
        }

        flushResponseBuffer();
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
              Send a prompt from React Native to an AI service and
              display the generated response progressively.
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
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
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

                <Text style={styles.error}>
                  {error}
                </Text>
              </View>
            )}

            {response.length > 0 && (
              <View style={styles.responseContainer}>
                <Text style={styles.responseTitle}>
                  AI Response
                </Text>

                <View style={styles.markdownContainer}>
                  {markdownElements.map((element, index) => (
                    <Fragment key={`markdown-${index}`}>
                      {element}
                    </Fragment>
                  ))}
                </View>

                {loading && (
                  <View style={styles.streamingIndicator}>
                    <View style={styles.streamingDot} />

                    <Text style={styles.streamingText}>
                      Generating response...
                    </Text>
                  </View>
                )}
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
      paddingBottom: 48,
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
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
    },

    markdownContainer: {
      width: '100%',
    },

    streamingIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#dddddd',
    },

    streamingDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: '#111111',
      marginRight: 8,
    },

    streamingText: {
      fontSize: 13,
      color: '#666666',
    },
  });