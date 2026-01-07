import { Github } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"

export function Header() {
  const { t } = useTranslation()
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex min-h-14 h-auto items-center justify-between mx-auto px-4 py-2 max-w-3xl gap-4">
        <div className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="Logo" className="h-6 w-6 shrink-0" />
          <span className="text-lg md:text-xl font-bold tracking-tight leading-tight">
            {t('appTitle')}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/cneltyn-s/georgian"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
