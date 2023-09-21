import WordLinkType from "../enums/word-link-type.enums";
import EWordRelation from "../enums/word-relation-type.enums";
import EWordType from "../enums/word-type.enums";

type TWord = {
  id: number;
  word: string;
  state: WordLinkType;
  type: EWordType;
  relation: EWordRelation;
  description: string[];
};

export default TWord;
