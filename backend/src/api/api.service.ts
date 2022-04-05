import { Inject, Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';

const TEST_TEXT = "The Guggenheim, short for the Solomon R. Guggenheim museum, is a very famous art museum located at Fifth Avenue in New York City, and is very much known for its collection of impressionist, post-impressionist, modern, and contemporary art, which continues to grow with time. One of the museum’s current exhibitions, titled “Artistic License,” features the curated works for six curated artists and runs from  May 24 2019 January 12th 2020.";

const EXTRACT_KEYWORDS_TEXT = "Generate search questions for google from this text: \n\n"

@Injectable()
export class ApiService {

    constructor(@Inject('OPENAI_CLIENT') private openaiClient: OpenAIApi) { }

    async generateKeywords(textToCheck: string): Promise<string[]> {
        const result = await this.openaiClient.createCompletion('text-ada-001', {
            prompt: EXTRACT_KEYWORDS_TEXT + TEST_TEXT,
            temperature: 0.3,
            max_tokens: 70,
            top_p: 1.0,
            frequency_penalty: 0.8,
            presence_penalty: 0.0
        }, { headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` } })
        // .then((val) => console.log("RESULT: ", val.data.choices[0].text))
        let generatedKeywords = result.data.choices[0].text.trim().split('\n');
        let parsedKeywords = [];
        generatedKeywords.forEach((keyword) => {
            let match = keyword.match('(?!^\\d.)(?!\\.).*');
            match.forEach((val) => parsedKeywords.push(val.trim()));
        })
        console.log(parsedKeywords)
        // console.log("RESULT: ", result.data.choices[0].text)
        return [];
    }

}
