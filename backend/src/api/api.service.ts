import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';
const google = require('googlethis');

const TEST_TEXT = "The Guggenheim, short for the Solomon R. Guggenheim museum, is a very famous art museum located at Fifth Avenue in New York City, and is very much known for its collection of impressionist, post-impressionist, modern, and contemporary art, which continues to grow with time. One of the museum’s current exhibitions, titled “Artistic License,” features the curated works for six curated artists and runs from  May 24 2019 January 12th 2020.";

const EXTRACT_KEYWORDS_TEXT = "Generate search questions for google from this text: \n\n"

@Injectable()
export class ApiService {

    constructor(@Inject('OPENAI_CLIENT') private openaiClient: OpenAIApi, private httpService: HttpService) { }

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
        const options = {
            page: 0,
            safe: false, // hide explicit results?
            additional_params: {
                // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
                hl: 'en'
            }
        }
        const response = await google.search(parsedKeywords[0], options);
        console.log(response);
        console.log(parsedKeywords)
        // const res = this.httpService.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyAP7YO6G7H7XsZ7K1NPaHxxzetufWyHidg&cx=91d7ea47b9d6d55fa&q=What%20type%20of%20art%20does%20the%20Guggenheim%20have%20in%20its%20collection%3F');
        // res.subscribe((observer) => {
        //     console.log(observer.data.items);
        // })
        // console.log("RESULT: ", result.data.choices[0].text)
        return [];
    }

}
