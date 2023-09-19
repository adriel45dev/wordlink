const RegSymbols =
  /[\(\)\[\]\{\}\<\>\’\:\,\‒\–\—\―\…\!\.\«\»\?\;\/\␠\·\&\@\*\\\•\^\¤\¢\$\€\£\¥\₩\₪\†\‡\°\¡\¿\¬\#\№\%\‰\‱\¶\′\§\~\¨\_\|\¦\⁂\☞\∴\‽\※\¹\²\³\+\"]/g;

const RegExtraSpaces = /\s\s+/g;
const RegHyphensClean = /(?<!\S)-|\-(?!\S)/g;
const DefSymbolsEdge =
  /[-!$%^&*()_+|~=`{}\[\]:";'<>,.\/?\#@‒–—―‹›«»\s\-\/\\_\\.\\+\|\}]/g;
const RegSymbolsEdge = new RegExp(
  `(?<!\\S)(${DefSymbolsEdge.source})|(${DefSymbolsEdge.source})(?!\\S)`,
  "g"
);

const RegDuplicatedSymbols =
  /^([-!$%^&*()_+|~=`{}\[\]:";'<>,.\/?#@‒–—―‹›«»\\s]+)|([-!$%^&*()_+|~=`{}\[\]:";'<>,.\/?#@‒–—―‹›«»\\s]+)$/g;

const RegNumbers = /[0-9]/g;

export {
  RegSymbols,
  RegExtraSpaces,
  RegHyphensClean,
  RegSymbolsEdge,
  RegDuplicatedSymbols,
  RegNumbers,
};
