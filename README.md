# Pixel Fighter

2D-Pixel-Fighting-Game, gebaut mit Godot 4.7.2. Solo gegen die KI oder zu zweit an einer Tastatur.

- **Im Browser spielen:** https://combat-game.berendak.ch
- **Windows-Download:** Releases-Seite dieses Repos → `CombatGame-Windows.zip` (Link folgt)

> Windows zeigt beim ersten Start evtl. eine SmartScreen-Warnung, weil die .exe nicht signiert ist:
> „Weitere Informationen“ → „Trotzdem ausführen“.

## Steuerung

| Aktion | Spieler 1 | Spieler 2 | Gamepad |
|---|---|---|---|
| Laufen | A / D | ← / → | Stick / D-Pad |
| Springen | W | ↑ | Stick hoch / D-Pad hoch |
| Ducken | S | ↓ | Stick runter / D-Pad runter |
| Blocken | Zurücklaufen | Zurücklaufen | Zurück |
| Leichter Angriff | F | J | A |
| Schwerer Angriff | G | K | B |
| Spezial | H | L | X |
| Super | T | I | Y |

Charakterwahl: P1 A/D + F (bereit), P2 Pfeile + J (bereit). Tab = Modus wechseln (Solo / 2 Spieler).

Allgemein: Esc / P = Pause · R = zurück zur Auswahl · F1 = Hilfe · F11 = Vollbild · M = Ton an/aus

Hinweise Browser: Vorher einmal ins Spiel klicken, damit es die Tastatur bekommt. Keine Touch-Steuerung – auf dem Handy nicht spielbar.

## Neuen Build veröffentlichen

Pfade auf Emirkans PC:

- Godot-Projekt: `C:\Users\emirk\OneDrive\Documents\ChatGPT\Game\fighting-game`
- Godot: `C:\Users\emirk\AppData\Local\Programs\PixelFighterTools\Godot-4.7.2\Godot_v4.7.2-stable_win64_console.exe`
- Deploy-Ordner: `C:\Users\emirk\OneDrive\Documents\ChatGPT\Game\dist\combat-game-release` (dieses Repo = `web\`)

In PowerShell:

```powershell
$godot   = "C:\Users\emirk\AppData\Local\Programs\PixelFighterTools\Godot-4.7.2\Godot_v4.7.2-stable_win64_console.exe"
$project = "C:\Users\emirk\OneDrive\Documents\ChatGPT\Game\fighting-game"
$deploy  = "C:\Users\emirk\OneDrive\Documents\ChatGPT\Game\dist\combat-game-release"

# 1. Exportieren
& $godot --headless --path $project --export-release "Web" "$deploy\web\index.html"
& $godot --headless --path $project --export-release "Windows Desktop" "$deploy\windows\CombatGame.exe"

# 2. Web-Version live schalten (Vercel deployt automatisch bei jedem Push)
cd "$deploy\web"
git add -A
git commit -m "Build vX.Y"
git push

# 3. Neue .exe als Release
Compress-Archive -Path "$deploy\windows\CombatGame.exe" -DestinationPath "$deploy\CombatGame-Windows.zip" -Force
gh release create vX.Y "$deploy\CombatGame-Windows.zip" --title "vX.Y" --notes "Was ist neu: ..."
```

Alternativ im Godot-Editor: Projekt → Exportieren → Preset wählen → „Projekt exportieren“ (Debug-Haken aus).
