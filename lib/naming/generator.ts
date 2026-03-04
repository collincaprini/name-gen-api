import asianFemaleGivenNames from "../profile-definitions/asian-female-given-names.json";
import asianMaleGivenNames from "../profile-definitions/asian-male-given-names.json";
import blackFemaleGivenNames from "../profile-definitions/black-female-given-names.json";
import blackMaleGivenNames from "../profile-definitions/black-male-given-names.json";
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

const genders = ['male', 'female']
const ethnicities = ['asian', 'black', 'latino', 'mena', 'nativeAmerican', 'pacificIslander', 'white']
function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

//test generate name
export function generateName(){
  //for now, just
  const gender = getRandomElement(genders);
  const ethnicity = getRandomElement(ethnicities);
  const fileNameString = `${ethnicity}${gender.charAt(0).toUpperCase() + gender.slice(1)}GivenNames`;
  const givenNamesFile = profileNameFiles[fileNameString as keyof typeof profileNameFiles];
  const firstName = getRandomElement(givenNamesFile)[0];
  const surnameFile = profileNameFiles[`${ethnicity}Surname` as keyof typeof profileNameFiles];
  const surname = getRandomElement(surnameFile)[0];
  return `${firstName} ${surname}`;
  
}

export const profileNameFiles = {
  asianFemaleGivenNames,
  asianMaleGivenNames,
  blackFemaleGivenNames,
  blackMaleGivenNames,
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
