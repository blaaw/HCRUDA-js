# HCRUDA — Design System para agentes IA / LLMs

> **Contrato de uso.** Este documento es la ÚNICA fuente de verdad visual de HCRUDA (ERP/CRM hospitalario).
> Cada vez que escribas, modifiques o revises CSS, HTML con estilos, componentes (React/Vue/Svelte/etc.), Tailwind, styled-components o cualquier UI, **debes seguir este documento sin excepción**.
> Si una instrucción del usuario contradice este documento, avisa del conflicto antes de actuar.
> Palabras clave: **DEBES** = obligatorio · **NUNCA** = prohibido · **PUEDES** = opcional.

---

## 0. Resumen en 10 líneas (léelo siempre)

1. Estética: **Neumorphism (Soft UI) minimalista y sutil**, monocromática en escala de grises azulados, con **un único acento cian**.
2. Todo elemento (botón, input, tarjeta, tabla, tooltip, scrollbar, badge, avatar…) está **modelado con luz y sombra sobre la misma superficie**: parece extruido (convexo) o hundido (cóncavo) del mismo material que el fondo.
3. **Luz siempre desde arriba-izquierda.** Sombra clara arriba-izquierda, sombra oscura abajo-derecha. Nunca al revés.
4. **Convexo = se puede pulsar / contiene / está elevado. Cóncavo = se escribe, se muestra un dato, está pulsado o seleccionado.**
5. La **"firma del logo"**: contorno doble con una **línea cian fina interior**. Aparece en estados activos/primarios/foco/seleccionado y en contenedores destacados.
6. **Cero bordes duros, cero negros, cero blancos puros, cero sombras grises neutras.**
7. Tipografía **sans ancha**, geométrica, con títulos y etiquetas en **MAYÚSCULAS con tracking amplio** (como la palabra "CRUDA" del logo).
8. **Minimalismo:** mucho aire, pocos elementos, sin decoración gratuita, sin degradados vistosos.
9. **Contexto hospitalario:** la legibilidad y la accesibilidad (WCAG AA) mandan sobre la estética. Si hay conflicto, gana la legibilidad (ver §10).
10. **Usa siempre tokens (`var(--…)`)**, nunca valores hexadecimales o sombras escritos a mano en los componentes.

---

## 1. Identidad

| Atributo | Valor |
|---|---|
| Producto | **HCRUDA** — ERP/CRM para hospitales |
| Personalidad | Serena, precisa, táctil, confiable, limpia |
| Estética | Neumorphism / Soft UI minimalista y sutil |
| Paleta | Grises azulados fríos + 1 acento cian |
| Tema | **Solo claro.** NO inventes modo oscuro salvo petición explícita |
| Tono visual | Silencioso: la interfaz no grita, el contenido clínico es protagonista |

**Referencias de linaje estético** (para entender el espíritu, no para copiar):
Soft UI / Neumorphism (concepto bancario de Alexander Plyuto, 2019, que popularizó el estilo), generadores tipo neumorphism.io, plantillas "Soft UI Dashboard" y, de fondo, el diseño industrial táctil de Dieter Rams/Braun (botones físicos, superficies mate, un único color de acento).
**Lección clave de esas referencias:** el neumorfismo puro falla en contraste y accesibilidad; HCRUDA lo corrige con las reglas del §10.

---

## 2. Anatomía del logo (lo que debes replicar en cada elemento)

El logo es un **icono de app tipo squircle** con una letra **H** (de hospital, con el travesaño prolongado a los lados como una cruz médica) y la palabra **CRUDA** en el travesaño. Observa estos 7 rasgos; todos los componentes los heredan:

