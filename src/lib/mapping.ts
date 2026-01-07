export const RU_TO_GE: Record<string, string> = {
  // Vowels
  'а': 'ა', 'е': 'ე', 'ё': 'ე', 'и': 'ი', 'о': 'ო', 'у': 'უ', 'э': 'ე', 'ы': 'ი',
  
  // Consonants (Simple/Direct)
  'б': 'ბ', 'г': 'გ', 'д': 'დ', 'з': 'ზ', 'к': 'კ', 'л': 'ლ', 
  'м': 'მ', 'н': 'ნ', 'п': 'პ', 'р': 'რ', 'с': 'ს', 'т': 'ტ', 
  'ф': 'ფ', 'х': 'ხ', 'ц': 'ც', 'ч': 'ჩ', 'ш': 'შ', 
  
  // Complex/Approximations (Smart Transliteration)
  'щ': 'შჩ', // shch
  'й': 'ი',  // y -> i
  'ъ': '',   // Hard sign - silent
  'ь': '',   // Soft sign - silent
  'ю': 'იუ', // yu
  'я': 'ია', // ya
  'ж': 'ჟ',  // zh
  'в': 'ვ',
};

export const EN_TO_GE: Record<string, string> = {
  // Vowels
  'a': 'ა', 'e': 'ე', 'i': 'ი', 'o': 'ო', 'u': 'უ',
  
  // Consonants
  'b': 'ბ', 'g': 'გ', 'd': 'დ', 'z': 'ზ', 'k': 'კ', 'l': 'ლ',
  'm': 'მ', 'n': 'ნ', 'p': 'პ', 'r': 'რ', 's': 'ს', 't': 'ტ',
  'f': 'ფ', 'h': 'ჰ', 'c': 'ც', 'j': 'ჯ', 'v': 'ვ', 'w': 'ვ',
  'x': 'ხ', 'y': 'ი', 'q': 'ქ',
  
  // No direct single char mapping for some, but close enough for training
};

export const ALL_TO_GE = { ...RU_TO_GE, ...EN_TO_GE };

interface GeorgianCharData {
  transcription: string;
  ruExamples: string[];
  enExamples: string[];
  note?: {
    en: string;
    ru: string;
  };
}

