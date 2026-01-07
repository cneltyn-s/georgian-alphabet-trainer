# PRD: Phase 1 - Core Logic & Data Structures

## 1. Objective
Develop the TypeScript logic for mapping Russian characters to Georgian script, supporting both direct mapping and phonetic grouping.

## 2. Data Structures (`src/lib/mapping.ts`)

### 2.1. The Master Map
A constant object defining the relationship between Russian lowercase characters and Georgian counterparts.
*Note: Upper case Russian letters should be treated as lowercase for mapping, as Georgian has no capital letters.*

```typescript
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
```

### 2.2. Phonetic Groups
Organize letters into logical learning stages.

```typescript
export enum LetterGroup {
  Vowels = 'Vowels',
  Sonorants = 'Sonorants', // m, n, l, r
  EasyConsonants = 'Easy Consonants', // b, d, g, z, v, s
  Hushing = 'Hushing', // sh, zh, ch
  Ejectives = 'Ejectives', // k', p', t', ts', ch' (The "hard" sounds)
  Complex = 'Complex/Diphthongs', // ya, yu, shch
}

export const GROUP_MAPPING: Record<LetterGroup, string[]> = {
  [LetterGroup.Vowels]: ['а', 'е', 'и', 'о', 'у', 'э', 'ы'],
  [LetterGroup.Sonorants]: ['м', 'н', 'л', 'р', 'й'],
  [LetterGroup.EasyConsonants]: ['б', 'г', 'д', 'з', 'в', 'с'],
  [LetterGroup.Hushing]: ['ж', 'ш', 'ч', 'щ'],
  [LetterGroup.Ejectives]: ['к', 'п', 'т', 'ц'], // Mapping to Georgian ejectives/aspirated based on context
  [LetterGroup.Complex]: ['ю', 'я', 'ф', 'х'],
};
```

*Refinement Note:* The grouping logic needs to align with the `RU_TO_GE` map keys.

## 3. Transliteration Engine

### 3.1. Function Signature
```typescript
interface TransliterationResult {
  text: string;     // The original text (for tooltip)
  rendered: string; // The Georgian char (if replaced)
  isReplaced: boolean;
}

export const transliterate = (
  input: string, 
  activeLetters: Set<string>
): TransliterationResult[] => { ... }
```

### 3.2. Logic
1.  Iterate through the input string.
2.  Normalize char to lowercase for lookup.
3.  Check if char exists in `activeLetters`.
4.  If yes -> look up `RU_TO_GE`.
    *   If mapping exists, return `{ text: char, rendered: mapping, isReplaced: true }`.
5.  If no -> return `{ text: char, rendered: char, isReplaced: false }`.

## 4. Acceptance Criteria
- [ ] Unit tests verify that 'Мама' becomes 'მaმa' (if only 'м' is active).
- [ ] Unit tests verify that 'Яблоко' becomes 'იაблоко' (if 'я' is active).
- [ ] Edge cases: Uppercase letters are handled correctly (converted to Georgian lowercase equivalent).
- [ ] Punctuation and spaces remain untouched.
