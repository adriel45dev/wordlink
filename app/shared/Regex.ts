const RegSymbols =
  /[\(\)\[\]\{\}\<\>\’\:\,\‒\–\—\―\…\!\.\«\»\?\;\/\␠\·\&\@\*\\\•\^\¤\¢\$\€\£\¥\₩\₪\†\‡\°\¡\¿\¬\#\№\%\‰\‱\¶\′\§\~\¨\_\|\¦\⁂\☞\∴\‽\※\¹\²\³\+\"]/g;

const RegExtraSpaces = /\s\s+/g;
const RegHyphensClean = /(?<!\S)-|\-(?!\S)/g;
const DefSymbolsEdge =
  /[-!$%^&*()_+|~=`{}\[\]:";'<>,.\/?\#@‒–—―‹›«»\s\-\/\\_\\.\\+\|\}]/g;
const RegSymbolsEdge = new RegExp(
  `(?<!\\S)(${DefSymbolsEdge.source})|(${DefSymbolsEdge.source})(?!\\S)`,
  "g",
);

const RegDuplicatedSymbols =
  /^([-!$%^&*()_+|~=`{}\[\]:";'<>,.\/?#@‒–—―‹›«»\\s]+)|([-!$%^&*()_+|~=`{}\[\]:";'<>,.\/?#@‒–—―‹›«»\\s]+)$/g;

const RegNumbers = /[0-9]/g;

const RegAnySpaces =
  /[\s\u00A0\u1680​​\u180e\u2000-\u200a​​\u2028\u2029​​\u202f\u205f​​\u3000]/g;

export {
  RegSymbols,
  RegExtraSpaces,
  RegHyphensClean,
  RegSymbolsEdge,
  RegDuplicatedSymbols,
  RegNumbers,
  RegAnySpaces,
};
