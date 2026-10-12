---
title: HoFi
description: HoFi (Holistic Finance) es un protocolo de economía regenerativa que registra y recompensa el trabajo de cuidado en comunidades organizadas como holones. Un proyecto de ArchiLab.
---

# HoFi

[HoFi](https://ho-fi.org/ar/) (*Holistic Finance*, finanzas holísticas) es un protocolo de economía regenerativa. Registra, evalúa y recompensa el trabajo de cuidado que sostiene a una comunidad y que la economía convencional no cuenta: cuidar a personas mayores, enseñar, cocinar para otros, compostar, restaurar un humedal.

Es un proyecto de ArchiLab y lo lleva Pablo (Doko) Ifantidis.

## Por qué holones

HoFi organiza a sus comunidades como **holones**. El término lo acuñó Arthur Koestler uniendo el griego *holos* (todo) y *on* (parte): un holón es algo que es un todo en un contexto y una parte en otro. Una célula es un todo y, a la vez, parte de un organismo.

Ken Wilber retoma la idea en su enfoque integral. Para Wilber, todo holón tiene cuatro dimensiones inseparables, que ordena en cuadrantes, y ninguna tiene prioridad sobre las otras:

| | Individual | Colectivo |
| :-- | :-- | :-- |
| **Interior** | La conciencia y las intenciones de cada quien | Los valores y significados compartidos |
| **Exterior** | La conducta que se puede observar y medir | Los sistemas y las estructuras sociales |

En HoFi, un holón es una comunidad soberana, como una familia, una cooperativa o una ecoaldea. Hacia adentro es un todo: define sus reglas, su gobernanza y qué cuenta como cuidado. Hacia afuera es una parte: se coordina e intercambia valor con otros holones en una red más amplia.

Leída desde ese enfoque, una tarea de cuidado no es solo un dato medible. También tiene una intención, un sentido compartido dentro de su comunidad y un lugar en las reglas del holón.

Sobre el enfoque, ver Gonzalo Medina Aveledo, [«El enfoque integral holónico de Ken Wilber, otra visión a la hora de investigar»](https://www.redalyc.org/journal/3759/375956270003/html/), *Salus*, vol. 22, n.º 1 (2018).

## Cómo funciona

1. **Una acción de cuidado.** Alguien hace una tarea para su comunidad.
2. **Un mensaje de voz.** La describe en un audio por Telegram, sin interfaces complejas. La voz funciona también como identificación.
3. **La evaluación de Tenzo.** Un agente de IA evalúa la tarea con criterios transparentes y calcula la recompensa. Su razonamiento se puede auditar. Los casos dudosos pasan a un jurado de varios modelos.
4. **El registro en la blockchain.** La tarea validada queda registrada.
5. **La recompensa en HoCa.** Quien cuidó recibe tokens HoCa, la unidad de reconocimiento del protocolo.

Para participar sin revelar la identidad, HoFi usa pruebas de conocimiento cero.

## Tecnología

- **Tokens y registro de tareas** en Ethereum: el token HoCa, la identidad de cada holón y el registro de tareas.
- **Consenso de IA** en GenLayer, para las evaluaciones que necesitan un jurado.
- **HolonChain**, una red propia sobre Avalanche para la gobernanza de los holones y sus validadores.
- **Agente y bot** en Python, con un panel web en Next.js.

El código es abierto, con licencia AGPL-3.0, y está en [GitHub](https://github.com/jikaidoko/hofi-protocol).

## Estado

Según el repositorio, a octubre de 2026 funcionan el agente Tenzo, el bot de Telegram, la autenticación por voz y el panel. Están pendientes las reglas de los holones en GenLayer, la puesta en marcha de HolonChain y el registro de las tareas en la blockchain.

## Enlaces

- Sitio: [ho-fi.org](https://ho-fi.org/ar/)
- Código: [github.com/jikaidoko/hofi-protocol](https://github.com/jikaidoko/hofi-protocol)
- [X](https://x.com/HoFi_Protocol) · [LinkedIn](https://www.linkedin.com/company/hofi-protocol) · [Dev.to](https://dev.to/hofi_protocol)
