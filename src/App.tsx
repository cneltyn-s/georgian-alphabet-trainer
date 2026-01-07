import { useState, useMemo, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { MainContainer } from "@/components/layout/MainContainer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  LetterGroup, 
  transliterate, 
  getSourceLetters,
  getCharDetails,
  LEARNING_ORDER_RU, 
  LEARNING_ORDER_EN,
  GROUP_MAPPING_RU,
  GROUP_MAPPING_EN
} from "@/lib/mapping"
import { TEXT_PRESETS_RU, TEXT_PRESETS_EN } from "@/data/texts"

function App() {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    document.title = t('appTitle');
  }, [t]);
  
  // Determine current language resources
  const isRu = i18n.resolvedLanguage === 'ru' || i18n.language.startsWith('ru');
  const learningOrder = isRu ? LEARNING_ORDER_RU : LEARNING_ORDER_EN;
  const groupMapping = isRu ? GROUP_MAPPING_RU : GROUP_MAPPING_EN;
  const textPresets = isRu ? TEXT_PRESETS_RU : TEXT_PRESETS_EN;

  const [mode, setMode] = useState<'slider' | 'groups'>('slider')
  const [sliderValue, setSliderValue] = useState([0])
  const [selectedGroups, setSelectedGroups] = useState<LetterGroup[]>([])
  const [textSource, setTextSource] = useState('simple')
  const [customText, setCustomText] = useState('')

  useEffect(() => {
    if (sliderValue[0] > learningOrder.length) {
      const timer = setTimeout(() => setSliderValue([learningOrder.length]), 0);
      return () => clearTimeout(timer);
    }
  }, [learningOrder.length, sliderValue]);
  
  const activeLetters = useMemo(() => {
    const set = new Set<string>()
    if (mode === 'slider') {
      learningOrder.slice(0, sliderValue[0]).forEach(char => set.add(char))
    } else {
      selectedGroups.forEach(group => {
        groupMapping[group].forEach(char => set.add(char))
      })
    }
    return set
  }, [mode, sliderValue, selectedGroups, learningOrder, groupMapping])

  const currentText = useMemo(() => {
    if (textSource === 'custom') return customText
    return textPresets.find(p => p.id === textSource)?.content || ''
  }, [textSource, customText, textPresets])

  const transliteratedData = useMemo(() => {
    return transliterate(currentText, activeLetters)
  }, [currentText, activeLetters])

  const handleGroupToggle = (group: LetterGroup) => {
    setSelectedGroups(prev => 
      prev.includes(group) 
        ? prev.filter(g => g !== group)
        : [...prev, group]
    )
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
        <Header />
        <MainContainer>
          {/* Control Panel */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">{t('progression')}</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{t('learningMode')}</CardTitle>
                <CardDescription>
                  {t('learningModeDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={mode} onValueChange={(v) => setMode(v as 'slider' | 'groups')} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-auto mb-4">
                    <TabsTrigger value="slider" className="whitespace-normal h-auto py-2 text-center leading-tight">{t('modes.slider')}</TabsTrigger>
                    <TabsTrigger value="groups" className="whitespace-normal h-auto py-2 text-center leading-tight">{t('modes.groups')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="slider" className="space-y-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{t('levels.beginner')}</span>
                        <span>{t('levels.expert')}</span>
                      </div>
                      <Slider 
                        value={sliderValue} 
                        onValueChange={setSliderValue} 
                        max={learningOrder.length} 
                        step={1} 
                      />
                      <div className="text-center space-y-1">
                        <p className="font-medium text-lg">{t('lettersActive', { count: sliderValue[0] })}</p>
                        {sliderValue[0] > 0 && (
                          <p className="text-sm text-muted-foreground">
                            {t('latest')} <span className="text-primary font-bold mx-1">{learningOrder[sliderValue[0] - 1]}</span> 
                            ({t('and')} {learningOrder.slice(0, sliderValue[0] - 1).join(', ')})
                          </p>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="groups">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.values(LetterGroup).map((group) => (
                        <div key={group} className="flex items-center space-x-2 border p-3 rounded-lg">
                          <Switch 
                            id={group}
                            checked={selectedGroups.includes(group)}
                            onCheckedChange={() => handleGroupToggle(group)}
                          />
                          <label htmlFor={group} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none">
                            {t(`groups.${group}`)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Input Section */}
          <section className="space-y-4">
             <h2 className="text-2xl font-bold tracking-tight">{t('textSource')}</h2>
             <Card>
                <CardContent className="pt-6 space-y-4">
                  <Select value={textSource} onValueChange={setTextSource}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectText')} />
                    </SelectTrigger>
                    <SelectContent>
                      {textPresets.map(preset => (
                        <SelectItem key={preset.id} value={preset.id}>
                          {preset.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">{t('customText')}</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {textSource === 'custom' && (
                    <Textarea 
                      placeholder={t('pasteText')}
                      className="min-h-25"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                    />
                  )}
                </CardContent>
             </Card>
          </section>

          {/* Reading Area */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">{t('readingPractice')}</h2>
            <Card className="min-h-75">
              <CardContent className="pt-6">
                <TooltipProvider>
                  <div className="text-lg leading-relaxed whitespace-pre-wrap">
                    {transliteratedData.map((item, index) => (
                      item.isReplaced ? (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <span className="text-primary font-bold cursor-help bg-primary/10 px-0.5 rounded transition-colors hover:bg-primary/20">
                              {item.rendered}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-base font-bold">{item.text} → {item.rendered}</p>
                            {getCharDetails(item.rendered) && (
                              <div className="mt-1 space-y-0.5">
                                <p className="text-xs font-medium">
                                  {t('transcription')} <span className="font-mono text-primary">{getCharDetails(item.rendered)?.transcription}</span>
                                </p>
                                {getSourceLetters(item.rendered, isRu).length > 0 && (
                                  <p className="text-xs text-muted-foreground">
                                    {t('soundsLike')} {getSourceLetters(item.rendered, isRu).join(', ')}
                                  </p>
                                )}
                                {getCharDetails(item.rendered)?.note && (
                                  <p className="text-[10px] italic text-muted-foreground/80">
                                    {isRu 
                                      ? getCharDetails(item.rendered)?.note?.ru 
                                      : getCharDetails(item.rendered)?.note?.en
                                    }
                                  </p>
                                )}
                              </div>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span key={index}>{item.rendered}</span>
                      )
                    ))}
                    {transliteratedData.length === 0 && (
                      <span className="text-muted-foreground italic">
                        {t('startReading')}
                      </span>
                    )}
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          </section>
        </MainContainer>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