export const GEORGIAN_ALPHABET_DATA: Record<string, GeorgianCharData> = {
  'ა': { transcription: 'a', ruExamples: ['а'], enExamples: ['a'] },
  'ბ': { transcription: 'b', ruExamples: ['б'], enExamples: ['b'] },
  'გ': { transcription: 'g', ruExamples: ['г'], enExamples: ['g'] },
  'დ': { transcription: 'd', ruExamples: ['д'], enExamples: ['d'] },
  'ე': { transcription: 'e', ruExamples: ['е', 'э', 'ё'], enExamples: ['e'] },
  'ვ': { transcription: 'v', ruExamples: ['в'], enExamples: ['v', 'w'] },
  'ზ': { transcription: 'z', ruExamples: ['з'], enExamples: ['z'] },
  'თ': { transcription: 't', ruExamples: ['т (с придыханием)'], enExamples: ['t'], note: { en: 'Aspirated', ru: 'С придыханием' } },
  'ი': { transcription: 'i', ruExamples: ['и', 'й', 'ы'], enExamples: ['i', 'y'] },
  'კ': { transcription: "k'", ruExamples: ['к (резкий)'], enExamples: ['k (hard)'], note: { en: 'Ejective', ru: 'Абруптивный (резкий)' } },
  'ლ': { transcription: 'l', ruExamples: ['л'], enExamples: ['l'] },
  'მ': { transcription: 'm', ruExamples: ['м'], enExamples: ['m'] },
  'ნ': { transcription: 'n', ruExamples: ['н'], enExamples: ['n'] },
  'ო': { transcription: 'o', ruExamples: ['о'], enExamples: ['o'] },
  'პ': { transcription: "p'", ruExamples: ['п (резкий)'], enExamples: ['p (hard)'], note: { en: 'Ejective', ru: 'Абруптивный (резкий)' } },
  'ჟ': { transcription: 'zh', ruExamples: ['ж'], enExamples: ['zh', 'j (soft)'] },
  'რ': { transcription: 'r', ruExamples: ['р'], enExamples: ['r'] },
  'ს': { transcription: 's', ruExamples: ['с'], enExamples: ['s'] },
  'ტ': { transcription: "t'", ruExamples: ['т (резкий)'], enExamples: ['t (hard)'], note: { en: 'Ejective', ru: 'Абруптивный (резкий)' } },
  'უ': { transcription: 'u', ruExamples: ['у'], enExamples: ['u'] },
  'ფ': { transcription: 'p', ruExamples: ['п (с придыханием)'], enExamples: ['p', 'f'], note: { en: 'Aspirated', ru: 'С придыханием' } },
  'ქ': { transcription: 'k', ruExamples: ['к (с придыханием)'], enExamples: ['k', 'q'], note: { en: 'Aspirated', ru: 'С придыханием' } },
  'ღ': { transcription: 'gh', ruExamples: ['г (украинское)'], enExamples: ['gh'], note: { en: 'Voiced velar fricative', ru: 'Звонкий велярный спирант (как г в слове ага)' } },
  'ყ': { transcription: "q'", ruExamples: ['к (горловой)'], enExamples: ['q (back k)'], note: { en: 'Uvular ejective', ru: 'Горловой абруптивный' } },
  'შ': { transcription: 'sh', ruExamples: ['ш', 'щ'], enExamples: ['sh'] },
  'ჩ': { transcription: 'ch', ruExamples: ['ч (с придыханием)'], enExamples: ['ch'], note: { en: 'Aspirated', ru: 'С придыханием' } },
  'ც': { transcription: 'ts', ruExamples: ['ц (с придыханием)'], enExamples: ['ts', 'c'], note: { en: 'Aspirated', ru: 'С придыханием' } },
  'ძ': { transcription: 'dz', ruExamples: ['дз'], enExamples: ['dz'] },
  'წ': { transcription: "ts'", ruExamples: ['ц (резкий)'], enExamples: ['ts (hard)'], note: { en: 'Ejective', ru: 'Абруптивный (резкий)' } },
  'ჭ': { transcription: "ch'", ruExamples: ['ч (резкий)'], enExamples: ['ch (hard)'], note: { en: 'Ejective', ru: 'Абруптивный (резкий)' } },
  'ხ': { transcription: 'kh', ruExamples: ['х'], enExamples: ['kh', 'x'] },
  'ჯ': { transcription: 'j', ruExamples: ['дж'], enExamples: ['j'] },
  'ჰ': { transcription: 'h', ruExamples: ['х (легкий)', 'г (английский)'], enExamples: ['h'] },
  
  // Complex mappings (Digraphs formed by single Russian letters)
  'შჩ': { transcription: 'shch', ruExamples: ['щ'], enExamples: ['shch'], note: { en: 'Combination (sh + ch)', ru: 'Сочетание (ш + ч)' } },
  'იუ': { transcription: 'yu', ruExamples: ['ю'], enExamples: ['yu'], note: { en: 'Combination (i + u)', ru: 'Сочетание (и + у)' } },
  'ია': { transcription: 'ya', ruExamples: ['я'], enExamples: ['ya'], note: { en: 'Combination (i + a)', ru: 'Сочетание (и + а)' } },
};

export enum LetterGroup {
  Vowels = 'Vowels',
  Sonorants = 'Sonorants', // m, n, l, r
  EasyConsonants = 'Easy Consonants', // b, d, g, z, v, s
  Hushing = 'Hushing', // sh, zh, ch
  Ejectives = 'Ejectives', // k', p', t', ts', ch' (The "hard" sounds)
  Complex = 'Complex/Diphthongs', // ya, yu, shch
}

