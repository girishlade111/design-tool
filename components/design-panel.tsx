"use client"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface DesignPanelProps {
  frequencyA: number
  frequencyB: number
  centerASpeed: number
  centerBSpeed: number
  mode: number
  alternatePattern: boolean
  density: number
  characterSet: string
  isDarkMode: boolean
  backgroundColor: string
  scale: number
  onUpdateFrequencyA: (value: number) => void
  onUpdateFrequencyB: (value: number) => void
  onUpdateCenterASpeed: (value: number) => void
  onUpdateCenterBSpeed: (value: number) => void
  onUpdateMode: (value: number) => void
  onTogglePattern: (value: boolean) => void
  onUpdateDensity: (value: number) => void
  onUpdateCharacterSet: (value: string) => void
  onToggleDarkMode: (value: boolean) => void
  onUpdateBackgroundColor: (value: string) => void
  onUpdateScale: (value: number) => void
}

export function DesignPanel({
  frequencyA,
  frequencyB,
  centerASpeed,
  centerBSpeed,
  mode,
  alternatePattern,
  density,
  characterSet,
  isDarkMode,
  backgroundColor,
  scale,
  onUpdateFrequencyA,
  onUpdateFrequencyB,
  onUpdateCenterASpeed,
  onUpdateCenterBSpeed,
  onUpdateMode,
  onTogglePattern,
  onUpdateDensity,
  onUpdateCharacterSet,
  onToggleDarkMode,
  onUpdateBackgroundColor,
  onUpdateScale,
}: DesignPanelProps) {
  return (
    <div className="w-80 h-screen overflow-y-auto border-r bg-background p-6 text-foreground">
      <h2 className="text-lg font-semibold mb-6 text-foreground">Design Controls</h2>

      <Accordion type="multiple" defaultValue={["frequencies", "centers", "pattern", "appearance"]}>
        <AccordionItem value="frequencies">
          <AccordionTrigger>Frequencies</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-foreground">Frequency A</Label>
                <Slider
                  value={[frequencyA]}
                  min={0.1}
                  max={5}
                  step={0.01}
                  onValueChange={([value]) => onUpdateFrequencyA(value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Frequency B</Label>
                <Slider
                  value={[frequencyB]}
                  min={0.1}
                  max={5}
                  step={0.01}
                  onValueChange={([value]) => onUpdateFrequencyB(value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="centers">
          <AccordionTrigger>Center Speeds</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-foreground">Center A Speed</Label>
                <Slider
                  value={[centerASpeed]}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onValueChange={([value]) => onUpdateCenterASpeed(value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Center B Speed</Label>
                <Slider
                  value={[centerBSpeed]}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onValueChange={([value]) => onUpdateCenterBSpeed(value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pattern">
          <AccordionTrigger>Pattern</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-foreground">Mode</Label>
                <div className="flex space-x-2">
                  {[0, 1, 2].map((m) => (
                    <Button key={m} variant={mode === m ? "default" : "outline"} onClick={() => onUpdateMode(m)}>
                      {m}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-foreground">Alternate Pattern</Label>
                <Switch checked={alternatePattern} onCheckedChange={onTogglePattern} />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Pattern Density</Label>
                <Slider
                  value={[density]}
                  min={0.1}
                  max={1}
                  step={0.01}
                  onValueChange={([value]) => onUpdateDensity(value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Character Set</Label>
                <Input value={characterSet} onChange={(e) => onUpdateCharacterSet(e.target.value)} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="appearance">
          <AccordionTrigger>Appearance</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-foreground">Dark Mode</Label>
                <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Scale</Label>
                <Slider
                  value={[scale]}
                  min={0.5}
                  max={5}
                  step={0.1}
                  onValueChange={([value]) => onUpdateScale(value)}
                />
                <div className="text-xs text-muted-foreground text-right">{scale.toFixed(1)}x</div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Background Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => onUpdateBackgroundColor(e.target.value)}
                    className="w-10 h-10 p-0 border-none"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => onUpdateBackgroundColor(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
