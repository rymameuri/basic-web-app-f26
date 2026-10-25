import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "rym"
          ));
    })

    test('should return andrew id', () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("rameuri");
    });

    test('should add numbers', () => {
        expect(QueryProcessor("What is 72 plus 64?")).toBe("136");
    });

    test('should handle numeric questions', () => {
        expect(QueryProcessor("Which of the following numbers is the largest: 5, 91, 7?")).toBe("91");
        expect(QueryProcessor("What is 2 plus 3 plus 4?")).toBe("9");
        expect(QueryProcessor("What is 7 multiplied by 8?")).toBe("56");
        expect(QueryProcessor("What is 2 to the power of 10?")).toBe("1024");
        expect(QueryProcessor("Which of the following numbers are primes: 4, 7, 9, 11?")).toBe("7, 11");
        expect(QueryProcessor("Which of the following numbers is both a square and a cube: 64, 50, 27?")).toBe("64");
        expect(QueryProcessor("What is 83 plus 13?")).toBe("96");
    });

    test('should compute large powers exactly', () => {
        expect(QueryProcessor("What is 84 to the power of 44?")).toBe("4658955761939521174403741608796631847916249549846044239037721357911228171641459572736");
    });
});