export const GROUP_MAPPING_RU: Record<LetterGroup, string[]> = {
  [LetterGroup.Vowels]: ['а', 'е', 'и', 'о', 'у', 'э', 'ы'],
  [LetterGroup.Sonorants]: ['м', 'н', 'л', 'р', 'й'],
  [LetterGroup.EasyConsonants]: ['б', 'г', 'д', 'з', 'в', 'с'],
  [LetterGroup.Hushing]: ['ж', 'ш', 'ч', 'щ'],
  [LetterGroup.Ejectives]: ['к', 'п', 'т', 'ц'], 
  [LetterGroup.Complex]: ['ю', 'я', 'ф', 'х'],
};

export const GROUP_MAPPING_EN: Record<LetterGroup, string[]> = {
  [LetterGroup.Vowels]: ['a', 'e', 'i', 'o', 'u'],
  [LetterGroup.Sonorants]: ['m', 'n', 'l', 'r', 'y'],
  [LetterGroup.EasyConsonants]: ['b', 'd', 'g', 'z', 'v', 's', 'w'],
  [LetterGroup.Hushing]: ['j'], // English doesn't have single char sh, ch, zh usually, but j is close
  [LetterGroup.Ejectives]: ['k', 'p', 't', 'c', 'q'],
  [LetterGroup.Complex]: ['f', 'h', 'x'],
};

export interface TransliterationResult {
  text: string;     // The original text (for tooltip)
  rendered: string; // The Georgian char (if replaced)
  isReplaced: boolean;
}

export const LEARNING_ORDER_RU = [
  // Stage 1: Basic Vowels & Sonorants
  'а', 'о', 'и', 'е', 'м', 'н', 'л', 'р', 'в',
  
  // Stage 2: Common Consonants
  'с', 'т', 'к', 'п', 'д', 'г', 'б', 'з',
  
  // Stage 3: Remaining Vowels
  'у', 'ы', 'э',
  
  // Stage 4: Complex/Hushing
  'ш', 'ч', 'ж', 'ц', 'х', 'ф',
  
  // Stage 5: Diphthongs & Special
  'я', 'ю', 'ё', 'щ', 'й'
];

export const LEARNING_ORDER_EN = [
  // Stage 1: Basic Vowels & Sonorants
  'a', 'o', 'i', 'e', 'm', 'n', 'l', 'r', 'v',
  
  // Stage 2: Common Consonants
  's', 't', 'k', 'p', 'd', 'g', 'b', 'z',
  
  // Stage 3: Remaining Vowels
  'u',
  
  // Stage 4: Complex/Hushing/Other
  'c', 'j', 'h', 'f', 'w',
  
  // Stage 5: Special
  'y', 'x', 'q'
];

// Alias for backward compatibility if needed, but we should use specific ones
export const LEARNING_ORDER = LEARNING_ORDER_RU;
export const GROUP_MAPPING = GROUP_MAPPING_RU;

export const transliterate = (
  input: string, 
  activeLetters: Set<string>
): TransliterationResult[] => {
  const result: TransliterationResult[] = [];
  
  for (const char of input) {
    const lowerChar = char.toLowerCase();
    
    // Check if we should replace this character
    if (Object.prototype.hasOwnProperty.call(ALL_TO_GE, lowerChar) && activeLetters.has(lowerChar)) {
      result.push({
        text: char,
        rendered: ALL_TO_GE[lowerChar as keyof typeof ALL_TO_GE],
        isReplaced: true
      });
    } else {
      result.push({
        text: char,
        rendered: char,
        isReplaced: false
      });
    }
  }
  
  return result;
};

export const getCharDetails = (georgianChar: string): GeorgianCharData | undefined => {
  return GEORGIAN_ALPHABET_DATA[georgianChar];
};

export const getSourceLetters = (georgianChar: string, isRu: boolean): string[] => {
  const details = GEORGIAN_ALPHABET_DATA[georgianChar];
  if (!details) return [];
  return isRu ? details.ruExamples : details.enExamples;
};
