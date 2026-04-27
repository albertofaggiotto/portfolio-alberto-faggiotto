import type { Localized } from '@/lib/i18n'

export type CategoryId = 'A' | 'B' | 'C'

export interface Artifact {
  label: Localized<string>
  url: string
}

export type MediaOrientation = 'portrait' | 'landscape' | 'square'

export type MediaEmphasis = 'md' | 'lg'

export type MediaItem =
  | {
      type: 'image'
      src: string
      alt: Localized<string>
      caption: Localized<string>
      orientation?: MediaOrientation
      emphasis?: MediaEmphasis
      /**
       * Optional hard cap on the figure's width (e.g. '22rem').
       * When set, emphasis extension is ignored and the figure renders
       * at this width, left-aligned inside the media rail.
       */
      fixedWidth?: string
      link?: string
      linkLabel?: Localized<string>
      /**
       * When set on the FIRST of two consecutive portrait items, the renderer
       * treats them as a comparative pair with a single shared caption below
       * the whole block (instead of one caption per figure).
       */
      pairCaption?: Localized<string>
      /**
       * When true on the first of a shared-caption pair, the two images are
       * stacked vertically (one above the other) instead of placed side by side.
       */
      pairStacked?: boolean
      /**
       * In stacked pair mode, places the link below the shared caption
       * instead of between the two images. No effect outside stacked mode.
       */
      pairLinkAfterCaption?: boolean
    }
  | {
      type: 'video'
      src: string
      caption: Localized<string>
      poster?: string
      orientation?: MediaOrientation
      emphasis?: MediaEmphasis
      fixedWidth?: string
      link?: string
      linkLabel?: Localized<string>
      pairCaption?: Localized<string>
      pairStacked?: boolean
      pairLinkAfterCaption?: boolean
    }

export interface CaseStudy {
  context: Localized<string>
  whatIDid: Localized<string>
  approach: Localized<string>
  skills: Localized<string[]>
  tools?: ToolName[]
  media?: MediaItem[]
  /**
   * Width variant for the right-side media rail on the detail page.
   * 'wide' gives the media rail more horizontal presence; leave undefined for
   * the default rail width. Only affects pages that have `media`.
   */
  mediaRail?: 'default' | 'wide' | 'extra-wide'
  artifact?: Artifact
}

/** Canonical tool names. Keep this list and TOOL_LOGOS in sync. */
export type ToolName =
  | 'Google Workspace'
  | 'Microsoft Office'
  | 'Canva'
  | 'CapCut'
  | 'Meta Business Suite'
  | 'WordPress'
  | 'Spotify'

/**
 * Reusable mapping from tool name to logo asset.
 * Paths match the actual on-disk filenames in /public/logos (case-sensitive in production).
 * Optional `scale` is an optical-size correction for PNGs whose mark occupies less of
 * their canvas than the tightly-cropped references (WordPress, Spotify).
 */
export const TOOL_LOGOS: Record<
  ToolName,
  { src: string; alt: string; scale?: number }
> = {
  'Google Workspace': { src: '/logos/google.png', alt: 'Google Workspace', scale: 1.4 },
  'Microsoft Office': { src: '/logos/microsoft.png', alt: 'Microsoft Office', scale: 1.18 },
  Canva: { src: '/logos/canva.png', alt: 'Canva', scale: 1.18 },
  CapCut: { src: '/logos/capcut.png', alt: 'CapCut', scale: 1.18 },
  // Versioned query string forces next/image + any browser cache to pick up the replaced asset.
  'Meta Business Suite': { src: '/logos/meta.png?v=2', alt: 'Meta Business Suite', scale: 1.18 },
  WordPress: { src: '/logos/wordpress.png', alt: 'WordPress', scale: 0.9 },
  Spotify: { src: '/logos/spotify.png', alt: 'Spotify', scale: 0.9 },
}

export interface Logo {
  src: string
  alt: string
  scale?: number
  align?: 'right' | 'center'
  offsetY?: number
  offsetX?: number
}

export interface Project {
  slug: string
  title: Localized<string>
  category: CategoryId
  categoryLabel: Localized<string>
  type: Localized<string>
  year: Localized<string>
  cardDescription: Localized<string>
  hasCaseStudy: boolean
  caseStudy?: CaseStudy
  logo?: Logo
}

export interface Category {
  id: CategoryId
  label: Localized<string>
  descriptor: Localized<string>
}

export const categories: Category[] = [
  {
    id: 'B',
    label: {
      en: 'Editorial & Cultural Communication',
      it: 'Scrittura editoriale e comunicazione culturale',
    },
    descriptor: {
      en: 'Writing and communication produced in journalistic and festival contexts',
      it: 'Scrittura e comunicazione realizzate in contesti giornalistici e festivalieri',
    },
  },
  {
    id: 'A',
    label: {
      en: 'Semiotic & Cultural Analysis',
      it: 'Analisi semiotica e culturale',
    },
    descriptor: {
      en: 'Interpretive work that reads cultural objects through a semiotic framework',
      it: 'Lavori interpretativi che leggono oggetti culturali attraverso un quadro semiotico',
    },
  },
  {
    id: 'C',
    label: {
      en: 'Brand Strategy & Communication',
      it: 'Brand strategy e comunicazione',
    },
    descriptor: {
      en: 'Strategic and analytical work applied to brands, audiences, and market positioning.',
      it: 'Lavori strategici e analitici applicati a brand, pubblici e posizionamento di mercato.',
    },
  },
]

// Common Italian rendering for shared category labels (used by Project.categoryLabel).
const CAT_LABEL_A: Localized<string> = {
  en: 'Semiotic & Cultural Analysis',
  it: 'Analisi semiotica e culturale',
}
const CAT_LABEL_B: Localized<string> = {
  en: 'Editorial & Cultural Communication',
  it: 'Comunicazione editoriale e culturale',
}
const CAT_LABEL_C: Localized<string> = {
  en: 'Brand Strategy & Communication',
  it: 'Brand strategy e comunicazione',
}

