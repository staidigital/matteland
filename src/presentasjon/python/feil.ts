/** Feilmeldingene fra Python, forklart på norsk */
export function forklarFeil(type: string, melding: string): string {
  switch (type) {
    case 'Tidsavbrudd':
      return 'Programmet brukte for lang tid og ble stoppet. Har du en løkke som aldri slutter?';
    case 'Stoppet':
      return 'Du stoppet programmet.';
    case 'ForMyeUtskrift':
      return 'Programmet skrev ut så mye at det ble stoppet.';
    case 'Lastefeil':
      return 'Fikk ikke lastet Python. Python hentes fra nettet første gang, så sjekk at du er på nett og last inn siden på nytt.';
    case 'IndentationError':
    case 'TabError':
      if (/expected an indented block/.test(melding))
        return 'Linja etter et kolon må ha innrykk (fire mellomrom), så Python vet hva som hører til.';
      if (/unexpected indent/.test(melding)) return 'Linja har innrykk, men den hører ikke til en if eller lignende.';
      return 'Innrykket stemmer ikke. Linjer som hører sammen, må starte like langt inn.';
    case 'SyntaxError':
      if (/Maybe you meant '=='/.test(melding))
        return 'Bruk == når du skal sammenligne. Ett = gir en variabel en verdi.';
      if (/expected ':'/.test(melding))
        return 'Det mangler et kolon på slutten av linja. Står det et vilkår etter else, skal det være elif.';
      if (/never closed|was not closed|unmatched|does not match/.test(melding))
        return 'En parentes er ikke lukket, eller det er en parentes for mye. Tell parentesene.';
      if (/unterminated string/.test(melding)) return 'Teksten mangler anførselstegn på slutten.';
      if (/invalid decimal literal/.test(melding))
        return 'Et tall står rett foran bokstaver. Skal det være gangetegn, som i 2*x? Variabelnavn kan ikke starte med et tall.';
      if (/cannot assign to (literal|expression)/.test(melding))
        return 'Det som står til venstre for =, må være et variabelnavn. Python regner ut høyre side og legger svaret i variabelen til venstre.';
      if (/Perhaps you forgot a comma/.test(melding))
        return 'Python skjønner ikke hvordan delene henger sammen. Mangler det et komma, et gangetegn eller et anførselstegn?';
      return 'Python forstår ikke hvordan koden er skrevet. Se etter parenteser, anførselstegn, gangetegn og kolon.';
    case 'NameError': {
      const navn = /name '(.+?)' is not defined/.exec(melding)?.[1];
      return navn
        ? `Python kjenner ikke navnet ${navn}. Er variabelen laget før den brukes, og er den stavet likt? Store og små bokstaver teller. Skulle det vært tekst, mangler det anførselstegn.`
        : 'Python kjenner ikke et navn du bruker.';
    }
    case 'TypeError':
      if (/object is not callable/.test(melding))
        return 'Det mangler trolig et gangetegn foran en parentes. Skriv 5*(2 + 3), ikke 5(2 + 3).';
      if (/can only concatenate str|unsupported operand type.*'str'|must be str, not/.test(melding))
        return 'Du prøver å regne med tekst og tall sammen. Husk at input() alltid gir tekst. Gjør om med int() eller float().';
      return 'Verdiene har typer som ikke passer sammen.';
    case 'ValueError':
      if (/invalid literal for int|could not convert string to float/.test(melding))
        return 'Teksten kan ikke gjøres om til et tall. Bruk punktum som desimaltegn, og int() bare for heltall.';
      return 'Verdien passer ikke her.';
    case 'ZeroDivisionError':
      return 'Du deler på null, og det går ikke.';
    case 'OverflowError':
      return 'Tallet ble for stort for Python.';
    default:
      return '';
  }
}

/** Disse er ikke feil i koden, men noe som skjedde utenfor */
export const erAvbrudd = (type: string) => ['Tidsavbrudd', 'Stoppet', 'ForMyeUtskrift', 'Lastefeil'].includes(type);
