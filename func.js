let shapeCollection = [
    {shapeColor: 'red', width: 15, height: 5},
    {shapeColor: 'black', width: null, height: null},
    {shapeColor: 'black', width: 20, height: 20},
    {shapeColor: 'red', width: 30, height: 10},
    {shapeColor: 'blue', width: 15, height: 15},
    {shapeColor: 'blue', width: 10, height: 15},
    {shapeColor: 'black', width: 20, height: 20},
    {shapeColor: 'green', width: 15, height: 15},
]
let empty = [];

const argsToArray = fc => (...args) => fc(args);
const flow = ( ...data ) => value => data.reduce((arg, func) => func(arg), value);
const combine = (...data) => value => data.reduceRight((arg, func) => func(arg), value);
const filter = func => array => array.filter(func);
const map = func => array => array.map(func);
const reduce = (...args) => array => args.length === 2 ? array.reduce(args[0], args[1]) : ( args.length === 1 ? array.reduce(args[0]) : array.reduce(args));

const and = (func_1, func_2) => value => func_1(value) && func_2(value);
const or = (func_1, func_2) => func_1 || func_2;
const any = argsToArray(reduce(or));
const all = argsToArray(reduce(and));

const sum = (a, b) => a + b;
const max = array => reduce((a, b) => a > b ? a : b, -Infinity)(array);
const totalSum = array => reduce(sum, 0)(array);
const answer = string => value => `${string}: ${value}`;

const hasColor = color => ({ shapeColor }) => shapeColor === color;
const hasRed = hasColor('red');
const hasBlack = hasColor('black');

const validShapeParams = (width, height) => (typeof width === 'number' && width !== 0) && (typeof height === 'number' && height !== 0);

const getShapeArea = ( { width, height } ) => validShapeParams(width, height) ? width * height : null;
const getShapePerimeter = ( { width, height } ) => validShapeParams(width, height) ? width*2 + height*2 : null;

const isSquare = ( { width, height } ) => validShapeParams(width, height) ? width === height : false;
const isRectangle = ( { width, height } ) => validShapeParams(width, height) ? width !== height : false;
const widthShape = ( {width} ) => width === 20;

const getMaxBlackSquareArea = flow(
    filter(and(isSquare, hasBlack)),
    map(getShapeArea),
    max,
    answer("Max squares area is")
)(shapeCollection);

const getTotalRectanglesPerimeter = combine(
    answer("Total perimeter is"),
    totalSum,
    map(getShapePerimeter),
    filter(and(isRectangle, hasRed))
)(shapeCollection);

console.log(filter(all(isSquare, hasBlack))(shapeCollection));
// console.log(filter(all(getSquare, hasBlack, widthShape))(empty));
console.log(getMaxBlackSquareArea);
console.log(getTotalRectanglesPerimeter);