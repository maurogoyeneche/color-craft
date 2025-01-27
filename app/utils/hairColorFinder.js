function calculateToneHeight(tones) {
  const calculatePairAverage = (tones) => {
    return tones.reduce((acc, tone, index, array) => {
      if (index % 2 === 0) {
        const nextTone = array[index + 1];
        if (nextTone !== undefined) {
          const avgTone = (Math.floor(tone) + Math.floor(nextTone)) / 2;
          acc.push(avgTone);
        } else {
          acc.push(tone);
        }
      }
      return acc;
    }, []);
  };

  return tones.length === 1
    ? tones[0]
    : calculateToneHeight(calculatePairAverage(tones));
}

function extractColors(tones) {
  return tones.map((tone) => {
    const strTone = tone.toString();
    const [_, decimals] = strTone.split(".");
    const primary = decimals?.[0] || 0;
    const secondary = decimals?.[1] || 0;
    return { primary, secondary };
  });
}

/**
 *
 * @param {*} color1
 * @param {*} color2
 * @returns Calculated mixed color .YZ
 */
function mixColors(color1, color2) {
  const y = color1.primary;
  const y2 = color2.primary;
  const yRes = plusHighlights(y, y2);

  const z = color1.secondary;
  const z2 = color2.secondary;
  const zRes = plusHighlights(z, z2);

  return { primary: yRes, secondary: zRes };
}
// BEHAVIOR EXPECTED START
const primarios = [1, 6, 3]; // la mezcla de 2 primarios da un secundario
const secundarios = [7, 4, 2]; // la mezcla de 2 secundarios da un ternario
const terniarios = [8, 9, 5]; // fin de la sucecion. No hay cuaternarios
const neutro = [0]; // color neutro = marron

const matrixShades = [primarios, secundarios, terniarios, neutro];
const matrixShadeMixer = [
  [1, 6, 3],
  [4, 7, 2],
];

const MixedByMatrixIndex =
  matrixShadeMixer[0][0].toString() + matrixShadeMixer[1][1].toString();
console.log(MixedByMatrixIndex);

switch (MixedByMatrixIndex) {
  case "71":
  case "17":
    return console.log("17 cenizo mate");
  case "12":
  case "21":
    return console.log("12 cenizo nacarado");
  case "64":
  case "46":
    return console.log("6 rojo");
  case "62":
  case "26":
    return console.log("62 rojo violin");
  case "34":
  case "43":
    return console.log("4 naranja o cobre");
  case "37":
  case "73":
    return console.log("31 beige");
  case "16":
  case "61":
    return console.log("2 nacarado o violeta");
  case "13":
  case "31":
    return console.log("7 mate o verde");
  case "36":
  case "63":
    return console.log("4 naranja o cobre");
  case "72":
  case "27":
    return console.log("8 moka o marrón cenizo");
  case "24":
  case "42":
    return console.log("5 caoba o marron rojizo");
  default:
    return console.log("0 marron");
}
// BEHAVIOR EXPECTED END

// Colorimetria
const colorimetriaMatrix = {
  basic: [1, 7, 3, 4, 6, 2],
  neutros: [4, 6, 2, 1, 7, 3], // indice de basic y mismo indice con el que se mezcla = 0
  secundarios: [3, 4, 6, 2, 1, 7], // indice de basic y mismo indice con el que se mezcla = indice de secundariosRes
  secundariosRes: [7, 9, 4, 5, 2, 8], // Resultados entre basic y secundarios
  // TODO: Revisar los valores de los ternarios y su comportamiento
  yernarios: [7, 3, 4, 6, 2, 1], // indice de basic y mismo indice con el que se mezcla = indice de yernariosRes
  // TODO: Revisar
  yernariosRes: [0.17, 0.73, 0.4, 0.6, 0.62, 0.21], // Resultados entre basic y ternarios
  // TODO: Revisar
  yernariosInvertRes: [0.71, 0.37, 0.4, 0.6, 0.26, 0.12], // Resultados entre ternarios y basic
  yernarios2: [2, 1, 7, 3, 4, 6],
  // TODO: Revisar
  yernariosRes2: [0.26, 0.12, 0.71, 0.37, 0.6, 0.64],
  // TODO: Revisar
  yernariosInvertRes2: [0.62, 0.21, 0.17, 0.73, 0.6, 0.46],
  // t de Tercearios
  t: [8, 9, 5],
  tNeutros: [4, 2, 7],
  tNeutrosRes: [0.04, 0.02, 0.07],
  tSecundarios: [3, 6, 1],
  tSecundariosRes: ["1", "1", "1"], // TODO: Las X estan para poner valores que no se han calculado
  tSecundarios2: [6, 1, 3],
  tSecundariosRes: ["1", "1", 0.05], // TODO: Las X estan para poner valores que no se han calculado
  tYernarios: [7, 4, 2],
  tYernariosRes: ["1", "1", "1"], // TODO: Las X estan para poner valores que no se han calculado
  tYernarios2: [2, 7, 4],
  tYernariosRes: ["1", "1", 0.05], // TODO: Las X estan para poner valores que no se han calculado
  tMismos: [1, 3, 6],
  tMismosRes: ["1", "1", "1"], // TODO: Las X estan para poner valores que no se han calculado
};