1. **Monomaterial:** fondo, icono y letra son la *misma superficie* gris azulada. No hay un color de relleno distinto; la forma se percibe SOLO por luz y sombra.
2. **Squircle contenedor hundido:** el cuadrado de esquinas muy redondeadas (~28 % del lado) está **cóncavo** (inset), como un hueco tallado en el panel.
3. **Forma interior convexa:** la "H" sobresale del hueco, con **bisel** (borde suave que atrapa luz arriba-izquierda y sombra abajo-derecha).
4. **Doble contorno / escalón:** el borde de la H tiene un **escalón**: bisel exterior convexo → canal → cara interior ligeramente rebajada. Es un "marco dentro de un marco".
5. **Línea cian interior:** un hilo cian fino (~1.5 px a escala UI), con glow muy tenue, recorre el contorno **dentro** de la cara rebajada, a ~6–8 px del borde. Es el único color del logo.
6. **Esquinas pequeñas pero redondeadas** en las formas internas (radio pequeño), y radio grande en el contenedor.
7. **Wordmark "CRUDA":** mayúsculas, peso semibold/bold, sans ancha, tracking amplio, color cian.

> **Traducción a UI:** *superficie única + extrusión/hundimiento por doble sombra + escalón de doble contorno + hilo cian como acento + mayúsculas anchas para etiquetas.*

---

## 3. Tokens (copia tal cual en `:root`)

> Los hex son **estimaciones calibradas desde el logo**. Una vez definidos aquí, estos tokens son la verdad: no los recalcules.

```css
:root {
  /* ───────── SUPERFICIES (escala de grises azulados) ───────── */
  --nm-bg:        #D3D9E2;  /* canvas y superficie base de TODO */
  --nm-bg-hi:     #DCE2EA;  /* cara convexa, parte iluminada */
  --nm-bg-lo:     #CAD1DB;  /* cara convexa, parte en sombra / pozos inset */
  --nm-light:     #F4F7FB;  /* sombra/highlight de luz (arriba-izq.) */
  --nm-dark:      #A5AFBD;  /* sombra oscura (abajo-der.) */
  --nm-hairline:  rgb(150 162 180 / .35); /* hilo sutil de separación */

  /* ───────── TEXTO (todos cumplen AA sobre --nm-bg) ───────── */
  --text-strong:   #2B3340;  /* ratio ≈ 9:1  · títulos, datos clave */
  --text-default:  #3A4452;  /* cuerpo */
  --text-muted:    #4E5868;  /* ratio ≈ 5:1  · secundario */
  --text-disabled: #8A94A3;  /* solo para deshabilitado (exento de AA) */

  /* ───────── ACENTO CIAN (el color del logo) ───────── */
  --cyan-100: #DDF3F8;
  --cyan-200: #B4E6F0;
  --cyan-300: #8BD9E8;  /* hilo interior de la firma del logo */
  --cyan-400: #5CC8DC;  /* glows, rellenos de progreso, foco */
  --cyan-500: #3DBAD0;  /* cian "CRUDA" — SOLO texto grande/decorativo (≥ 24px o ≥ 18.5px bold) y iconos grandes */
  --cyan-600: #1F9BB2;  /* iconos activos, anillo de foco */
  --cyan-700: #0B6475;  /* ✅ TEXTO cian accesible (ratio ≈ 4.8:1) — usar para links y texto de acción */

  /* ───────── SEMÁNTICOS (desaturados, nunca como fondo de superficie) ───────── */
  --ok:     #2F8F6B;
  --warn:   #A86A12;
  --danger: #B5453F;
  --info:   var(--cyan-700);

  /* ───────── DEGRADADOS DE SUPERFICIE (sutiles, 145°) ───────── */
  --grad-raised: linear-gradient(145deg, var(--nm-bg-hi), var(--nm-bg-lo));
  --grad-sunken: linear-gradient(145deg, var(--nm-bg-lo), var(--nm-bg-hi));

  /* ───────── SOMBRAS CONVEXAS (elevación) ───────── */
  --sh-raised-1: 3px 3px 6px var(--nm-dark),   -3px -3px 6px var(--nm-light);
  --sh-raised-2: 6px 6px 12px var(--nm-dark),  -6px -6px 12px var(--nm-light);
  --sh-raised-3: 10px 10px 20px var(--nm-dark), -10px -10px 20px var(--nm-light);
  --sh-raised-4: 16px 16px 32px var(--nm-dark), -16px -16px 32px var(--nm-light);

  /* ───────── SOMBRAS CÓNCAVAS (hundido) ───────── */
  --sh-inset-1: inset 2px 2px 4px var(--nm-dark),  inset -2px -2px 4px var(--nm-light);
  --sh-inset-2: inset 4px 4px 8px var(--nm-dark),  inset -4px -4px 8px var(--nm-light);
  --sh-inset-3: inset 8px 8px 16px var(--nm-dark), inset -8px -8px 16px var(--nm-light);

  /* ───────── GLOW CIAN (acento, siempre tenue) ───────── */
  --glow-cyan: 0 0 8px rgb(92 200 220 / .30);

  /* ───────── RADIOS (squircle: muy redondeado) ───────── */
  --r-xs: 6px;
  --r-sm: 10px;   /* chips, checkbox, tooltips */
  --r-md: 16px;   /* botones, inputs */
  --r-lg: 24px;   /* tarjetas, paneles */
  --r-xl: 32px;   /* modales, contenedores hero */
  --r-pill: 999px;

  /* ───────── ESPACIADO (base 4px) ───────── */
  --sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px; --sp-4: 16px;
  --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 64px;

  /* ───────── TIPOGRAFÍA ───────── */
  --font-sans: "Lexend", "Montserrat", "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
  --tracking-label: .08em;   /* etiquetas/botones en MAYÚSCULAS */
  --tracking-wordmark: .14em;/* títulos de marca / headers de sección */

  /* ───────── MOVIMIENTO ───────── */
  --ease: cubic-bezier(.2, .8, .2, 1);
  --dur-fast: 120ms;
  --dur: 180ms;
  --dur-slow: 280ms;

  /* ───────── FOCO ───────── */
  --focus-ring: 0 0 0 2px var(--nm-bg), 0 0 0 4px var(--cyan-600);
}

/* Pantallas pequeñas: sombras más cortas para no saturar */
@media (max-width: 640px) {
  :root {
    --sh-raised-1: 2px 2px 4px var(--nm-dark),   -2px -2px 4px var(--nm-light);
    --sh-raised-2: 4px 4px 8px var(--nm-dark),   -4px -4px 8px var(--nm-light);
    --sh-raised-3: 6px 6px 12px var(--nm-dark),  -6px -6px 12px var(--nm-light);
    --sh-raised-4: 10px 10px 20px var(--nm-dark), -10px -10px 20px var(--nm-light);
  }
}
```

