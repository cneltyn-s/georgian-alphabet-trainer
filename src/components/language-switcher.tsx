import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language;
  const getValue = (lang: string) => {
    if (lang.startsWith('ru')) return 'ru';
    return 'en';
  };

  return (
    <Select value={getValue(currentLang)} onValueChange={(value) => i18n.changeLanguage(value)}>
      <SelectTrigger className="w-17.5 px-2 h-9">
        <SelectValue placeholder="En" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">En</SelectItem>
        <SelectItem value="ru">Ru</SelectItem>
      </SelectContent>
    </Select>
  );
}
