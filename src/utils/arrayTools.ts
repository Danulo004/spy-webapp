export const shuffleArray = (array: Array<any>): Array<any> => {
    return array.sort(() => Math.random() - 0.5);
}

export const getRandomItemFromArray = (array: Array<any>): any => {
    return array[Math.floor(Math.random() * array.length)];
}
