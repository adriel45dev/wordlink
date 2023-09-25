interface Languages {
  [key: string]: string;
}
const CODE_FLAGS: Languages = {
  us: "English",
  br: "Portuguese",
  cn: "Chinese",
  es: "Spanish",
  in: "Hindi",
  jp: "Japanese",
  de: "German",
  fr: "French",
  kr: "Korean",
  ru: "Russian",
  it: "Italian",
  tr: "Turkish",
  ir: "Persian",
};

const CODE_LANGUAGES: Languages = {
  us: "English",
  br: "Portuguese",
  // cn: "Chinese",
  // es: "Spanish",
  // ru: "Russian",
};

const text = `In an increasingly interconnected world, the ability to communicate in different languages is a valuable skill that opens doors to limitless opportunities. It's in this context that the revolutionary platform Wordlink Languages emerges. This innovative platform aims to make language learning accessible, effective, and inspiring for people of all ages and backgrounds.
Wordlink Languages recognizes the importance of linguistic diversity. It offers a wide range of languages, from the most widely spoken, such as English, Spanish, and Mandarin, to lesser-known and regional languages. Users have the freedom to choose which language they want to learn, allowing for a personalized experience tailored to their specific needs and goals.`;

const POST_CARDS = {
  ["1"]: {
    title: "A Peaceful Sunday Morning",
    text: `It was a sunny Sunday morning. John woke up early and decided to go for a walk in the park. There were a few people there already. Some were jogging and others were walking their dogs. John sat down on a bench and watched the ducks swimming in the pond. It was so peaceful to be out in nature. John felt happy to have this time to relax before the busy week ahead. After an hour, he got up and walked back home, ready to start the day.`,
    author: "wordlink",
    tag: "morning",
    id: "1",
    image:
      "https://images.unsplash.com/photo-1655367381756-bc4ce70153bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  },
};

export { CODE_FLAGS, CODE_LANGUAGES, text, POST_CARDS };

// https://www.bing.com/translator?from=en&to=pt&text=world
// https://www.deepl.com/en/translator#pt/en/ol%C3%A1%0A
// https://translate.google.com/?from=en&to=pt&text=world
// https://www.linguee.com/english-portuguese/search?source=auto&query=hi
// https://translate.yandex.com/en/?source_lang=en&target_lang=pt-BR&text=hi
// https://www.reverso.net/text-translation#sl=eng&tl=por&text=hi
