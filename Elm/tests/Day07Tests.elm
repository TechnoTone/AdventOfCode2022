module Day07Tests exposing (tests)

import Day07
import Day07Input exposing (example, input)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 07"
        [ test "Part 1 Example" <| always <| Expect.equal 95437 <| Day07.part1 example
        , test "Part 1" <| always <| Expect.equal 1743217 <| Day07.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 24933642 <| Day07.part2 example
        , test "Part 2" <| always <| Expect.equal 8319096 <| Day07.part2 input
        ]
