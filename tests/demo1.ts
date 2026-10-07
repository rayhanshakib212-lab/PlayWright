let message1: string = "hello";
message1 = "bye";

let age1: number = 20;
let isActive: boolean = false;

let numberArry: number[] = [1, 2, 3, 4, 5];

let date: any = "this could be any type of data";
date = 42;


function add(a: number, b: number): number {
    return a + b;
}

add(3, 4);    // will return 7 and not give any error because the return type is number and we are returning a number.


//let user: {name:string,age:number} = { name: "Bob", age: 34};
//user.location = "hyderbad";  // will give error because location is not defined in the user object.