/**
 * @param {number} highlights1
 * @param {number} highlights2
 * @returns {number} The sum of both highlights
 * @description Given two highlights, returns the sum of both
 */
function plusHighlights(highlights1, highlights2) {
  highlights1 = parseFloat(highlights1);
  highlights2 = parseFloat(highlights2);

  // If some is 0, return the other
  if (!highlights1) return highlights2;
  if (!highlights2) return highlights1;

  // If both are the same, return first
  if (highlights1 === highlights2) return highlights1;

  // Search index of highlights1 in basic
  const indexBasic = colorimetriaMatrix.basic.indexOf(highlights1);
  const indexBasic2 = colorimetriaMatrix.basic.indexOf(highlights2);
  const indexBasicTerciarios = colorimetriaMatrix.t.indexOf(highlights1);
  const indexBasicTerciarios2 = colorimetriaMatrix.t.indexOf(highlights2);

  const hasTerciario =
    indexBasicTerciarios !== -1 || indexBasicTerciarios2 !== -1;

  // console.log({
  //   indexBasic,
  //   indexBasic2,
  //   indexBasicTerciarios,
  //   indexBasicTerciarios2,
  //   hasTerciario,
  // });

  if (!hasTerciario) {
    const isBasic = indexBasic !== -1;
    if (!isBasic) throw new Error("Invalid highlights1, not found in matrix");

    // Is Neutro highlights2?
    const neutro = colorimetriaMatrix.neutros[indexBasic];
    if (highlights2 === neutro) return 0; // Los neutros se anulan
    // Lo mismo pero al reves
    const neutro2 = colorimetriaMatrix.neutros[indexBasic2];
    if (highlights1 === neutro2) return 0; // Los neutros se anulan

    // Is Mix highlights2 with basic?
    const basicCon = colorimetriaMatrix.secundarios[indexBasic];
    if (highlights2 === basicCon)
      return colorimetriaMatrix.secundariosRes[indexBasic];
    // Lo mismo pero al reves
    const basicCon2 = colorimetriaMatrix.secundarios[indexBasic2];
    if (highlights1 === basicCon2)
      return colorimetriaMatrix.secundariosRes[indexBasic2];

    // Is Mix highlights2 with yernarios?
    const yernario = colorimetriaMatrix.yernarios[indexBasic];
    if (highlights2 === yernario)
      return colorimetriaMatrix.yernariosRes[indexBasic];
    // Lo mismo pero al reves
    const yernario2 = colorimetriaMatrix.yernarios[indexBasic2];
    if (highlights1 === yernario2)
      return colorimetriaMatrix.yernariosInvertRes[indexBasic2];

    // Is Mix highlights2 with yernarios2?
    const yernario2Fila2 = colorimetriaMatrix.yernarios2[indexBasic];
    if (highlights2 === yernario2Fila2)
      return colorimetriaMatrix.yernariosRes2[indexBasic];
    // Lo mismo pero al reves
    const yernarioFila2 = colorimetriaMatrix.yernarios2[indexBasic2];
    if (highlights1 === yernarioFila2)
      return colorimetriaMatrix.yernariosInvertRes2[indexBasic2];
  } else {
    // Is Terciario highlights2?
    const terciario = colorimetriaMatrix.tNeutros[indexBasicTerciarios];
    if (highlights2 === terciario)
      return colorimetriaMatrix.tNeutrosRes[indexBasicTerciarios];
    // Lo mismo pero al reves
    const terciario2 = colorimetriaMatrix.tNeutros[indexBasicTerciarios2];
    if (highlights1 === terciario2)
      return colorimetriaMatrix.tNeutrosRes[indexBasicTerciarios2];

    // Is Mix highlights2 with tSecundarios?
    const tSecundario = colorimetriaMatrix.tSecundarios[indexBasicTerciarios];
    if (highlights2 === tSecundario)
      return colorimetriaMatrix.tSecundariosRes[indexBasicTerciarios];
    // Lo mismo pero al reves
    const tSecundario2 = colorimetriaMatrix.tSecundarios[indexBasicTerciarios2];
    if (highlights1 === tSecundario2)
      return colorimetriaMatrix.tSecundariosRes[indexBasicTerciarios2];

    // Is Mix highlights2 with tYernarios?
    const tYernario = colorimetriaMatrix.tYernarios[indexBasicTerciarios];
    if (highlights2 === tYernario)
      return colorimetriaMatrix.tYernariosRes[indexBasicTerciarios];
    // Lo mismo pero al reves
    const tYernario2 = colorimetriaMatrix.tYernarios[indexBasicTerciarios2];
    if (highlights1 === tYernario2)
      return colorimetriaMatrix.tYernariosRes[indexBasicTerciarios2];

    // Is Mix highlights2 with tYernarios2?
    const tYernario2Fila2 =
      colorimetriaMatrix.tYernarios2[indexBasicTerciarios];
    if (highlights2 === tYernario2Fila2)
      return colorimetriaMatrix.tYernariosRes[indexBasicTerciarios];
    // Lo mismo pero al reves
    const tYernarioFila2 =
      colorimetriaMatrix.tYernarios2[indexBasicTerciarios2];
    if (highlights1 === tYernarioFila2)
      return colorimetriaMatrix.tYernariosRes[indexBasicTerciarios2];

    // Is Mix highlights2 with tMismos?
    const tMismo = colorimetriaMatrix.tMismos[indexBasicTerciarios];
    if (highlights2 === tMismo)
      return colorimetriaMatrix.tMismosRes[indexBasicTerciarios];
    // Lo mismo pero al reves
    const tMismo2 = colorimetriaMatrix.tMismos[indexBasicTerciarios2];
    if (highlights1 === tMismo2)
      return colorimetriaMatrix.tMismosRes[indexBasicTerciarios2];
  }

  throw new Error(
    `Invalid highlights, not found in matrix highlights1:${highlights1}, highlights2:${highlights2}`
  );
}

