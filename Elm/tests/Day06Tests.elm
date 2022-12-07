module Day06Tests exposing (tests)

import Day06
import Day06Input exposing (examples, input)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 06"
        [ test "Part 1 Example a" <| always <| Expect.equal examples.a.expected1 <| Day06.part1 examples.a.input
        , test "Part 1 Example b" <| always <| Expect.equal examples.b.expected1 <| Day06.part1 examples.b.input
        , test "Part 1 Example c" <| always <| Expect.equal examples.c.expected1 <| Day06.part1 examples.c.input
        , test "Part 1 Example d" <| always <| Expect.equal examples.d.expected1 <| Day06.part1 examples.d.input
        , test "Part 1 Example e" <| always <| Expect.equal examples.e.expected1 <| Day06.part1 examples.e.input
        , test "Part 1" <| always <| Expect.equal 1578 <| Day06.part1 input
        , test "Part 2 Example a" <| always <| Expect.equal examples.a.expected2 <| Day06.part2 examples.a.input
        , test "Part 2 Example b" <| always <| Expect.equal examples.b.expected2 <| Day06.part2 examples.b.input
        , test "Part 2 Example c" <| always <| Expect.equal examples.c.expected2 <| Day06.part2 examples.c.input
        , test "Part 2 Example d" <| always <| Expect.equal examples.d.expected2 <| Day06.part2 examples.d.input
        , test "Part 2 Example e" <| always <| Expect.equal examples.e.expected2 <| Day06.part2 examples.e.input
        , test "Part 2" <| always <| Expect.equal 2178 <| Day06.part2 input
        ]
