import { get } from "http";
import asianFemaleGivenNames from "../profile-definitions/asian-female-given-names.json";
import asianMaleGivenNames from "../profile-definitions/asian-male-given-names.json";
import asianSurname from "../profile-definitions/asian-surname.json";
import blackFemaleGivenNames from "../profile-definitions/black-female-given-names.json";
import blackMaleGivenNames from "../profile-definitions/black-male-given-names.json";
import blackSurname from "../profile-definitions/black-surname.json";
import latinoFemaleGivenNames from "../profile-definitions/latino-female-given-names.json";
import latinoMaleGivenNames from "../profile-definitions/latino-male-given-names.json";
import latinoSurname from "../profile-definitions/latino-surname.json";
import menaFemaleGivenNames from "../profile-definitions/mena-female-given-names.json";
import menaMaleGivenNames from "../profile-definitions/mena-male-given-names.json";
import menaSurname from "../profile-definitions/mena-surname.json";
import nativeAmericanFemaleGivenNames from "../profile-definitions/native-american-female-given-names.json";
import nativeAmericanMaleGivenNames from "../profile-definitions/native-american-male-given-names.json";
import nativeAmericanSurname from "../profile-definitions/native-american-surname.json";
import pacificIslanderFemaleGivenNames from "../profile-definitions/pacific-islander-female-given-names.json";
import pacificIslanderMaleGivenNames from "../profile-definitions/pacific-islander-male-given-names.json";
import pacificIslanderSurname from "../profile-definitions/pacific-islander-surname.json";
import whiteFemaleGivenNames from "../profile-definitions/white-female-given-names.json";
import whiteMaleGivenNames from "../profile-definitions/white-male-given-names.json";
import whiteSurname from "../profile-definitions/white-surname.json";

const gendersQuadruples = 
  [
    ["male", 0.5, 0, 0.5],
    ["female", 0.5, 0.5, 1],
  ] 


export function generateOneThousandRandomNames() {
  const names = [];
  for (let i = 0; i < 1000; i++) {
    names.push(generateName());
  }
  return names;
}

export function generateNameString({ givenGender, givenEthnicity, givenNumberOfGivenNames }: { givenGender?: 'male' | 'female', givenEthnicity?: 'asian' | 'black' | 'latino' | 'mena' | 'nativeAmerican' | 'pacificIslander' | 'white', givenNumberOfGivenNames?: number } = {}) {
  const gender = givenGender || getRandomValueFromQuadrupleArray(gendersQuadruples);
  const ethnicity = givenEthnicity || getRandomValueFromQuadrupleArray(ethnicitiesValues);
  const numberOfGivenNames = givenNumberOfGivenNames || getNumberOfGivenNames(ethnicity);
  const fileNameString = `${ethnicity}${gender.charAt(0).toUpperCase() + gender.slice(1)}GivenNames`;
  const surnameFileString = `${ethnicity}Surname`;
  const surnameFile = profileNameFiles[surnameFileString as keyof typeof profileNameFiles];
  const givenNamesFile = profileNameFiles[fileNameString as keyof typeof profileNameFiles];
  let name = '';
  for (let i = 0; i < numberOfGivenNames; i++) {
    name = name.concat(getRandomValueFromQuadrupleArray(givenNamesFile) as string + ' ');
  }
  const surname = getRandomValueFromQuadrupleArray(surnameFile);
  name = name.concat(surname as string);
  return name;
}