/**
 * @param {number[]} tones
 * @returns {string} The ideal formula X.YZ
 * @description Given an array of tones, calculates the ideal formula on pairs of tones
 * - X = Average plus before the decimal point
 *        = (Tone1 + Tone2) / 2 = res -> floor(res)
 *        = (res + Tone3) / 2 = res -> floor(res)
 *        = +,...,+
 *        = (res + ToneN) / 2 = res -> floor(res)
 *
 * - Y = First decimal are plus with Y2 using mixColors, and same for Z
 * Result is the ideal formula = X.YZ = (Tone1 + ToneN) / 2 + mixColors(Tone1, ToneN)
 */
function processPairs(tones) {
  if (tones.length <= 1) return String(tones[0]);

  const [tone1, tone2, ...rest] = tones.map(String);
  const baseAvg =
    (Math.floor(parseFloat(tone1)) + Math.floor(parseFloat(tone2))) / 2;
  const [color1, color2] = extractColors([tone1, tone2]);
  const mixedColor = mixColors(color1, color2);

  const newToneStr = `${baseAvg}.${mixedColor.primary}${mixedColor.secondary}`;

  if (rest.length) {
    return processPairs([newToneStr, ...rest]);
  }

  return Number(newToneStr);
}

function processFormula(userInput) {
  const finalTone = processPairs(userInput);
  return `Ideal Formula: ${finalTone}`;
}

// Example usage:
function test(expected, arr) {
  const result = processFormula(arr);
  let msg = result + " = " + expected;
  msg += " " + (result === expected ? "✅" : "❌");
  // console.log(msg);
}

test("Ideal Formula: 7.02", [6.32, 8.2]);
test("Ideal Formula: 5", [4, 6]);
test("Ideal Formula: 7", [4, 6, 9]);
test("Ideal Formula: 7.12", [6.32, 8.2, 7.1]);

test("Ideal Formula: 0.1", [0.1, 0.1]);
test("Ideal Formula: 0.1", [0.1, 0.8]); // TODO: Que deberia de dar? es cuestion de ratio de formula 2:1 = .18 y ratio 1:2 .81
test("Ideal Formula: 0.8", [0.8, 0.1]); // TODO: Que deberia de dar?

test("Ideal Formula: 0.5", [0.5]);
test("Ideal Formula: 0.5", [0.5, 0.5]);

test("Ideal Formula: 0.2", [0.5, 0.7]); // TODO: El orden de suma altera el producto //  es cuestion de ratio de formula
test("Ideal Formula: 0.3", [0.7, 0.5]); // TODO: El orden de suma altera el producto //  es cuestion de ratio de formula

test("Ideal Formula: 0.17", [0.1, 0.7]); // TODO: El orden de suma altera el producto   // es cuestion de ratio de formula
test("Ideal Formula: 0.71", [0.7, 0.1]); // TODO: El orden de suma altera el producto   // es cuestion de ratio de formula

test("Ideal Formula: 0.49", [0.4, 0.9]); // TODO: Es lo mismo si se suma al revez?   // es cuestion de ratio de formula
test("Ideal Formula: 0.94", [0.9, 0.4]); // TODO: Es lo mismo si se suma al revez?   // es cuestion de ratio de formula

test("Ideal Formula: 0.04", [0.8, 0.4]); // TODO: Que deberia de dar? .0 calido
test("Ideal Formula: 0.02", [0.9, 0.2]); // TODO: Que deberia de dar? .0 calido
test("Ideal Formula: 0.07", [0.5, 0.7]); // TODO: Que deberia de dar? .0 frio

test("Ideal Formula: 0.07", [0.5, 0.1]); // TODO: Que deberia de dar? .5 frio