### 3.1 Tipografía

- **Fuente principal: Lexend** (sans geométrica, ancha y muy legible; ideal para entorno clínico). Alternativas aceptadas por ese orden: **Montserrat → Manrope**. NO uses Inter/Roboto/Arial como fuente principal (son estrechas y rompen la identidad).
- **Números de tablas y datos clínicos:** `font-variant-numeric: tabular-nums;`.
- **Escala:**

| Rol | Tamaño / interlínea | Peso | Estilo |
|---|---|---|---|
| Display | 32 / 40 | 600 | Mayúsc. + `--tracking-wordmark` |
| H1 | 28 / 36 | 600 | Normal o mayúsc. |
| H2 | 22 / 30 | 600 | Normal |
| H3 | 18 / 26 | 500 | Normal |
| Body | 15 / 24 (denso: 14 / 22) | 400 | Normal |
| Small | 13 / 20 | 400 | Normal |
| Label / Botón | 13 / 16 | 600 | **MAYÚSCULAS** + `--tracking-label` |
| Caption | 12 / 16 | 500 | MAYÚSCULAS + tracking, color `--text-muted` |

- Texto sobre superficie: `--text-strong`/`--text-default`/`--text-muted`. **El cian `--cyan-500` NO se usa para texto pequeño** (contraste ≈ 1.8:1 → falla). Para texto cian pequeño usa `--cyan-700`.