export const projects: Project[] = [
  // ─── Category A ───────────────────────────────────────────────────────────
  {
    slug: 'thesis',
    title: {
      en: 'Film Criticism and Authorship: The Case of Martin Scorsese and David Lynch in Italian Newspapers',
      it: 'Critica cinematografica e autorialità: il caso di Martin Scorsese e David Lynch nei quotidiani italiani',
    },
    category: 'A',
    categoryLabel: CAT_LABEL_A,
    type: {
      en: 'Academic research project',
      it: 'Progetto di ricerca accademico',
    },
    year: { en: '2025-2026', it: '2025-2026' },
    cardDescription: {
      en: "A master's thesis on how Italian newspaper criticism constructed the authorship of Martin Scorsese and David Lynch for a general audience. Based on a corpus of 262 reviews, the project draws on semiotic analysis, cultural interpretation, and long-form research",
      it: 'Una tesi magistrale su come la critica cinematografica dei quotidiani italiani abbia costruito l’autorialità di Martin Scorsese e David Lynch per un pubblico generalista. Basato su un corpus di 262 recensioni, il progetto si fonda su analisi semiotica, interpretazione culturale e ricerca approfondita.',
    },
    hasCaseStudy: true,
    logo: { src: '/logos/alma-mater.png', alt: 'Alma Mater Studiorum – Università di Bologna' },
    caseStudy: {
      context: {
        en: 'This master’s thesis is one of the projects I am most attached to. Beyond bringing together two of my strongest interests - semiotics and cinema - it also accompanied seven months of my life spent moving between Bologna’s libraries, opening dusty archive folders, and scrolling through old newspapers on microfilm readers. It taught me a great deal about patience and about the discipline of academic research.\n\nThe thesis examines how Italian daily film criticism mediated the authorship of Martin Scorsese and David Lynch for a general readership. It asks how the authorial identities of the two directors were translated, framed, and negotiated within the discursive space of national newspapers, and it is based on a corpus of 262 reviews published in five Italian dailies - Corriere della Sera, la Repubblica, Il Messaggero, La Stampa, and Avvenire - covering the fiction features of both directors across theatrical releases and major international festival contexts. The broader aim was to understand how journalistic criticism positions filmmakers within cultural hierarchies, making them legible to readers through recurring values, oppositions, and interpretive categories.',
        it: 'Questa tesi magistrale è uno dei progetti a cui sono più legato. Oltre a unire due dei miei interessi più forti - semiotica e cinema - ha accompagnato anche sette mesi della mia vita trascorsi tra le biblioteche di Bologna, aprendo polverose cartelle d’archivio e scorrendo vecchi quotidiani sui lettori di microfilm. Mi ha insegnato molto sulla pazienza e sulla disciplina della ricerca accademica.\n\nLa tesi esamina il modo in cui la critica cinematografica dei quotidiani italiani ha mediato l’autorialità di Martin Scorsese e David Lynch presso un pubblico generalista. Si chiede come le identità autoriali dei due registi siano state tradotte, inquadrate e negoziate all’interno dello spazio discorsivo dei quotidiani nazionali, ed è basata su un corpus di 262 recensioni pubblicate su cinque quotidiani italiani - Corriere della Sera, la Repubblica, Il Messaggero, La Stampa e Avvenire - che coprono i lungometraggi di entrambi i registi tra uscite in sala e principali contesti festivalieri internazionali. L’obiettivo più ampio era capire come la critica giornalistica posizioni i cineasti all’interno di gerarchie culturali, rendendoli leggibili al lettore attraverso valori, opposizioni e categorie interpretative ricorrenti.',
      },
      whatIDid: {
        en: 'I built the corpus, defined its boundaries, and developed the analytical framework for the project. This meant selecting and organising reviews across decades, newspapers, and reception contexts, while excluding materials that would have required a different semiotic treatment, such as retrospectives, in-depth feature articles, and documentary reviews.\n\nI then carried out a comparative analysis of how the five newspapers represented Scorsese and Lynch, tracing the discursive patterns through which their films and public identities were framed. More specifically, I examined how criticism attributed different forms of value to their work - technical mastery, artistic ambition, accessibility, opacity, market orientation, and cultural prestige - and how those values contributed to constructing each director’s authorial image for a non-specialist audience.',
        it: 'Ho costruito il corpus, ne ho definito i confini e sviluppato il quadro analitico del progetto. Ciò ha significato selezionare e organizzare recensioni attraverso decenni, testate e contesti di ricezione, escludendo i materiali che avrebbero richiesto un trattamento semiotico diverso, come retrospettive, approfondimenti e recensioni di documentari.\n\nHo poi condotto un’analisi comparativa di come i cinque quotidiani abbiano rappresentato Scorsese e Lynch, ricostruendo i pattern discorsivi attraverso cui i loro film e le loro identità pubbliche venivano inquadrati. Più nello specifico, ho esaminato come la critica attribuisse diverse forme di valore al loro lavoro - padronanza tecnica, ambizione artistica, accessibilità, opacità, orientamento di mercato e prestigio culturale - e come tali valori contribuissero a costruire l’immagine autoriale di ciascun regista presso un pubblico non specialistico.',
      },
      approach: {
        en: 'My approach combined interpretive semiotics with the analysis of journalistic discourse. Drawing on Umberto Eco’s notion of the Model Reader, I treated reviews as mediating texts that actively shape the relationship between author, public, and context. I also used the conceptual tension between high culture and kitsch, as developed in Apocalittici e integrati, to observe when and how the two directors were positioned as culturally legitimised auteurs, and when their work was instead simplified, downgraded, or adapted to the logics of mass culture.\n\nA key methodological choice was to read critics as part of the collective enunciation of each newspaper - that is, as expressions of a broader editorial and cultural horizon. This made it possible to compare not only what was said about Scorsese and Lynch, but also how different newspapers made them intelligible, acceptable, controversial, or prestigious for their own readers.',
        it: 'Il mio approccio ha unito una semiotica interpretativa all’analisi del discorso giornalistico. Riprendendo la nozione di Lettore Modello di Umberto Eco, ho trattato le recensioni come testi mediatori che modellano attivamente la relazione tra autore, pubblico e contesto. Ho inoltre utilizzato la tensione concettuale tra cultura alta e kitsch, sviluppata in Apocalittici e integrati, per osservare quando e come i due registi venissero posizionati come autori culturalmente legittimati e quando invece il loro lavoro venisse semplificato, ridimensionato o adattato alle logiche della cultura di massa.\n\nUna scelta metodologica chiave è stata leggere i critici come parte dell’enunciazione collettiva di ciascun quotidiano - come espressione, cioè, di un orizzonte editoriale e culturale più ampio. Questo ha reso possibile confrontare non solo ciò che veniva detto su Scorsese e Lynch, ma anche come quotidiani diversi li rendessero intelligibili, accettabili, controversi o prestigiosi per i propri lettori.',
      },
      skills: {
        en: ['Qualitative research', 'Critical writing', 'Media analysis', 'Research synthesis'],
        it: ['Ricerca qualitativa', 'Scrittura critica', 'Analisi dei media', 'Sintesi di ricerca'],
      },
      media: [
        {
          type: 'image',
          src: '/media/Tesi/frontespizio-tesi.jpg',
          alt: { en: 'Title page of the thesis', it: 'Frontespizio della tesi' },
          caption: {
            en: 'The thesis is titled Film Criticism and Authorship: The Case of Martin Scorsese and David Lynch in Italian Newspapers. It was discussed in Bologna on 25 March 2025, with Professor Anna Maria Lorusso as supervisor and Professor Paolo Noto as co-supervisor. The degree was awarded with highest honours.',
            it: 'La tesi si intitola Critica cinematografica e autorialità: il caso di Martin Scorsese e David Lynch nei quotidiani italiani. È stata discussa a Bologna il 25 marzo 2025, con la professoressa Anna Maria Lorusso come relatrice e il professor Paolo Noto come correlatore. La laurea è stata conseguita con il massimo dei voti e la lode.',
          },
          link: '/media/Tesi/tesi-faggiotto.pdf',
          linkLabel: {
            en: 'Click here for the full thesis PDF',
            it: 'Clicca qui per il PDF completo della tesi',
          },
        },
        {
          type: 'image',
          src: '/media/Tesi/indice.png',
          alt: {
            en: 'Opening section of the thesis table of contents',
            it: 'Sezione iniziale dell’indice della tesi',
          },
          caption: {
            en: 'The opening section of the table of contents. After the introduction, each chapter is divided into two main sections - one on Scorsese and one on Lynch - each made up of several subsections. At the end of every chapter, provisional conclusions are presented for each newspaper, followed by the final conclusions.',
            it: 'La sezione iniziale dell’indice. Dopo l’introduzione, ogni capitolo è diviso in due sezioni principali - una su Scorsese e una su Lynch - composte a loro volta da diverse sottosezioni. Alla fine di ciascun capitolo vengono presentate conclusioni provvisorie per ogni quotidiano, seguite dalle conclusioni finali.',
          },
        },
        {
          type: 'image',
          src: '/media/Tesi/lynch.png',
          alt: {
            en: 'Excerpt from a thesis page analysing a review of a David Lynch film',
            it: 'Estratto da una pagina della tesi che analizza una recensione di un film di David Lynch',
          },
          caption: {
            en: 'An excerpt from one page of the thesis. Each review is presented both as an image, in order to show the page layout analysed through the semiotics of journalistic text, and as written text below for greater clarity. The analytical reading begins immediately afterwards.',
            it: 'Un estratto da una pagina della tesi. Ogni recensione viene presentata sia come immagine, per mostrare il layout della pagina analizzato attraverso la semiotica del testo giornalistico, sia come testo scritto sotto, per maggiore chiarezza. La lettura analitica comincia subito dopo.',
          },
        },
        {
          type: 'image',
          src: '/media/Tesi/quotidiani-tesi.jpg',
          alt: {
            en: 'Research day in the library with stacks of newspapers and microfilm',
            it: 'Giornata di ricerca in biblioteca tra pile di quotidiani e bobine di microfilm',
          },
          caption: {
            en: 'An example of a day spent in the library, working through stacks of newspapers and microfilm reels.',
            it: 'Un esempio di giornata trascorsa in biblioteca, tra pile di quotidiani e bobine di microfilm.',
          },
        },
      ],
    },
  },
  {
    slug: 'chalamet',
    title: {
      en: 'Timothée Chalamet and the Semiotics of Genderless Aesthetics',
      it: 'Timothée Chalamet e la semiotica dell’estetica genderless',
    },
    category: 'A',
    categoryLabel: CAT_LABEL_A,
    type: { en: 'Academic essay', it: 'Saggio accademico' },
    year: { en: 'June 2022', it: 'Giugno 2022' },
    cardDescription: {
      en: "An academic essay exploring Timothée Chalamet's public image through the lens of genderless aesthetics. The project uses semiotic analysis and media discourse to examine how fashion and news publications frame changing models of masculinity.",
      it: 'Un saggio accademico che esplora l’immagine pubblica di Timothée Chalamet attraverso la lente di un’estetica genderless. Il progetto utilizza l’analisi semiotica e il discorso mediatico per esaminare come riviste di moda e attualità inquadrino modelli di mascolinità in trasformazione.',
    },
    hasCaseStudy: true,
    logo: { src: '/logos/alma-mater.png', alt: 'Alma Mater Studiorum – Università di Bologna' },
    caseStudy: {
      context: {
        en: "This academic essay examines how Timothée Chalamet was constructed as a genderless icon in contemporary culture through the visual and discursive work of fashion and news magazines. The project uses Chalamet as a case study to explore how media participate in redefining masculinity, sensuality, and self-presentation. Focusing on magazines such as L'Uomo Vogue, GQ, Esquire, and Time, the essay asks how editorial imagery, styling, and language contribute to presenting Chalamet as the figure of a broader cultural shift in the way gender codes are negotiated and made visible.",
        it: 'Questo saggio accademico esamina come Timothée Chalamet sia stato costruito come icona genderless della cultura contemporanea attraverso il lavoro visivo e discorsivo di riviste di moda e attualità. Il progetto utilizza Chalamet come case study per esplorare il modo in cui i media partecipano alla ridefinizione di mascolinità, sensualità e auto-rappresentazione. Concentrandosi su riviste come L’Uomo Vogue, GQ, Esquire e Time, il saggio si chiede come l’immaginario editoriale, lo styling e il linguaggio contribuiscano a presentare Chalamet come figura di un più ampio spostamento culturale nel modo in cui i codici di genere vengono negoziati e resi visibili.',
      },
      whatIDid: {
        en: "I developed the essay's interpretive framework, selected and analysed a corpus of magazine covers and editorial representations, and used Chalamet's public image as the centre of a broader cultural argument about aesthetics, identity, and representation. In order to make the analysis more precise, I also introduced a comparative set of figures - Tom Cruise, Megan Fox, Elliot Page, and Frances McDormand - so that Chalamet's image could be read against more recognisable models of masculinity, femininity, transition, and gender nonconformity. This allowed me to identify the specific traits through which his image is constructed across different editorial contexts.",
        it: 'Ho sviluppato il quadro interpretativo del saggio, selezionato e analizzato un corpus di copertine e rappresentazioni editoriali, utilizzando l’immagine pubblica di Chalamet come centro di un argomento culturale più ampio su estetica, identità e rappresentazione. Per rendere l’analisi più precisa ho introdotto anche un insieme comparativo di figure - Tom Cruise, Megan Fox, Elliot Page e Frances McDormand - in modo che l’immagine di Chalamet potesse essere letta a partire da modelli più riconoscibili di mascolinità, femminilità, transizione e non conformità di genere. Questo mi ha permesso di identificare i tratti specifici attraverso cui la sua immagine viene costruita nei diversi contesti editoriali.',
      },
      approach: {
        en: "The analysis combines plastic-figurative reading, the identification of recurring isotopies, and the use of Greimas's semiotic square in order to map how different semantic areas cluster around his image. The project argues that Chalamet is presented as a figure positioned between the non-masculine and the feminine: sensual but not overtly sexualised, resistant to rigid virile codes, and capable of embodying a broader transformation in how masculinity is imagined and communicated.",
        it: 'L’analisi combina la lettura plastico-figurativa, l’individuazione di isotopie ricorrenti e l’uso del quadrato semiotico di Greimas per mappare come diverse aree semantiche si aggreghino intorno alla sua immagine. Il progetto sostiene che Chalamet venga presentato come una figura posizionata tra il non-mascolino e il femminile: sensuale ma non apertamente sessualizzato, resistente a codici virili rigidi e capace di incarnare una trasformazione più ampia del modo in cui la mascolinità viene immaginata e comunicata.',
      },
      skills: {
        en: ['Media analysis', 'Trend analysis', 'Editorial writing', 'Qualitative research'],
        it: ['Analisi dei media', 'Analisi dei trend', 'Scrittura editoriale', 'Ricerca qualitativa'],
      },
      mediaRail: 'extra-wide',
      media: [
        {
          type: 'image',
          src: '/media/Chalamet/indice-chalamet.png',
          alt: {
            en: 'Table of contents of the Chalamet essay',
            it: 'Indice del saggio su Chalamet',
          },
          caption: {
            en: 'The table of contents of the essay, whose discursive coherence is organised through subsections grouped by the magazine under analysis.',
            it: 'L’indice del saggio, la cui coerenza discorsiva è organizzata attraverso sottosezioni raggruppate per rivista analizzata.',
          },
          fixedWidth: '22rem',
          link: '/media/Chalamet/chalamet-tesina.pdf',
          linkLabel: {
            en: 'Click here for the full essay PDF',
            it: 'Clicca qui per il PDF completo del saggio',
          },
        },
        {
          type: 'image',
          src: '/media/Chalamet/quadrato.png',
          alt: {
            en: 'Greimas semiotic square mapping the isotopies of the Chalamet essay',
            it: 'Quadrato semiotico di Greimas che mappa le isotopie del saggio su Chalamet',
          },
          caption: {
            en: 'The use of Greimas’s semiotic square together with the recurring isotopies identified in the essay, such as softness, relaxation, mimicry, sensuality, formality, dependence, and independence.',
            it: 'L’uso del quadrato semiotico di Greimas insieme alle isotopie ricorrenti individuate nel saggio, come morbidezza, rilassamento, mimetismo, sensualità, formalità, dipendenza e indipendenza.',
          },
          fixedWidth: '22rem',
        },
        {
          type: 'image',
          src: '/media/Chalamet/chalamet.png?v=2',
          alt: {
            en: 'L’Uomo Vogue magazine cover featuring Timothée Chalamet',
            it: 'Copertina di L’Uomo Vogue dedicata a Timothée Chalamet',
          },
          caption: { en: '', it: '' },
          orientation: 'portrait',
          emphasis: 'lg',
          pairCaption: {
            en: 'A comparison between the covers L’Uomo dedicated to Tom Cruise and Timothée Chalamet.',
            it: 'Un confronto tra le copertine che L’Uomo ha dedicato a Tom Cruise e a Timothée Chalamet.',
          },
        },
        {
          type: 'image',
          src: '/media/Chalamet/cruise.png',
          alt: {
            en: 'L’Uomo magazine cover featuring Tom Cruise',
            it: 'Copertina di L’Uomo dedicata a Tom Cruise',
          },
          caption: { en: '', it: '' },
          orientation: 'portrait',
        },
      ],
    },
  },
  {
    slug: 'scream-vi',
    title: {
      en: 'Scream VI and the Final Girl Reversal',
      it: 'Scream VI e il rovesciamento della final girl',
    },
    category: 'A',
    categoryLabel: CAT_LABEL_A,
    type: { en: 'Academic essay', it: 'Saggio accademico' },
    year: { en: 'May 2024', it: 'Maggio 2024' },
    cardDescription: {
      en: 'An academic essay on Scream VI and the transformation of the final girl in contemporary horror. The project connects genre theory, spectatorship, and close film analysis to explore how the franchise reworks victimhood and agency.',
      it: 'Un saggio accademico su Scream VI e sulla trasformazione della final girl nell’horror contemporaneo. Il progetto unisce teoria dei generi, studi sulla spettatorialità e analisi ravvicinata del film per esplorare come la saga rielabori vittimismo e agency.',
    },
    hasCaseStudy: true,
    logo: { src: '/logos/alma-mater.png', alt: 'Alma Mater Studiorum – Università di Bologna' },
    caseStudy: {
      context: {
        en: "This academic essay was developed for the Entertainment Cultures course in my master's degree. Since the course focused on media franchise cultures, intellectual property management, and transmedia synergies, I chose to examine the evolution of the final girl in the Scream franchise, from the first two films to the recent requel cycle. More specifically, the essay reads the 2022 reboot-requel and its direct sequel as works that preserve the serial logic of Scream while updating it for a new generational context. Within that shift, the project investigates how the figure of the final girl changes across the franchise, asking what the new heroines retain from the earlier model and what they revise in relation to contemporary horror, feminist discourse, and audience expectations.",
        it: 'Questo saggio accademico è stato sviluppato per il corso di Entertainment Cultures della mia laurea magistrale. Poiché il corso si concentrava sulle culture delle media franchise, sulla gestione della proprietà intellettuale e sulle sinergie transmediali, ho scelto di esaminare l’evoluzione della final girl nella saga di Scream, dai primi due film al recente ciclo requel. Più nello specifico, il saggio legge il reboot-requel del 2022 e il suo seguito diretto come opere che conservano la logica seriale di Scream aggiornandola a un nuovo contesto generazionale. All’interno di questo spostamento, il progetto indaga come la figura della final girl cambi nel corso della saga, chiedendosi cosa le nuove eroine conservino del modello precedente e cosa rivedano rispetto all’horror contemporaneo, al discorso femminista e alle aspettative del pubblico.',
      },
      whatIDid: {
        en: "I developed the essay through a comparative close reading of the original Scream films and the recent requel cycle, using Scream VI as the central case study. I reconstructed the franchise's changing treatment of the final girl by moving from Sidney Prescott and Gale Weathers to Sam and Tara Carpenter, paying particular attention to how agency, violence, sexuality, and spectatorship are redistributed in the newer films. I also situated the analysis within a broader industrial and cultural landscape, connecting the franchise to contemporary horror reboots, the legacy of #MeToo, and the changing representation of female protagonists in horror cinema.",
        it: 'Ho sviluppato il saggio attraverso una close reading comparativa dei film originali di Scream e del recente ciclo requel, utilizzando Scream VI come case study centrale. Ho ricostruito il modo in cui la saga ha modificato il trattamento della final girl passando da Sidney Prescott e Gale Weathers a Sam e Tara Carpenter, prestando particolare attenzione alla redistribuzione di agency, violenza, sessualità e dimensione spettatoriale nei film più recenti. Ho inoltre collocato l’analisi all’interno di un panorama industriale e culturale più ampio, mettendo in relazione la saga con i reboot horror contemporanei, l’eredità del #MeToo e la mutata rappresentazione delle protagoniste femminili nel cinema horror.',
      },
      approach: {
        en: "My approach combined film analysis with gender theory and franchise studies. I started from Carol J. Clover's classical formulation of the final girl and used it as a reference point to show how Scream had already complicated that model in the 1990s, first by multiplying the figure of the surviving heroine and then by loosening the moral and sexual constraints traditionally attached to her. From there, I argued that the requel saga pushes this transformation further, especially through the more ambiguous and unstable figure of Sam Carpenter. At the same time, the essay reads the new cycle as a move from the solitary final girl toward a more collective and generational model of survival, in line with wider shifts in contemporary feminist culture.",
        it: 'Il mio approccio ha unito analisi filmica, teoria di genere e studi sulle franchise. Sono partito dalla classica formulazione della final girl di Carol J. Clover e l’ho usata come punto di riferimento per mostrare come Scream avesse già complicato quel modello negli anni Novanta, prima moltiplicando la figura dell’eroina sopravvissuta e poi allentando i vincoli morali e sessuali tradizionalmente associati a essa. Da lì, ho sostenuto che il ciclo requel spinge ulteriormente questa trasformazione, soprattutto attraverso la figura più ambigua e instabile di Sam Carpenter. Allo stesso tempo, il saggio legge il nuovo ciclo come un passaggio dalla final girl solitaria a un modello di sopravvivenza più collettivo e generazionale, in linea con spostamenti più ampi nella cultura femminista contemporanea.',
      },
      skills: {
        en: ['Narrative analysis', 'Critical writing', 'Media analysis', 'Research synthesis'],
        it: ['Analisi narrativa', 'Scrittura critica', 'Analisi dei media', 'Sintesi di ricerca'],
      },
      mediaRail: 'wide',
      media: [
        {
          type: 'image',
          src: '/media/Scream/indice-scream.png?v=2',
          alt: {
            en: 'Table of contents of the Scream VI essay',
            it: 'Indice del saggio su Scream VI',
          },
          caption: {
            en: 'The table of contents of the essay, whose development follows a diachronic structure.',
            it: 'L’indice del saggio, il cui sviluppo segue una struttura diacronica.',
          },
          orientation: 'landscape',
          fixedWidth: '22rem',
          link: '/media/Scream/tesina-scream.pdf',
          linkLabel: {
            en: 'Click here for the full essay PDF',
            it: 'Clicca qui per il PDF completo del saggio',
          },
        },
        {
          type: 'image',
          src: '/media/Scream/final-girl.png',
          alt: {
            en: 'Essay page introducing the concept of the final girl',
            it: 'Pagina del saggio che introduce il concetto di final girl',
          },
          caption: {
            en: 'The essay opens with a brief presentation of the concept of the final girl and of the contribution the Scream franchise has made to its evolution.',
            it: 'Il saggio si apre con una breve presentazione del concetto di final girl e del contributo che la saga di Scream ha dato alla sua evoluzione.',
          },
          orientation: 'landscape',
          emphasis: 'lg',
        },
        {
          type: 'image',
          src: '/media/Scream/carpenter.png',
          alt: {
            en: 'Essay page with a visual reference illustrating the analysis',
            it: 'Pagina del saggio con un riferimento visivo a illustrazione dell’analisi',
          },
          caption: {
            en: 'I also included visual references throughout the essay in order to make the analysis clearer and easier to follow.',
            it: 'Ho inserito anche riferimenti visivi lungo tutto il saggio per rendere l’analisi più chiara e facile da seguire.',
          },
          orientation: 'landscape',
          emphasis: 'lg',
        },
      ],
    },
  },

  // ─── Category B ───────────────────────────────────────────────────────────
  {
    slug: 'venice-framescinema',
    title: {
      en: 'Editorial Work & Festival Coverage with Frames Cinema',
      it: 'Lavoro editoriale e copertura di festival con Frames Cinema',
    },
    category: 'B',
    categoryLabel: CAT_LABEL_B,
    type: {
      en: 'Editorial and festival-related work',
      it: 'Lavoro editoriale e festivaliero',
    },
    year: { en: '2021–2025', it: '2021–2025' },
    cardDescription: {
      en: 'Editorial and festival-related work developed with the online film magazine Frames Cinema, including Venice Film Festival coverage, criticism, and broader cultural content across written, audio and video formats. The project shows my ability to translate cinephile analysis into clear, audience-facing editorial content.',
      it: 'Lavoro editoriale e festivaliero sviluppato con la rivista online Frames Cinema, comprensivo della copertura della Mostra del Cinema di Venezia, critica e contenuti culturali in formato scritto, audio e video. Il progetto mostra la mia capacità di tradurre l’analisi cinefila in contenuti editoriali chiari e rivolti al pubblico.',
    },
    hasCaseStudy: true,
    logo: { src: '/logos/frames.png', alt: 'Frames Cinema' },
    caseStudy: {
      context: {
        en: 'Editorial work developed with Frames Cinema, where I worked in a film journalism and editorial management context. Within that experience, Venice Film Festival coverage became one of the main occasions to produce criticism, festival reporting, and culturally framed editorial content.',
        it: 'Lavoro editoriale sviluppato con Frames Cinema, dove ho operato in un contesto di giornalismo cinematografico e gestione editoriale. All’interno di questa esperienza, la copertura della Mostra del Cinema di Venezia è diventata una delle principali occasioni per produrre critica, cronaca festivaliera e contenuti editoriali culturalmente connotati.',
      },
      whatIDid: {
        en: 'I worked as Editor-in-Chief for Frames Cinema, where I wrote film reviews and retrospectives, contributed to the podcast Lost Highways, curated the film news column for part of 2022, and covered major festivals with press accreditation, including the 79th, 80th, 81st, and 82nd editions of the Venice International Film Festival, where I interviewed directors such as Lav Diaz and Fabrice Du Welz.',
        it: 'Ho lavorato come direttore editoriale di Frames Cinema, dove ho scritto recensioni e retrospettive cinematografiche, ho contribuito al podcast Lost Highways, ho curato la rubrica delle news per parte del 2022 e ho coperto i principali festival con accredito stampa, comprese la 79ª, 80ª, 81ª e 82ª edizione della Mostra Internazionale d’Arte Cinematografica di Venezia, dove ho intervistato registi come Lav Diaz e Fabrice Du Welz.',
      },
      approach: {
        en: 'Since I was aware that my interests could sometimes lean too heavily toward niche topics and cultural products, my main effort was always to translate and adapt them for audiences that might be quite distant from my own perspective. I first did this through written content, and later through reels as well, a format I quickly found very natural to work with. Whenever I managed to connect distant points in a clear and engaging way, that was my greatest satisfaction. During festivals, given the fast pace, I preferred to prepare graphics and plan content in advance, while also trying to make the audience feel as if they were there with us. It was in that context, in particular, that I focused most on more time-sensitive tools such as Instagram Stories.',
        it: 'Consapevole che i miei interessi potessero a volte spostarsi troppo verso temi e prodotti culturali di nicchia, il mio sforzo principale è sempre stato tradurli e adattarli per pubblici anche molto distanti dalla mia prospettiva. L’ho fatto inizialmente con i contenuti scritti e successivamente anche con i reel, un formato che ho trovato subito molto naturale. Quando riuscivo a collegare punti distanti in modo chiaro e coinvolgente era la soddisfazione più grande. Durante i festival, data la loro velocità, preferivo preparare grafiche e pianificare i contenuti in anticipo, cercando al tempo stesso di far sentire il pubblico come se fosse lì con noi. È stato proprio in quel contesto che mi sono concentrato di più su strumenti più legati al tempo reale, come le Stories di Instagram.',
      },
      skills: {
        en: ['Editorial planning', 'Content creation', 'Interviewing', 'Copywriting'],
        it: ['Pianificazione editoriale', 'Creazione di contenuti', 'Interviste', 'Copywriting'],
      },
      tools: [
        'Google Workspace',
        'Microsoft Office',
        'Canva',
        'CapCut',
        'Meta Business Suite',
        'WordPress',
        'Spotify',
      ],
      media: [
        {
          type: 'image',
          src: '/media/frames-cinema/du-welz-venezia.jpg',
          alt: {
            en: 'Meeting with French director Fabrice Du Welz at the Venice Film Festival',
            it: 'Incontro con il regista francese Fabrice Du Welz alla Mostra del Cinema di Venezia',
          },
          emphasis: 'md',
          caption: {
            en: 'A meeting with French director Fabrice Du Welz around the release of his latest film, Maldoror.',
            it: 'Un incontro con il regista francese Fabrice Du Welz in occasione dell’uscita del suo ultimo film, Maldoror.',
          },
          orientation: 'landscape',
        },
        {
          type: 'image',
          src: '/media/frames-cinema/intervista.jpg',
          alt: {
            en: 'Excerpt from an interview published on framescinema.com',
            it: 'Estratto da un’intervista pubblicata su framescinema.com',
          },
          caption: {
            en: 'An excerpt from the interview published on framescinema.com.',
            it: 'Un estratto dell’intervista pubblicata su framescinema.com.',
          },
          emphasis: 'md',
          orientation: 'landscape',
        },
        {
          type: 'video',
          src: '/media/frames-cinema/refn-masterclass.mp4',
          caption: {
            en: 'The cinema of Nicolas Winding Refn was one of the first I immediately loved, and in 2024 I attended his masterclass at the Venice Film Festival.',
            it: 'Il cinema di Nicolas Winding Refn è stato uno dei primi che ho amato fin da subito e nel 2024 ho seguito la sua masterclass alla Mostra del Cinema di Venezia.',
          },
          orientation: 'landscape',
          emphasis: 'md',
        },
        {
          type: 'video',
          src: '/media/frames-cinema/mastandrea.mp4',
          caption: {
            en: 'Claudio Caligari is a director who made only three films in his lifetime, and most of them remain largely unknown to the general public. I used Valerio Mastandrea’s birthday as an opportunity to talk about L’odore della notte, in which he gives one of the film’s central performances.',
            it: 'Claudio Caligari è un regista che ha realizzato solo tre film nella sua vita, e la maggior parte di essi resta in gran parte sconosciuta al grande pubblico. Ho usato il compleanno di Valerio Mastandrea come occasione per parlare di L’odore della notte, in cui offre una delle interpretazioni centrali del film.',
          },
          orientation: 'portrait',
          link: 'https://www.instagram.com/reel/C3VdIUQI6tC/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==',
        },
        {
          type: 'video',
          src: '/media/frames-cinema/reel-estranei.mp4',
          caption: {
            en: 'Applying semiotics to cinema is one of the most stimulating areas of inquiry in today’s visual culture. On Instagram I sometimes tried to bring that approach to newly released films, as in this reel on liminal spaces in All of Us Strangers.',
            it: 'Applicare la semiotica al cinema è uno degli ambiti di indagine più stimolanti nella cultura visiva contemporanea. Su Instagram ho provato di tanto in tanto a portare questo approccio anche su film appena usciti, come in questo reel sugli spazi liminali in All of Us Strangers.',
          },
          orientation: 'portrait',
          link: 'https://www.instagram.com/reel/C5YSHYlI0CQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        },
        {
          type: 'image',
          src: '/media/frames-cinema/podcast.png',
          alt: {
            en: 'Frames Cinema podcast episode on Steven Spielberg’s recent cinema',
            it: 'Episodio del podcast di Frames Cinema sul cinema recente di Steven Spielberg',
          },
          caption: {
            en: 'Podcast episode in which we reflect on what the science fiction and politics of Steven Spielberg’s recent cinema can tell us about the world we are living in.',
            it: 'Episodio del podcast in cui riflettiamo su cosa la fantascienza e la politica del cinema recente di Steven Spielberg possano dirci del mondo in cui viviamo.',
          },
          orientation: 'landscape',
          emphasis: 'md',
          link: 'https://open.spotify.com/episode/5mFmjwIX33AFKfYi8dgdkK?si=dbfa34ac8bac4988',
        },
      ],
    },
  },
  {
    slug: 'lucca-film-festival',
    title: {
      en: 'Lucca Film Festival Social Media Planning & Copywriting',
      it: 'Lucca Film Festival – Social media planning e copywriting',
    },
    category: 'B',
    categoryLabel: CAT_LABEL_B,
    type: {
      en: 'Festival communication / copywriting',
      it: 'Comunicazione festivaliera / copywriting',
    },
    year: { en: '2023', it: '2023' },
    cardDescription: {
      en: 'Communication and content work developed during my curricular internship at Lucca Film Festival. The project combines copywriting, editorial planning, social media, and cultural promotion in a live festival environment.',
      it: 'Lavoro di comunicazione e contenuti sviluppato durante il mio tirocinio curriculare al Lucca Film Festival. Il progetto unisce copywriting, pianificazione editoriale, social media e promozione culturale in un contesto festivaliero dal vivo.',
    },
    hasCaseStudy: true,
    logo: { src: '/logos/lucca.png', alt: 'Lucca Film Festival' },
    caseStudy: {
      context: {
        en: 'This project developed through my curricular internship as a copywriter, content creator, and social media manager for Lucca Film Festival 2023. It gave me the opportunity to test my skills in cultural promotion, event communication, and audience-facing content, where each piece of communication had to support the identity of the festival while remaining clear, timely, and engaging across platforms.',
        it: 'Questo progetto è nato dal mio tirocinio curriculare come copywriter, content creator e social media manager per il Lucca Film Festival 2023. Mi ha dato l’occasione di mettere alla prova le mie competenze nella promozione culturale, nella comunicazione di evento e nella produzione di contenuti rivolti al pubblico, dove ogni intervento doveva sostenere l’identità del festival restando al tempo stesso chiaro, tempestivo e coinvolgente sulle diverse piattaforme.',
      },
      whatIDid: {
        en: 'My work included writing copy for social media across Instagram and Meta channels, supporting the organisation of the social media planning, producing reels to present and promote the festival’s guest stars, and creating daily on-site video content to document the events of the festival as they unfolded.',
        it: 'Il mio lavoro ha incluso la scrittura di copy social per Instagram e per i canali Meta, il supporto all’organizzazione del piano editoriale social, la produzione di reel per presentare e promuovere gli ospiti del festival e la creazione quotidiana di contenuti video sul campo per raccontare gli eventi del festival mentre avvenivano.',
      },
      approach: {
        en: 'In the reels, I tried to build anticipation and engagement by drawing on films that were already somewhat familiar to the public and had been directed by, or involved, the festival’s guests. This allowed me to reach as wide an audience as possible without losing the more informative and interpretive side of the content. For post publication, we relied on the scheduling tools available through Meta Business Suite, which made it possible to plan content in advance while also covering the festival live through Instagram Stories. In the post copy, I always aimed for an empathetic approach while remaining concise and direct, so that the photographs could retain their own space and voice.',
        it: 'Nei reel ho cercato di costruire attesa e coinvolgimento partendo da film già relativamente noti al pubblico e diretti dagli ospiti del festival o legati a loro. Questo mi ha permesso di raggiungere un pubblico il più ampio possibile senza rinunciare al lato più informativo e interpretativo dei contenuti. Per la pubblicazione dei post abbiamo fatto affidamento sugli strumenti di programmazione di Meta Business Suite, che hanno reso possibile pianificare i contenuti in anticipo coprendo allo stesso tempo il festival in diretta tramite le Stories di Instagram. Nei copy dei post ho sempre cercato un approccio empatico, restando però conciso e diretto, in modo che le fotografie potessero mantenere il proprio spazio e la propria voce.',
      },
      skills: {
        en: ['Social media management', 'Copywriting', 'Content planning', 'Content creation'],
        it: ['Gestione social media', 'Copywriting', 'Pianificazione contenuti', 'Creazione di contenuti'],
      },
      tools: ['Google Workspace', 'Microsoft Office', 'Canva', 'CapCut', 'Meta Business Suite'],
      mediaRail: 'wide',
      media: [
        {
          type: 'image',
          src: '/media/lucca/feed.png',
          alt: {
            en: 'Overview of the Lucca Film Festival Instagram feed during the festival',
            it: 'Panoramica del feed Instagram del Lucca Film Festival durante il festival',
          },
          caption: {
            en: 'Overview of the Instagram feed during the days of the festival.',
            it: 'Panoramica del feed Instagram nei giorni del festival.',
          },
          orientation: 'landscape',
          emphasis: 'lg',
        },
        {
          type: 'image',
          src: '/media/lucca/arancia.png',
          alt: {
            en: 'Community-building post for the tenth anniversary of Lucca Effetto Cinema',
            it: 'Post di community building per il decennale di Lucca Effetto Cinema',
          },
          caption: {
            en: 'Community-building post created for the tenth anniversary of Lucca Effetto Cinema.',
            it: 'Post di community building creato per il decennale di Lucca Effetto Cinema.',
          },
          orientation: 'landscape',
          emphasis: 'lg',
        },
        {
          type: 'image',
          src: '/media/lucca/storia-1.png',
          alt: {
            en: 'Opening festival Instagram story designed as a call to action',
            it: 'Storia Instagram di apertura del festival pensata come call to action',
          },
          caption: {
            en: 'Opening festival story designed as a call to action.',
            it: 'Storia di apertura del festival pensata come call to action.',
          },
          orientation: 'portrait',
        },
        {
          type: 'image',
          src: '/media/lucca/storia-2.png',
          alt: {
            en: 'Instagram story announcing one of the festival juries',
            it: 'Storia Instagram che annuncia una delle giurie del festival',
          },
          caption: {
            en: 'Story announcing one of the festival juries.',
            it: 'Storia che annuncia una delle giurie del festival.',
          },
          orientation: 'portrait',
        },
        {
          type: 'video',
          src: '/media/lucca/reel-mario-martone.mp4',
          caption: {
            en: 'Presentation reel for guest Mario Martone, built around his latest film at the time, Nostalgia.',
            it: 'Reel di presentazione per l’ospite Mario Martone, costruito attorno al suo ultimo film all’epoca, Nostalgia.',
          },
          orientation: 'portrait',
        },
      ],
    },
  },

  // ─── Category C ───────────────────────────────────────────────────────────
  {
    slug: 'tupperware',
    title: { en: 'Tupperware Relaunch Strategy', it: 'Tupperware: strategia di rilancio' },
    category: 'C',
    categoryLabel: CAT_LABEL_C,
    type: {
      en: 'Academic / strategic marketing project',
      it: 'Progetto accademico / strategia di marketing',
    },
    year: { en: 'February 2026', it: 'Febbraio 2026' },
    cardDescription: {
      en: "An academic marketing strategy group project focused on Tupperware's relaunch after its recent crisis. The work draws on brand diagnosis, positioning, and competitive analysis to build a more relevant and differentiated strategic direction.",
      it: 'Un progetto accademico di strategia di marketing svolto in gruppo, dedicato al rilancio di Tupperware dopo la sua recente crisi. Il lavoro si basa su diagnosi di brand, posizionamento e analisi competitiva per costruire una direzione strategica più rilevante e differenziata.',
    },
    hasCaseStudy: true,
    logo: { src: '/logos/bbs.png', alt: 'Bologna Business School' },
    caseStudy: {
      context: {
        en: "This academic marketing strategy project was developed within my postgraduate program in Digital Marketing and Communication at Bologna Business School as part of a group assignment. The brief focused on Tupperware's recent crisis and on how the brand could be repositioned in a market shaped by mobility, conscious consumption, health concerns, and increasingly fast-paced everyday routines. The project explored how its heritage of quality, durability, and reliability could be reactivated in a more contemporary context marked by reduced cultural relevance, market saturation, and stronger competition from convenience-driven alternatives.",
        it: 'Questo progetto accademico di strategia di marketing è stato sviluppato all’interno del mio master in Digital Marketing and Communication alla Bologna Business School, come lavoro di gruppo. Il brief si concentrava sulla recente crisi di Tupperware e su come il brand potesse essere riposizionato in un mercato segnato da mobilità, consumo consapevole, attenzione alla salute e routine quotidiane sempre più veloci. Il progetto ha esplorato come la sua eredità di qualità, durabilità e affidabilità potesse essere riattivata in un contesto contemporaneo caratterizzato da minore rilevanza culturale, saturazione di mercato e maggiore concorrenza da parte di alternative orientate alla comodità.',
      },
      whatIDid: {
        en: 'The project was developed collaboratively, while my own contribution focused especially on the strategic articulation of the relaunch proposal. I worked on framing the diagnosis of the brand through competitor comparison, insight synthesis, positioning logic, and the translation of research into a clearer strategic direction. In practice, this meant helping define how Tupperware could move from being perceived as an outdated household brand toward a more relevant proposition centred on everyday use, portability, and sustainability.',
        it: 'Il progetto è stato sviluppato in modo collaborativo, mentre il mio contributo si è concentrato in particolare sull’articolazione strategica della proposta di rilancio. Ho lavorato sull’inquadramento diagnostico del brand attraverso il confronto con i competitor, la sintesi degli insight, la logica di posizionamento e la traduzione della ricerca in una direzione strategica più chiara. In pratica, questo ha significato contribuire a definire come Tupperware potesse passare dall’essere percepito come un brand domestico datato a una proposta più rilevante centrata su uso quotidiano, portabilità e sostenibilità.',
      },
      approach: {
        en: 'Our approach combined strategic diagnosis with a repositioning proposal grounded in consumer behaviour and market context. The project used a 5Cs analysis and a SWOT framework to identify the main tensions around the brand and from there we built the relaunch around a set of insights tied especially to Gen Z, including environmental concern, interest in zero-waste habits, willingness to pay for pro-social and healthy products, the importance of aesthetic appeal, and the growing relevance of cooking, takeaway, and meal consumption in professional or on-the-go contexts. On that basis, the project proposed Tupperware as a more contemporary system of reusable food solutions built around on-the-go reliability. The strategic direction was then extended into a communication and activation idea based on “slacktivism”, a low-effort sustainability initiative in which consumers would recycle old containers through in-store collection points and receive a voucher toward the new Tupperware line, reinforcing both participation and the brand\'s long-term promise.',
        it: 'Il nostro approccio ha unito una diagnosi strategica a una proposta di riposizionamento radicata nei comportamenti dei consumatori e nel contesto di mercato. Il progetto si è servito di un’analisi 5C e di un quadro SWOT per individuare le principali tensioni intorno al brand; da qui abbiamo costruito il rilancio intorno a una serie di insight legati in particolare alla Gen Z, tra cui la sensibilità ambientale, l’interesse per le abitudini zero-waste, la disponibilità a pagare per prodotti pro-sociali e salutari, l’importanza dell’estetica e la crescente rilevanza di cucina, takeaway e consumo dei pasti in contesti professionali o in mobilità. Su queste basi il progetto ha proposto Tupperware come un sistema più contemporaneo di soluzioni alimentari riutilizzabili, costruito intorno all’affidabilità in mobilità. La direzione strategica è stata poi estesa a un’idea di comunicazione e attivazione basata sullo “slacktivism”, un’iniziativa di sostenibilità a basso sforzo in cui i consumatori riciclerebbero i vecchi contenitori attraverso punti di raccolta in negozio per ricevere un voucher sulla nuova linea Tupperware, rafforzando insieme partecipazione e promessa di lungo termine del brand.',
      },
      skills: {
        en: ['Brand strategy', 'Positioning', 'Competitive analysis', 'Strategic planning'],
        it: ['Brand strategy', 'Posizionamento', 'Analisi competitiva', 'Pianificazione strategica'],
      },
      mediaRail: 'extra-wide',
      media: [
        {
          type: 'image',
          src: '/media/Strategy/tupperware-1.png',
          alt: {
            en: 'Cover slide of the Tupperware relaunch strategy presentation',
            it: 'Slide di copertina della presentazione di strategia di rilancio Tupperware',
          },
          orientation: 'portrait',
          caption: { en: '', it: '' },
          pairCaption: {
            en: 'Our strategic diagnosis of Tupperware, developed through SWOT analysis. This section frames the relaunch by identifying the brand’s heritage, current weaknesses, market context, and competitive pressures.',
            it: 'La nostra diagnosi strategica di Tupperware, sviluppata attraverso l’analisi SWOT. Questa sezione inquadra il rilancio individuando l’eredità del brand, le debolezze attuali, il contesto di mercato e le pressioni competitive.',
          },
          pairStacked: true,
          emphasis: 'md',
          link: '/media/Strategy/tupperware.pdf',
          linkLabel: {
            en: 'Click here for the full project PDF',
            it: 'Clicca qui per il PDF completo del progetto',
          },
        },
        {
          type: 'image',
          src: '/media/Strategy/tupperware-2.png',
          alt: {
            en: 'Strategic diagnosis slide with 5Cs and SWOT analysis',
            it: 'Slide di diagnosi strategica con analisi 5C e SWOT',
          },
          orientation: 'portrait',
          caption: { en: '', it: '' },
        },
        {
          type: 'image',
          src: '/media/Strategy/tupperware-3.png',
          alt: {
            en: 'Proposed positioning statement slide for Tupperware',
            it: 'Slide della positioning statement proposta per Tupperware',
          },
          orientation: 'portrait',
          caption: { en: '', it: '' },
          pairCaption: {
            en: 'Slides presenting the proposed positioning statement together with the product mockup developed for the relaunch. This part translates the strategic diagnosis into a more concrete direction, connecting everyday use, portability, and reusable product logic.',
            it: 'Le slide che presentano la positioning statement proposta insieme al mockup di prodotto sviluppato per il rilancio. Questa parte traduce la diagnosi strategica in una direzione più concreta, collegando uso quotidiano, portabilità e logica di prodotto riutilizzabile.',
          },
          pairStacked: true,
          emphasis: 'md',
        },
        {
          type: 'image',
          src: '/media/Strategy/tupperware-4.png',
          alt: {
            en: 'Product mockup developed for the Tupperware relaunch',
            it: 'Mockup di prodotto sviluppato per il rilancio di Tupperware',
          },
          orientation: 'portrait',
          caption: { en: '', it: '' },
        },
      ],
    },
  },
  {
    slug: 'jordan',
    title: {
      en: 'Jordan: Heroic Storytelling and Cultural Positioning',
      it: 'Jordan: storytelling eroico e posizionamento culturale',
    },
    category: 'C',
    categoryLabel: CAT_LABEL_C,
    type: { en: 'Brand analysis project', it: 'Progetto di analisi di brand' },
    year: { en: 'December 2025', it: 'Dicembre 2025' },
    cardDescription: {
      en: 'A strategic brand analysis of Jordan focused on archetype, storytelling, and cultural positioning. The project ties together semiotics and communication strategy to explain how the brand turns performance and aspiration into a coherent identity system.',
      it: 'Un’analisi strategica del brand Jordan incentrata su archetipo, storytelling e posizionamento culturale. Il progetto unisce semiotica e strategia di comunicazione per spiegare come il brand trasformi performance e aspirazione in un sistema identitario coerente.',
    },
    hasCaseStudy: true,
    logo: { src: '/logos/bbs.png', alt: 'Bologna Business School' },
    caseStudy: {
      context: {
        en: "This project is an individual brand analysis developed for the Communication and Storytelling course within my Master's in Digital Marketing and Communication at Bologna Business School. Although the Jordan universe now extends well beyond basketball shoes into apparel, charitable initiatives, and broader cultural positioning, I chose to focus specifically on the Air Jordan footwear line in order to keep the analysis methodologically clear and consistent. The aim was to understand how the brand has built a recognisable identity by turning performance, aspiration, discipline, and symbolic intensity into a coherent narrative system that extends well beyond product.",
        it: 'Questo progetto è un’analisi di brand individuale sviluppata per il corso di Communication and Storytelling all’interno del mio master in Digital Marketing and Communication alla Bologna Business School. Benché l’universo Jordan si estenda ormai ben oltre le scarpe da basket fino all’abbigliamento, alle iniziative benefiche e a un più ampio posizionamento culturale, ho scelto di concentrarmi specificamente sulla linea calzature Air Jordan per mantenere l’analisi metodologicamente chiara e coerente. L’obiettivo era capire come il brand abbia costruito un’identità riconoscibile trasformando performance, aspirazione, disciplina e intensità simbolica in un sistema narrativo coerente che si estende ben oltre il prodotto.',
      },
      whatIDid: {
        en: "I analysed Air Jordan through the combined lens of semiotics and communication strategy, looking at its historical development, archetypal structure, narrative logic, and discursive organisation. More specifically, I examined how the brand moves from its foundational “Banned” mythology in the 1980s to a more articulated system based on repeated work, pressure, and proof, and how that system is sustained across different touchpoints. I also explored the relationship between Jordan and Nike, the meaning of the Jumpman logo, the logic of key slogans, and the way a recent campaign such as “Zero Pressure” translates the brand's symbolic values into a contemporary performance narrative. The project was then extended to the brand's website and Instagram presence in order to understand how the same identity is maintained across product communication and digital channels.",
        it: 'Ho analizzato Air Jordan attraverso la doppia lente della semiotica e della strategia di comunicazione, osservandone lo sviluppo storico, la struttura archetipica, la logica narrativa e l’organizzazione discorsiva. Più nello specifico, ho esaminato come il brand passi dalla mitologia fondativa di “Banned” degli anni Ottanta a un sistema più articolato basato su lavoro reiterato, pressione e prova, e come tale sistema venga sostenuto attraverso i diversi touchpoint. Ho esplorato anche la relazione tra Jordan e Nike, il significato del logo Jumpman, la logica degli slogan chiave e il modo in cui una campagna recente come “Zero Pressure” traduca i valori simbolici del brand in una narrazione performativa contemporanea. Il progetto è stato poi esteso al sito e alla presenza Instagram del brand per capire come la stessa identità venga mantenuta attraverso comunicazione di prodotto e canali digitali.',
      },
      approach: {
        en: 'I treated Air Jordan as a storytelling system organised around a stable symbolic structure. At its core, the brand is built on the Hero archetype: the individual who chooses to step into the arena, accept responsibility, and pursue greatness through discipline. At the narrative level, this becomes a Quest, in which the athlete moves toward a distant reward. From there, I connected this logic to the wider Jordan/Nike symbolic system. The Nike name, Swoosh, and “Just Do It” slogan establish a larger semantics of victory, propulsion, and action, while the Jumpman condenses Jordan into a recognisable but adaptable silhouette that allows identification beyond the individual athlete. This makes it possible for the brand to remain consistent across different moments and media: from early slogans centred on flight, to more technical promises such as “Tailored for Flight,” to recent narratives such as “Zero Pressure,” where pressure itself becomes the central antagonist. In this sense, the project reads Jordan as a brand that communicates a broader cultural promise of self-surpassing, proof, and personal emergence.',
        it: 'Ho trattato Air Jordan come un sistema narrativo organizzato attorno a una struttura simbolica stabile. Alla base, il brand è costruito sull’archetipo dell’Eroe: l’individuo che sceglie di entrare nell’arena, di assumersi la responsabilità e di perseguire la grandezza attraverso la disciplina. Sul piano narrativo questo diventa una Quest, in cui l’atleta procede verso una ricompensa lontana. Da qui ho collegato la logica al più ampio sistema simbolico Jordan/Nike. Il nome Nike, lo Swoosh e lo slogan “Just Do It” fondano una semantica più ampia di vittoria, spinta e azione, mentre il Jumpman condensa Jordan in una silhouette riconoscibile ma adattabile, che consente un’identificazione che va oltre il singolo atleta. Questo permette al brand di restare coerente attraverso momenti e media diversi: dai primi slogan centrati sul volo, alle promesse più tecniche come “Tailored for Flight”, alle narrazioni recenti come “Zero Pressure”, dove la pressione stessa diventa l’antagonista centrale. In questo senso il progetto legge Jordan come brand che comunica una più ampia promessa culturale di superamento di sé, di prova e di emergenza personale.',
      },
      skills: {
        en: ['Brand strategy', 'Brand storytelling', 'Content strategy', 'Competitive analysis'],
        it: ['Brand strategy', 'Brand storytelling', 'Content strategy', 'Analisi competitiva'],
      },
      mediaRail: 'extra-wide',
      media: [
        {
          type: 'image',
          src: '/media/Jordan/jordan-1.png',
          alt: {
            en: 'Table of contents of the Jordan brand analysis project',
            it: 'Indice del progetto di analisi del brand Jordan',
          },
          orientation: 'portrait',
          caption: { en: '', it: '' },
          pairCaption: {
            en: 'The opening section of the project, including the table of contents and the introduction’s diachronic approach. This part shows how Nike and Jordan gradually built a system of symbolic synergies and discursive regimes over time, moving from brand origin to a more structured narrative and strategic identity.',
            it: 'La sezione iniziale del progetto, comprensiva dell’indice e dell’approccio diacronico dell’introduzione. Questa parte mostra come Nike e Jordan abbiano costruito gradualmente, nel tempo, un sistema di sinergie simboliche e regimi discorsivi, passando dall’origine del brand a un’identità narrativa e strategica più strutturata.',
          },
          pairStacked: true,
          emphasis: 'md',
          link: '/media/Jordan/jordan.pdf',
          linkLabel: {
            en: 'Click here for the full project PDF',
            it: 'Clicca qui per il PDF completo del progetto',
          },
        },
        {
          type: 'image',
          src: '/media/Jordan/jordan-2.png',
          alt: {
            en: 'Introduction slide showing the diachronic approach of the analysis',
            it: 'Slide di introduzione che mostra l’approccio diacronico dell’analisi',
          },
          orientation: 'portrait',
          caption: { en: '', it: '' },
        },
        {
          type: 'image',
          src: '/media/Jordan/jordan-3.png',
          alt: {
            en: 'Analysis of the Nike symbolic system',
            it: 'Analisi del sistema simbolico Nike',
          },
          orientation: 'portrait',
          caption: { en: '', it: '' },
          pairCaption: {
            en: 'A closer look at the symbolic system activated by the Nike brand together with an excerpt from Jordan’s ‘Zero Pressure’ campaign. This part helps explain how the brand’s core values are translated into advertising through visual codes, slogans, and testimonial-based storytelling.',
            it: 'Uno sguardo più ravvicinato al sistema simbolico attivato dal brand Nike, insieme a un estratto della campagna “Zero Pressure” di Jordan. Questa parte aiuta a spiegare come i valori centrali del brand vengano tradotti in pubblicità attraverso codici visivi, slogan e narrazione testimoniale.',
          },
          pairStacked: true,
          emphasis: 'md',
        },
        {
          type: 'image',
          src: '/media/Jordan/jordan-4.png',
          alt: {
            en: 'Excerpt from the Jordan Zero Pressure campaign analysis',
            it: 'Estratto dall’analisi della campagna Zero Pressure di Jordan',
          },
          orientation: 'portrait',
          caption: { en: '', it: '' },
        },
      ],
    },
  },
  {
    slug: 'bbs-canteen-coffee',
    title: {
      en: 'BBS Canteen Coffee Experience: A Data Analysis Project',
      it: 'BBS Canteen Coffee Experience: un progetto di Data Analysis',
    },
    category: 'C',
    categoryLabel: CAT_LABEL_C,
    type: { en: 'Academic group project', it: 'Progetto accademico di gruppo' },
    year: { en: 'December 2025', it: 'Dicembre 2025' },
    cardDescription: {
      en: 'An academic group project developed for the Data Analysis course, based on a survey of student coffee habits and satisfaction at the BBS New Campus. The project translates research findings into recommendations on quality perception, milk variety, presentation, and service.',
      it: 'Un progetto accademico di gruppo sviluppato per il corso di Data Analysis, basato su un sondaggio sulle abitudini di consumo del caffè e sulla soddisfazione degli studenti del BBS New Campus. Il progetto traduce i risultati della ricerca in raccomandazioni su percezione di qualità, varietà di latte, presentazione e servizio.',
    },
    hasCaseStudy: true,
    logo: { src: '/logos/bbs.png', alt: 'Bologna Business School' },
    caseStudy: {
      context: {
        en: "This academic group project was developed for the Data Analysis course within the Master's in Digital Marketing and Communication at Bologna Business School. The project focused on coffee habits and satisfaction among students at the BBS New Campus, using survey data to understand consumption patterns, perceived quality, service evaluation, and word of mouth. More broadly, it treated a very ordinary campus touchpoint - coffee - as a small but revealing consumer experience shaped by routine, price perception, product variety, and presentation.",
        it: 'Questo progetto accademico di gruppo è stato sviluppato per il corso di Data Analysis all’interno del master in Digital Marketing and Communication alla Bologna Business School. Il progetto si è concentrato sulle abitudini di consumo del caffè e sulla soddisfazione degli studenti del BBS New Campus, usando i dati del sondaggio per comprendere pattern di consumo, qualità percepita, valutazione del servizio e passaparola. Più in generale, ha trattato un touchpoint molto ordinario del campus - il caffè - come una piccola ma rivelatrice esperienza di consumo plasmata da routine, percezione del prezzo, varietà di prodotto e presentazione.',
      },
      whatIDid: {
        en: 'The project was developed collaboratively, while my own contribution focused especially on designing the survey questions and helping define the most relevant improvement opportunities. I worked on shaping the questionnaire so that it could capture both habits and evaluation criteria, covering areas such as consumption frequency, preferred drinks, quality perception, satisfaction, and likelihood to recommend. I also contributed to the final managerial reasoning by identifying possible interventions that could improve the overall experience, particularly around presentation, milk variety, and small loyalty-oriented solutions.',
        it: 'Il progetto è stato sviluppato in modo collaborativo, mentre il mio contributo si è concentrato in particolare sulla progettazione delle domande del sondaggio e sulla definizione delle opportunità di miglioramento più rilevanti. Ho lavorato sulla strutturazione del questionario in modo che potesse cogliere sia le abitudini sia i criteri di valutazione, coprendo aree come frequenza di consumo, bevande preferite, qualità percepita, soddisfazione e propensione a raccomandare. Ho contribuito inoltre al ragionamento manageriale finale, individuando possibili interventi capaci di migliorare l’esperienza complessiva, in particolare su presentazione, varietà di latte e piccole soluzioni orientate alla fidelizzazione.',
      },
      approach: {
        en: 'Our approach relies on survey-based research with practical interpretation. Data was collected through Google Forms using multiple-choice questions and 1-to-7 rating scales, producing 111 responses across five sections. From there, the project moved from descriptive profiling and habit analysis to the evaluation of key variables such as taste, quality, service, appearance, milk options, price, overall satisfaction, and likelihood to recommend. The analytical logic was then extended through linear regression and an importance-performance framework in order to identify where intervention would be most useful. This allowed the project to move from data collection to actionable suggestions, including improvements in presentation, milk variety, loyalty mechanisms, and takeaway cup design.',
        it: 'Il nostro approccio si fonda su una ricerca basata su sondaggio con un’interpretazione di taglio pratico. I dati sono stati raccolti tramite Google Forms con domande a scelta multipla e scale di valutazione da 1 a 7, producendo 111 risposte distribuite su cinque sezioni. Da qui il progetto è passato dal profiling descrittivo e dall’analisi delle abitudini alla valutazione di variabili chiave come gusto, qualità, servizio, aspetto, opzioni di latte, prezzo, soddisfazione complessiva e propensione a raccomandare. La logica analitica è stata poi estesa attraverso una regressione lineare e un quadro di importance-performance per identificare gli ambiti in cui l’intervento sarebbe risultato più utile. Questo ha permesso al progetto di passare dalla raccolta dei dati a suggerimenti azionabili, tra cui miglioramenti su presentazione, varietà di latte, meccanismi di fidelizzazione e design del bicchiere takeaway.',
      },
      skills: {
        en: ['Survey design', 'Data interpretation', 'Customer satisfaction analysis', 'Problem framing'],
        it: ['Progettazione di sondaggi', 'Interpretazione dei dati', 'Analisi della customer satisfaction', 'Inquadramento del problema'],
      },
      mediaRail: 'extra-wide',
      media: [
        {
          type: 'image',
          src: '/media/Datanalysis/data-1.png',
          alt: {
            en: 'Opening slide of the BBS Canteen Coffee Experience project',
            it: 'Slide di apertura del progetto BBS Canteen Coffee Experience',
          },
          emphasis: 'md',
          caption: {
            en: 'Opening slide of the group project developed for the Data Analysis course, focused on the coffee experience at the BBS New Campus.',
            it: 'Slide di apertura del progetto di gruppo sviluppato per il corso di Data Analysis, dedicato all’esperienza del caffè al BBS New Campus.',
          },
          link: '/media/Datanalysis/Data-analysis.pdf',
          linkLabel: {
            en: 'Click here for the full project PDF',
            it: 'Clicca qui per il PDF completo del progetto',
          },
        },
        {
          type: 'image',
          src: '/media/Datanalysis/data-2.png',
          alt: {
            en: 'Survey results on student coffee habits and consumption moments',
            it: 'Risultati del sondaggio sulle abitudini di consumo e sui momenti di consumo del caffè degli studenti',
          },
          emphasis: 'md',
          caption: {
            en: 'Slides summarising student coffee habits, preferred drink types, price perception, and moments of consumption, helping define the behavioural profile behind the canteen experience.',
            it: 'Le slide che riassumono le abitudini di consumo del caffè degli studenti, le bevande preferite, la percezione del prezzo e i momenti di consumo, contribuendo a definire il profilo comportamentale alla base dell’esperienza in mensa.',
          },
        },
        {
          type: 'image',
          src: '/media/Datanalysis/data-3.png',
          alt: {
            en: 'Survey results on milk options and perceived price',
            it: 'Risultati del sondaggio su opzioni di latte e prezzo percepito',
          },
          emphasis: 'md',
          caption: {
            en: 'A closer look at two evaluative variables in the survey: satisfaction with milk options and perceived price, both useful for understanding where the service feels aligned or limited.',
            it: 'Uno sguardo più ravvicinato a due variabili valutative del sondaggio: soddisfazione per le opzioni di latte e prezzo percepito, utili entrambe a capire dove il servizio risulta allineato o limitato.',
          },
        },
        {
          type: 'image',
          src: '/media/Datanalysis/data-4.png',
          alt: {
            en: 'Linear regression output identifying drivers of satisfaction',
            it: 'Output della regressione lineare che individua i driver di soddisfazione',
          },
          emphasis: 'md',
          caption: {
            en: 'Linear regression output used to identify which variables most strongly influenced overall satisfaction and recommendation.',
            it: 'Output della regressione lineare usato per individuare quali variabili abbiano influenzato in modo più marcato la soddisfazione complessiva e la propensione a raccomandare.',
          },
        },
        {
          type: 'image',
          src: '/media/Datanalysis/data-5.png',
          alt: {
            en: 'Final improvement proposals slide',
            it: 'Slide con le proposte finali di miglioramento',
          },
          emphasis: 'md',
          caption: {
            en: 'Final improvement proposals translating the analysis into practical actions, from milk variety and loyalty mechanisms to cup redesign and presentation upgrades.',
            it: 'Proposte finali di miglioramento che traducono l’analisi in azioni concrete, dalla varietà di latte e dai meccanismi di fidelizzazione alla riprogettazione del bicchiere e al miglioramento della presentazione.',
          },
        },
      ],
    },
  },
]

export function getProjectsByCategory(categoryId: CategoryId): Project[] {
  return projects.filter((p) => p.category === categoryId)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getCaseStudySlugs(): string[] {
  return projects.filter((p) => p.hasCaseStudy).map((p) => p.slug)
}
