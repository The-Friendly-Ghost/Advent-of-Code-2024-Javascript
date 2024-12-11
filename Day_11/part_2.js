"use strict";  
/*
Not going to lie.. I created the recursice logic myself, but Claude Sonnet 3.5 
helped me big time to understand the whole concept of caching and 
how to structure the code for it. So yeah, credits to Claude.
*/
import { readFile } from "fs/promises";  

const limit = 75;  

function countStones(initialStone) {  
    // Create cache key from stone value and remaining blinks  
    const cache = new Map();  
    
    function process(stone, blinksLeft) {  
        if (blinksLeft === 0) return 1n;  
        
        const key = `${stone},${blinksLeft}`;  
        if (cache.has(key)) return cache.get(key);  
        
        let result = 0n;  
        
        if (stone === 0) {  
            result = process(1, blinksLeft - 1);  
        } else {  
            const digitCount = Math.floor(Math.log10(stone)) + 1;  
            
            if (digitCount % 2 === 1) {  
                result = process(stone * 2024, blinksLeft - 1);  
            } else {  
                const divisor = Math.pow(10, digitCount / 2);  
                result = process(Math.floor(stone / divisor), blinksLeft - 1) +  
                         process(stone % divisor, blinksLeft - 1);  
            }  
        }  
        
        cache.set(key, result);  
        return result;  
    }  
    
    return process(initialStone, limit);  
}  

try {  
    const stones = (await readFile("input.txt", "utf8"))  
        .split(" ")  
        .map(Number);  
    
    let totalStones = 0n;  
    
    for (const stone of stones) {  
        totalStones += countStones(stone);  
    }  
    
    console.log(totalStones.toString());  
} catch (error) {  
    console.error(`Error: ${error.message}`);  
}