export function TestOneThousandNamesComponent(){
  const names = generateOneThousandRandomNames();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Ethnicity</th>    
            <th>Number of Given Names</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => (
            <tr key={index}>
              <td>{name.name}</td>
              <td>{name.gender}</td>  
              <td>{name.ethnicity}</td>
              <td>{name.numberOfGivenNames}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function generateName({ givenGender, givenEthnicity, givenNumberOfGivenNames }: { givenGender?: 'male' | 'female', givenEthnicity?: 'asian' | 'black' | 'latino' | 'mena' | 'nativeAmerican' | 'pacificIslander' | 'white', givenNumberOfGivenNames?: number } = {}) {
  const gender = givenGender || getRandomValueFromQuadrupleArray(gendersQuadruples);
  const ethnicity = givenEthnicity || getRandomValueFromQuadrupleArray(ethnicitiesValues);
  const numberOfGivenNames = givenNumberOfGivenNames || getNumberOfGivenNames(ethnicity);
  const fileNameString = `${ethnicity}${gender.charAt(0).toUpperCase() + gender.slice(1)}GivenNames`;
  const surnameFileString = `${ethnicity}Surname`;
  const surnameFile = profileNameFiles[surnameFileString as keyof typeof profileNameFiles];
  const givenNamesFile = profileNameFiles[fileNameString as keyof typeof profileNameFiles];
  let name = '';
  for (let i = 0; i < numberOfGivenNames; i++) {
    name = name.concat(getRandomValueFromQuadrupleArray(givenNamesFile) as string + ' ');
  }
  const surname = getRandomValueFromQuadrupleArray(surnameFile);
  name = name.concat(surname as string);
  return {
    gender,
    ethnicity,
    name,
    numberOfGivenNames,
  };
}

function getNumberOfGivenNames(ethnicity: string) {
  switch (ethnicity) {
    case 'white':
      return getRandomValueFromQuadrupleArray(whiteGivenNamesQuantity);
    case 'black':
      return getRandomValueFromQuadrupleArray(blackGivenNamesQuantity);
    case 'latino':
      return getRandomValueFromQuadrupleArray(latinoGivenNamesQuantity);
    case 'asian':
      return getRandomValueFromQuadrupleArray(asianGivenNamesQuantity);
    case 'nativeAmerican':
      return getRandomValueFromQuadrupleArray(nativeAmericanGivenNamesQuantity);
    case 'pacificIslander':
      return getRandomValueFromQuadrupleArray(pacificIslanderGivenNamesQuantity);
    case 'mena':
      return getRandomValueFromQuadrupleArray(menaGivenNamesQuantity);
    default:
      throw new Error(`Invalid ethnicity: ${ethnicity}`);
  }
}

export const profileNameFiles = {
  asianFemaleGivenNames,
  asianMaleGivenNames,
  asianSurname,
  blackFemaleGivenNames,
  blackMaleGivenNames,
  blackSurname,
  latinoFemaleGivenNames,
  latinoMaleGivenNames,
  latinoSurname,
  menaFemaleGivenNames,
  menaMaleGivenNames,
  menaSurname,
  nativeAmericanFemaleGivenNames,
  nativeAmericanMaleGivenNames,
  nativeAmericanSurname,
  pacificIslanderFemaleGivenNames,
  pacificIslanderMaleGivenNames,
  pacificIslanderSurname,
  whiteFemaleGivenNames,
  whiteMaleGivenNames,
  whiteSurname,
} as const;

//this is for generating a random value between 0 and 1
//this has O(n) time complexity where n is the length of the quadruple array, but since the quadruple arrays are small, this should be fine. 
//TODO to optimize this, I can implement a binary search algorithm to find the correct range in O(log n) time.
function getRandomValueFromQuadrupleArray(quadrupleArray: any[]) {
  const randomValue = Math.random();
  for (const quadruple of quadrupleArray) {
    if (randomValue >= quadruple[2] && randomValue < quadruple[3]) {
      return quadruple[0];
    }
  }
  throw new Error("Random value did not fall within any range in the quadruple array.");
}

const ethnicitiesValues =
  [
    ["white", 0.58, 0.000, 0.580],
    ["latino", 0.20, 0.580, 0.780],
    ["black", 0.13, 0.780, 0.910],
    ["asian", 0.06, 0.910, 0.970],
    ["nativeAmerican", 0.01, 0.970, 0.980],
    ["mena", 0.018, 0.980, 0.998],
    ["pacificIslander", 0.002, 0.998, 1.000]
  ]

const whiteGivenNamesQuantity = [
  [1, 0.11, 0, 0.11],
  [2, 0.81, 0.11, 0.92],
  [3, 0.07, 0.92, 0.99],
  [4, 0.01, 0.99, 1],
];

const blackGivenNamesQuantity = [
  [1, 0.22, 0, 0.22],
  [2, 0.69, 0.22, 0.91],
  [3, 0.08, 0.91, 0.99],
  [4, 0.01, 0.99, 1],
];

const latinoGivenNamesQuantity = [
  [1, 0.21, 0, 0.21],
  [2, 0.60, 0.21, 0.81],
  [3, 0.16, 0.81, 0.97],
  [4, 0.03, 0.97, 1],
];

const asianGivenNamesQuantity = [
  [1, 0.48, 0, 0.48],
  [2, 0.39, 0.48, 0.87],
  [3, 0.11, 0.87, 0.98],
  [4, 0.02, 0.98, 1],
];

const nativeAmericanGivenNamesQuantity = [
  [1, 0.20, 0, 0.2],
  [2, 0.71, 0.2, 0.91],
  [3, 0.08, 0.91, 0.99],
  [4, 0.01, 0.99, 1],
];

const pacificIslanderGivenNamesQuantity = [
  [1, 0.19, 0, 0.19],
  [2, 0.55, 0.19, 0.74],
  [3, 0.20, 0.74, 0.94],
  [4, 0.06, 0.94, 1],
];

const menaGivenNamesQuantity = [
  [1, 0.28, 0, 0.28],
  [2, 0.49, 0.28, 0.77],
  [3, 0.18, 0.77, 0.95],
  [4, 0.05, 0.95, 1],
];



function testAccuracyOfAllQuadrupleArrays() {
  const quadrupleArrays = [['ethnicities', ethnicitiesValues], ['whiteGivenNamesQuantity', whiteGivenNamesQuantity], ['blackGivenNamesQuantity', blackGivenNamesQuantity], ['latinoGivenNamesQuantity', latinoGivenNamesQuantity], ['asianGivenNamesQuantity', asianGivenNamesQuantity], ['nativeAmericanGivenNamesQuantity', nativeAmericanGivenNamesQuantity], ['pacificIslanderGivenNamesQuantity', pacificIslanderGivenNamesQuantity], ['menaGivenNamesQuantity', menaGivenNamesQuantity]];
  for (const quadrupleArray of quadrupleArrays) {
    console.log(`Testing quadruple array: ${quadrupleArray[0]}...`);
    if (!testQuadrupleArrayAccuracy(quadrupleArray[1])) {
      console.log(`Quadruple array ${quadrupleArray[0]} is inaccurate.`); 
      return;
    }
  }
  console.log("All quadruple arrays are accurate.");
}

function testQuadrupleArrayAccuracy(quadruples : any): boolean {
  let totalProbability = 0;
  for (const quadruple of quadruples) {
    totalProbability += quadruple[1];
  }
  if (totalProbability !== 1) {
    console.log(`Total probability is ${totalProbability}, which does not equal 1.`);
  }
  const acceptableMarginOfError = 0.0001;
  if (Math.abs(totalProbability - 1) > acceptableMarginOfError) {
    console.log(`Total probability is ${totalProbability}, which is outside the acceptable margin of error.`);
    return false;
  }
  return true;
}