### 3.2 Espaciado y separación entre elementos neumorfos

Las sombras neumorfas necesitan espacio para respirar. **Separación mínima entre elementos hermanos con sombra: `--sp-4` (16px); entre tarjetas/paneles: `--sp-5` (24px).** Si dos elementos con sombra se tocan, las sombras se ensucian: NUNCA lo permitas. Padding interno de tarjetas: 24px (compacto: 16px). Objetivo táctil mínimo: **44×44 px**.

---

## 4. Reglas de oro

### R1 — Un solo material
El fondo de página, tarjetas, botones, inputs… son **del mismo color base** (`--nm-bg` ± un paso de degradado). La forma se define con sombras, NO con cambios de color de fondo. NUNCA rellenes un componente con otro color de fondo (ni blanco, ni azul, ni cian) salvo los casos del §7 (relleno de progreso/slider).

### R2 — Luz desde arriba-izquierda
Sombra clara (`--nm-light`) con offset **negativo** (−x, −y); sombra oscura (`--nm-dark`) con offset **positivo** (+x, +y). Usa SIEMPRE los tokens `--sh-*`. NUNCA escribas `box-shadow` con valores propios ni invertidos.

### R3 — Convexo vs. cóncavo (semántica)
| Estado físico | Se usa para | Token |
|---|---|---|
| **Convexo** (extruido) | Botones, tarjetas, paneles, sidebar, tabs activos, thumb de switch/slider, dropdowns, modales, toasts, tooltips | `--sh-raised-*` + `--grad-raised` |
| **Cóncavo** (hundido) | Inputs, textarea, select, track de switch/slider/progress, pozos de datos y gráficos, elementos **pulsados** o **seleccionados**, scroll track | `--sh-inset-*` + `--grad-sunken` |
| **Plano** (sin sombra) | Solo: canvas de página, texto, y elementos **deshabilitados** | — |

### R4 — Escalera de elevación
| Nivel | Token | Uso |
|---|---|---|
| 0 | plano | Canvas |
| 1 | `--sh-raised-1` | Chips, badges, items de lista, hover de item de menú |
| 2 | `--sh-raised-2` | Botones, inputs (en inset-2), tabs, avatares |
| 3 | `--sh-raised-3` | Tarjetas, sidebar, topbar, dropdowns |
| 4 | `--sh-raised-4` | Modales, drawers, popovers de alto nivel |

Cuanto más alto el nivel, mayor offset **y** blur (nunca solo uno de los dos).

### R5 — Interacción = cambio físico
- **Hover:** el elemento "se levanta" un poco (sube un nivel de sombra, `translateY(-1px)`).
- **Active/pulsado:** pasa de convexo a **cóncavo** (`--sh-inset-2` + `--grad-sunken`), sin translate.
- **Seleccionado/activo persistente:** cóncavo + **firma cian** (§5).
- **Foco por teclado:** anillo `--focus-ring` (siempre visible, NUNCA `outline: none` sin sustituto).
- **Deshabilitado:** plano (`box-shadow: none`), `opacity: .55`, `cursor: not-allowed`, texto `--text-disabled`.

### R6 — Sutileza
Ninguna sombra con opacidad "dramática". Si un elemento "salta" demasiado a la vista, baja un nivel. El diseño debe verse **casi plano a primera vista** y revelar relieve al mirarlo con atención.

---

## 5. La firma del logo (doble contorno + hilo cian)

Es el rasgo más reconocible. Úsala en: **botón primario, item de navegación activo, input con foco/valor, elemento seleccionado, tarjetas destacadas, modales, avatar activo, tab activo, toast.** NO en todos los elementos a la vez (rompería el minimalismo): el resto hereda el lenguaje de luz/sombra.

