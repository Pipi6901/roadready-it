# Генератор отчёта

`build_market.js` собирает `docs/Отчет_анализ_рынка_Италия.docx` по тому же
образцу, что и лабораторные работы: Times New Roman 14, поля 3/1.5/2/2 см,
красная строка 1.25 см, латиница курсивом, содержание полем TOC.

Вёрстка вынесена в `lib.js` из `D:\claude\msa-lab1\report-generator` — там же
лежат `node_modules` с пакетом `docx`. Отдельной установки зависимостей не
требуется, нужен только `NODE_PATH`:

```
NODE_PATH="D:/claude/msa-lab1/report-generator/node_modules" node docs/report-generator/build_market.js
```

Содержание проставляется не генератором, а Word:

```
D:\claude\msa-lab1\report-generator\finalize.ps1 -Docx "<путь к docx>"
```

Без этого шага в содержании останутся пустые номера страниц.
