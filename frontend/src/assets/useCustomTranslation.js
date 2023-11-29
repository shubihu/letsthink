import { useTranslation } from 'react-i18next';

export function useCustomTranslation() {
  const [t, i18n] = useTranslation();

  const toggleI18n = () => {
    const locale = i18n.language === "zh-CN" ? "en-US" : "zh-CN";
    i18n.changeLanguage(locale);
  };

  return { t, toggleI18n };
}