```css
/* Hilo cian interior (≈ línea cian del logo). Requiere --r en el elemento. */
.nm-sign { position: relative; isolation: isolate; --sign-inset: 6px; }
.nm-sign::after {
  content: "";
  position: absolute;
  inset: var(--sign-inset);
  border-radius: max(0px, calc(var(--r, var(--r-md)) - var(--sign-inset)));
  border: 1.5px solid var(--cyan-300);
  box-shadow: 0 0 0 1px var(--nm-hairline), var(--glow-cyan);
  pointer-events: none;
  transition: opacity var(--dur) var(--ease);
}

/* Marco escalonado: bisel convexo exterior + cara rebajada interior (≈ H del logo) */
.nm-frame {
  --r: var(--r-lg);
  border-radius: var(--r);
  background: var(--grad-raised);
  box-shadow: var(--sh-raised-3);
  padding: 8px;                         /* grosor del bisel */
}
.nm-frame > .nm-frame__face {
  border-radius: calc(var(--r) - 8px);
  background: var(--nm-bg);
  box-shadow: var(--sh-inset-1);
  padding: var(--sp-5);
}
```

---

## 6. Utilidades base (cópialas y reutilízalas)

```css
html { background: var(--nm-bg); color: var(--text-default); }
body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 15px; line-height: 1.6;
  background: var(--nm-bg);
  -webkit-font-smoothing: antialiased;
}
*, *::before, *::after { box-sizing: border-box; }

.nm-raised { background: var(--grad-raised); box-shadow: var(--sh-raised-2); border-radius: var(--r-md); }
.nm-inset  { background: var(--grad-sunken); box-shadow: var(--sh-inset-2);  border-radius: var(--r-md); }

.nm-label {
  font-size: 12px; font-weight: 600; text-transform: uppercase;
  letter-spacing: var(--tracking-label); color: var(--text-muted);
}

.nm-divider { height: 0; border: 0;
  border-top: 1px solid var(--nm-hairline);
  border-bottom: 1px solid var(--nm-light);   /* efecto "ranura" grabada */
}

:focus-visible { outline: none; box-shadow: var(--focus-ring); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## 7. Recetas de componentes

> Todos usan `--r` para que la firma (`.nm-sign`) calcule bien su radio. Transiciones: `transition: box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease), background var(--dur) var(--ease);`

### 7.1 Botón
```css
.btn {
  --r: var(--r-md);
  min-height: 44px; padding: 0 var(--sp-5);
  display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2);
  font: 600 13px/1 var(--font-sans);
  text-transform: uppercase; letter-spacing: var(--tracking-label);
  color: var(--text-strong);
  background: var(--grad-raised);
  border: 0; border-radius: var(--r);
  box-shadow: var(--sh-raised-2);
  cursor: pointer;
  transition: box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease), background var(--dur) var(--ease);
}
.btn:hover  { box-shadow: var(--sh-raised-3); transform: translateY(-1px); }
.btn:active,
.btn[aria-pressed="true"] { box-shadow: var(--sh-inset-2); background: var(--grad-sunken); transform: none; }
.btn:focus-visible { box-shadow: var(--sh-raised-2), var(--focus-ring); }
.btn:disabled, .btn[aria-disabled="true"] {
  box-shadow: none; opacity: .55; cursor: not-allowed; color: var(--text-disabled); transform: none;
}

/* Primario: misma superficie + firma cian + texto cian accesible. NO relleno cian. */
.btn--primary { color: var(--cyan-700); }
.btn--primary::after { /* hereda la receta .nm-sign */
  content: ""; position: absolute; inset: 6px; pointer-events: none;
  border-radius: max(0px, calc(var(--r) - 6px));
  border: 1.5px solid var(--cyan-300);
  box-shadow: 0 0 0 1px var(--nm-hairline), var(--glow-cyan);
}
.btn--primary { position: relative; }

/* Destructivo: mismo patrón, texto --danger, hilo en rojo muy tenue (nunca relleno rojo) */
.btn--danger { color: var(--danger); }

