enum LanguageCode {
  none = "none",
  en = "us",
  pt = "br",
}

const LanguageCodeReference = {
  [LanguageCode.en]: "English",
  [LanguageCode.pt]: "Portuguese",
  [LanguageCode.none]: "Wordlink",
};

enum Language {
  WordLink = "WordLink",
  English = "English",
  Portuguese = "Portuguese",
}

export { Language, LanguageCode, LanguageCodeReference };
