'use server';

/**
 * @fileOverview A flow to convert a text script into speech using multiple voices.
 *
 * - textToSpeech - A function that converts a script to a base64-encoded WAV audio file.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';
import wav from 'wav';

// Define the input schema for the TTS flow
const TextToSpeechInputSchema = z.object({
  script: z.string().describe('The script to be converted to speech. It should use speaker labels like "Speaker1:" and "Speaker2:" to denote different voices.'),
});

export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

// Define the output schema for the TTS flow
const TextToSpeechOutputSchema = z.object({
    audioDataUri: z.string().describe("The generated audio as a data URI in WAV format. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});

export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;


/**
 * Converts a given script into spoken audio using two distinct voices.
 * @param {TextToSpeechInput} input - The input containing the script to convert.
 * @returns {Promise<TextToSpeechOutput>} A promise that resolves to the generated audio data URI.
 */
export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
    return textToSpeechFlow(input);
}


const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async ({script}) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              {
                speaker: 'Speaker1', // The narrator
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Algenib' },
                },
              },
              {
                speaker: 'Speaker2', // The source/commentator
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Achernar' },
                },
              },
            ],
          },
        },
      },
      prompt: script,
    });
    if (!media) {
      throw new Error('no media returned from TTS model');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavData = await toWav(audioBuffer);

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavData,
    };
  }
);

/**
 * Converts raw PCM audio data into a base64-encoded WAV format.
 * @param pcmData The raw PCM audio buffer from the model.
 * @returns A promise that resolves to the base64-encoded WAV string.
 */
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (chunk) => {
      bufs.push(chunk);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