/* Icon button: cuadrado 44×44, --r-md, o círculo con --r-pill */
```
Variantes: `--primary` (1 por vista como máximo), `--ghost` (plano hasta hover), `--danger`.

### 7.2 Input / Textarea / Select (siempre cóncavos)
```css
.field { display: grid; gap: var(--sp-2); }
.field > label { composes: nm-label; }  /* o aplica .nm-label */

.input, .textarea, .select {
  --r: var(--r-md);
  width: 100%; min-height: 48px; padding: 0 var(--sp-4);
  font: 400 15px/1.4 var(--font-sans); color: var(--text-strong);
  background: var(--grad-sunken);
  border: 0; border-radius: var(--r);
  box-shadow: var(--sh-inset-2);
  transition: box-shadow var(--dur) var(--ease);
}
.textarea { padding: var(--sp-3) var(--sp-4); min-height: 112px; resize: vertical; }
.input::placeholder { color: var(--text-muted); opacity: .8; }
.input:focus-visible { box-shadow: var(--sh-inset-2), 0 0 0 2px var(--cyan-400), var(--glow-cyan); }
.input[aria-invalid="true"] { box-shadow: var(--sh-inset-2), 0 0 0 2px var(--danger); }
.input:disabled { box-shadow: none; opacity: .55; background: transparent; }
.field__hint  { font-size: 12px; color: var(--text-muted); }
.field__error { font-size: 12px; color: var(--danger); } /* + icono, nunca solo color */
```

### 7.3 Checkbox / Radio
```css
.check { width: 24px; height: 24px; border-radius: var(--r-sm);
  background: var(--grad-sunken); box-shadow: var(--sh-inset-1);
  display: inline-grid; place-items: center; }
.check[aria-checked="true"] { box-shadow: var(--sh-inset-2), var(--glow-cyan); }
.check[aria-checked="true"]::after { /* check en trazo cian */
  content: ""; width: 10px; height: 6px; border-left: 2.5px solid var(--cyan-600);
  border-bottom: 2.5px solid var(--cyan-600); transform: rotate(-45deg) translate(1px,-1px); }
/* Radio: igual con border-radius: 50% y punto cian central de 8px */
```

### 7.4 Switch
```css
.switch { width: 52px; height: 28px; border-radius: var(--r-pill);
  background: var(--grad-sunken); box-shadow: var(--sh-inset-2); position: relative; }
.switch::before { /* thumb convexo */
  content: ""; position: absolute; top: 4px; left: 4px; width: 20px; height: 20px; border-radius: 50%;
  background: var(--grad-raised); box-shadow: var(--sh-raised-1);
  transition: transform var(--dur) var(--ease); }
.switch[aria-checked="true"]::before { transform: translateX(24px); }
.switch[aria-checked="true"] { box-shadow: var(--sh-inset-2), inset 0 0 0 1.5px var(--cyan-300), var(--glow-cyan); }
```

### 7.5 Tarjeta / Panel
```css
.card { --r: var(--r-lg); padding: var(--sp-5);
  background: var(--grad-raised); border-radius: var(--r); box-shadow: var(--sh-raised-3); }
.card--featured { composes: nm-sign; }      /* añade el hilo cian */
.card__title { font: 600 18px/26px var(--font-sans); color: var(--text-strong); margin: 0 0 var(--sp-3); }
/* Dato clínico dentro de tarjeta → ponlo en un "pozo" .nm-inset */
```

### 7.6 Tabla (datos densos del ERP)
```css
.table-wrap { --r: var(--r-lg); border-radius: var(--r); background: var(--grad-raised);
  box-shadow: var(--sh-raised-3); padding: var(--sp-3); overflow: auto; }
.table { width: 100%; border-collapse: separate; border-spacing: 0; font-variant-numeric: tabular-nums; }
.table thead th { position: sticky; top: 0; text-align: left; padding: var(--sp-3) var(--sp-4);
  font: 600 12px/16px var(--font-sans); text-transform: uppercase; letter-spacing: var(--track
