export interface TextPreset {
  id: string;
  title: string;
  content: string;
}

export const TEXT_PRESETS_RU: TextPreset[] = [
  {
    id: 'simple',
    title: 'Детская сказка',
    content: `Жил-был старик со старухой. У самого синего моря. Они жили в ветхой землянке ровно тридцать лет и три года. Старик ловил неводом рыбу, старуха пряла свою пряжу.`
  },
  {
    id: 'news',
    title: 'Новости',
    content: `Сегодня в Тбилиси ожидается солнечная погода. Температура воздуха прогреется до двадцати пяти градусов. Вечером возможен небольшой дождь.`
  },
  {
    id: 'culture',
    title: 'О Грузии',
    content: `Грузия — страна с древнейшей культурой и историей. Грузинское письмо является одним из 14 живых алфавитов мира. Тбилиси был основан в 5 веке царем Вахтангом Горгасали.`
  },
  {
    id: 'pangram',
    title: 'Панграмма',
    content: `В чащах юга жил бы цитрус? Да, но фальшивый экземпляр! Съешь же ещё этих мягких французских булок, да выпей чаю.`
  }
];

export const TEXT_PRESETS_EN: TextPreset[] = [
  {
    id: 'simple',
    title: "Children's Story",
    content: `Once upon a time there lived an old man and an old woman. By the very blue sea. They lived in a dilapidated dugout for exactly thirty years and three years. The old man caught fish with a seine, the old woman spun her yarn.`
  },
  {
    id: 'news',
    title: 'News Snippet',
    content: `Sunny weather is expected in Tbilisi today. The air temperature will warm up to twenty-five degrees. Light rain is possible in the evening.`
  },
  {
    id: 'culture',
    title: 'About Georgia',
    content: `Georgia is a country with an ancient culture and history. The Georgian script is one of the 14 living alphabets of the world. Tbilisi was founded in the 5th century by King Vakhtang Gorgasali.`
  },
  {
    id: 'pangram',
    title: 'Pangram',
    content: `The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.`
  }
];

// Default to RU for backward compat if needed, but App should select
export const TEXT_PRESETS = TEXT_PRESETS_RU;
